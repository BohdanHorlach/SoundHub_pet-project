const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_HOST, {
    dialect: process.env.DB_DIALECT,
    logging: false,
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  }
);


module.exports = sequelize;