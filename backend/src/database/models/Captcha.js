const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Captcha = sequelize.define('Captcha', {
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
});

module.exports = Captcha;