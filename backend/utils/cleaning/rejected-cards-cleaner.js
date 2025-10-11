const sequelize = require('../../db');
const MusicCard = require('../../models/music-card-model');
const CategoryMusic = require('../../models/category-music-model');
const Favorite = require('../../models/favorite-model');
const MusicCardStatus = require('../../enums/music-card-status');
const PeriodicCleaner = require('./periodic-cleaner');
const audioUploader = require('../audio-uploader');


class RejectedCardCleaner extends PeriodicCleaner {
  constructor(intervalMs) {
    super(intervalMs);
  }

  async clean() {
    const cleanupTransaction = await sequelize.transaction();
  
    try {
      const rejectedCards = await MusicCard.findAll({
        where: { status: MusicCardStatus.REJECTED },
        transaction: cleanupTransaction
      });
  
      for (const card of rejectedCards) {
        await CategoryMusic.destroy({ where: { musicCardId: card.id }, transaction: cleanupTransaction });
        await Favorite.destroy({ where: { musicCardId: card.id }, transaction: cleanupTransaction });

        await audioUploader.delete(card.storagePath);
        await MusicCard.destroy({ where: { id: card.id }, transaction: cleanupTransaction });
      }
  
      await cleanupTransaction.commit();
      console.log(`Deleted ${rejectedCards.length} cards`);
    } catch (err) {
      await cleanupTransaction.rollback();
      console.error('Error while deleting rejected cards:', err);
    }
  }
}

module.exports = RejectedCardCleaner;
