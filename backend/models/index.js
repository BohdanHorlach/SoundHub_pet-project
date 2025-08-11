const sequelize = require('../db');
const User = require('./user-model');
const MusicCard = require('./music-card-model');
const Category = require('./category-model');
const CategoryMusic = require('./category-music-model');
const Favorite = require('./favorite-model');
const PORT = process.env.PORT;

const initDB = async (app) => {
  try {
    await sequelize.sync();
    console.log('Database synchronized.');

    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (error) {
    console.log(error);
  }
};

module.exports = { User, MusicCard, Category, CategoryMusic, Favorite, initDB };