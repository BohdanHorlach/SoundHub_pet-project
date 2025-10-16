const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user-model');
const MusicCard = require('./music-card-model');

const Favorite = sequelize.define('Favorite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  musicCardId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'Favorites',
  timestamps: true,
});

User.belongsToMany(MusicCard, { through: Favorite, foreignKey: 'userId', as: 'favorites' });
MusicCard.belongsToMany(User, { through: Favorite, foreignKey: 'musicCardId', as: 'favoritedBy' });

module.exports = Favorite;