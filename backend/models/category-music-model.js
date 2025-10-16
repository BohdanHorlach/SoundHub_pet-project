const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Category = require('./category-model');
const MusicCard = require('./music-card-model');

const CategoryMusic = sequelize.define('CategoryMusic', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, {
  tableName: 'CategoryMusics',
  timestamps: true,
});

Category.belongsToMany(MusicCard, { through: CategoryMusic, foreignKey: 'categoryId' });
MusicCard.belongsToMany(Category, { through: CategoryMusic, foreignKey: 'musicCardId', as: 'categories' });

module.exports = CategoryMusic;