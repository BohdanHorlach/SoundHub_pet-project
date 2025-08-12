const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Roles = require('../enums/roles');


const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firebaseUid: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  avatar: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.ENUM(...Object.values(Roles)), defaultValue: Roles.USER },
});

module.exports = User;