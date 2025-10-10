const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user-model');
const MusicCardStatus = require('../enums/music-card-status');

const MusicCard = sequelize.define('MusicCard', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  publicUrl: { type: DataTypes.STRING, allowNull: false },
  storagePath: { type: DataTypes.STRING, allowNull: false },
  status: { 
    type: DataTypes.ENUM(...Object.values(MusicCardStatus)), 
    defaultValue: MusicCardStatus.PENDING
  },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
});

MusicCard.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(MusicCard, { foreignKey: 'authorId', as: 'audios' });

module.exports = MusicCard;