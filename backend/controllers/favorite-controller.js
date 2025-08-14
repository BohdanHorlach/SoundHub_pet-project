const { BadRequest } = require('../exceptions/api-errors');
const favoriteService = require('../services/favority-service');


class FavoriteController {
  async toggleFavorite(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      if (!id)
        return next(BadRequest("musicCardId is required"));

      const result = await favoriteService.toggleFavorite(userId, id);

      res.json({
        message: result.added ? "Added to favorites" : "Removed from favorites",
        added: result.added,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FavoriteController();
