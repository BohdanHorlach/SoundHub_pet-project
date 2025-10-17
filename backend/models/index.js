const sequelize = require('../db');
const User = require('./user-model');
const MusicCard = require('./music-card-model');
const Category = require('./category-model');
const CategoryMusic = require('./category-music-model');
const Favorite = require('./favorite-model');

const initDB = async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { User, MusicCard, Category, CategoryMusic, Favorite, initDB };