const Favorite = require('../models/favorite-model');

class FavoriteService {
  async toggleFavorite(userId, musicCardId) {
    const existing = await Favorite.findOne({ where: { userId, musicCardId } });
    if (existing) {
      await existing.destroy();
      return { added: false };
    } else {
      await Favorite.create({ userId, musicCardId });
      return { added: true };
    }
  }
}

module.exports = new FavoriteService();
