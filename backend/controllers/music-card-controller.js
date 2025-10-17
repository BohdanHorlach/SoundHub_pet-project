const MusicCardStatus = require("../enums/music-card-status");
const { BadRequest, UnenspectedError } = require("../exceptions/api-errors");
const musicCardService = require("../services/music-card-service");

class MusicCardController {

  constructor(){
    this.getCards = this.getCards.bind(this);
  }


  #parseSearchParams(query) {
    const { page = 1, limit = 9, title = "", categories = "[]", status = MusicCardStatus.APPROVED } = query;
    const parsedCategories = JSON.parse(categories);
    return { page, limit, title, categories: parsedCategories, status };
  }


  async getCards(req, res, next) {
    try {
      const userId = req.user?.id ?? 0;
      const params = this.#parseSearchParams(req.query);
      const type = req.query.type || "all";
      
      const data = await musicCardService.getCardsByType(userId, params, type);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
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
      res.status(200).json({ url });
    } catch (error) {
      console.error(error);
      next(UnenspectedError(`Download failed: ${error.message}`));
    }
  }
}

module.exports = new MusicCardController();
