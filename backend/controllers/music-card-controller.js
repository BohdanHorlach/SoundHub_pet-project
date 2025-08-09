const { BadRequest, UnenspectedError } = require("../exceptions/api-errors");
const musicCardService = require("../services/music-card-service");

class MusicCardController {

  constructor() {
    this.getFavorites = this.getFavorites.bind(this);
    this.getUploads = this.getUploads.bind(this);
    this.getAll = this.getAll.bind(this);
    this.uploadCard = this.uploadCard.bind(this);
  }

  #parseSearchParams(body) {
    const { page = 1, limit = 9, categories = "[]" } = body;
    const parsedCategories = JSON.parse(categories);
    return { page, limit, parsedCategories };
  }


  #handleError(res, error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || 'Server Error';
    return res.status(status).json({ message });
  }


  async #handleSearchRequest(req, res, serviceMethod) {
    try {
      const userId = req.user.userId;
      const params = this.#parseSearchParams(req.body);
      const data = await serviceMethod.call(musicCardService, userId, params);

      return res.status(200).json(data);
    } catch (error) {
      return handleError(res, error);
    }
  }


  getFavorites(req, res) {
    return this.#handleSearchRequest(req, res, musicCardService.getFavorites);
  }

  
  getUploads(req, res) {
    return this.#handleSearchRequest(req, res, musicCardService.getUploads);
  }


  async getAll(req, res, next) {
    try {
      const params = this.#parseSearchParams(req.body);
      const data = await musicCardService.getAll(params);

      return res.status(200).json(data);
    } catch (error) {
      return this.#handleError(res, error);
    }
  }


  async uploadCard(req, res, next) {
    try {
      const file = req.file;
      const user = req.user;
      if (!file) 
        return next(BadRequest("No file provided"));

      console.log('Upload request: ', req.body);
      const newCard = await musicCardService.upload(user.userId, req.body, file);
      console.log('Uploaded successfully: ', newCard, 'From user: ', user);
      return res.status(201).json({ message: "Uploaded successfully", card: newCard });
    } catch (err) {
      console.error(err);
      next(UnenspectedError("Upload failed"));
    }
  }


  async update(req, res, next) {
    try {
      const { id } = req.params;

      if(!id)
        return next(BadRequest("No id provided"));

      const updatedCard = musicCardService.update(id, req.body);
      return res.status(202).json({ message: "Update successfully", card: updatedCard });
    } catch (error) {
      console.error(err);
      next(UnenspectedError("Update failed"));
    }
  }
}

module.exports = new MusicCardController();
