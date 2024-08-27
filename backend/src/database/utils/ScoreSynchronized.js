const sequelize = require('../config/database');
const Score = require('../models/Score');

// Fungsi untuk sinkronisasi ulang tabel Score saja
const syncScoreTable = async () => {
  try {
    await Score.sync({ force: true });
    console.log('Score table synchronized');
  } catch (error) {
    console.error('Error synchronizing Score table:', error);
  }
};

module.exports = syncScoreTable;