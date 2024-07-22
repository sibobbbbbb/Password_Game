const { Sequelize } = require('sequelize');
const path = require('path');

// Setup Sequelize to use SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.db'),
});

module.exports = sequelize;
