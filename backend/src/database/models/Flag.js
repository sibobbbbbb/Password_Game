const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Flag = sequelize.define('Flag', {
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
});

module.exports = Flag;