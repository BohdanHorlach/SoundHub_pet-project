const MusicCardStatus = require("../enums/music-card-status");
const { BadRequest, UnenspectedError } = require("../exceptions/api-errors");
const musicCardService = require("../services/music-card-service");

class MusicCardController {

  constructor() {
    this.getFavorites = this.getFavorites.bind(this);
    this.getUploads = this.getUploads.bind(this);
    this.getAll = this.getAll.bind(this);
    this.uploadCard = this.uploadCard.bind(this);
  }

  #parseSearchParams(query) {
    const { page = 1, limit = 9, title = "", categories = "[]", status = MusicCardStatus.APPROVED } = query;
    const parsedCategories = JSON.parse(categories);
    return { page, limit, title, categories: parsedCategories, status };
  }


  async #handleSearchRequest(req, res, next, serviceMethod) {
    try {
      const userId = req.user?.id ?? 0;
      const params = this.#parseSearchParams(req.query);
      const data = await serviceMethod.call(musicCardService, userId, params);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }


  getFavorites(req, res, next) {
    return this.#handleSearchRequest(req, res, next, musicCardService.getFavorites);
  }

  
  getUploads(req, res, next) {
    return this.#handleSearchRequest(req, res, next, musicCardService.getUploads);
  }


  async getAll(req, res, next) {
    return this.#handleSearchRequest(req, res, next, musicCardService.getAll);
  }


  async uploadCard(req, res, next) {
    try {
      const file = req.file;
      const user = req.user;
      if (!file) 
        return next(BadRequest("No file provided"));

      console.log('Upload request: ', req.body);
      const newCard = await musicCardService.upload(user.id, req.body, file);
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

      const updatedCard = await musicCardService.update(id, req.body);
      return res.status(202).json({ message: "Update successfully", card: updatedCard });
    } catch (error) {
      console.error(error);
      next(UnenspectedError("Update failed"));
    }
  }


  async download(req, res, next) {
    try {
      const { id } = req.params;
      const url = await musicCardService.getSignedDownloadUrl(id);
      res.redirect(url);
    } catch (error) {
      console.error(error);
      next(UnenspectedError(`Download failed: ${error.message}`));
    }
  }
}

module.exports = new MusicCardController();
