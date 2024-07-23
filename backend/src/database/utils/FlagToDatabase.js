const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const Flag = require('../models/Flag');

async function loadFlagImagesToDatabase() {
  await sequelize.sync({ force: true });

  const flagsDir = path.join(__dirname, '../images/flags');
  const flagFiles = fs.readdirSync(flagsDir);

  for (const file of flagFiles) {
    const filePath = path.join(flagsDir, file);
    const fileData = fs.readFileSync(filePath);
    const countryName = path.basename(file, path.extname(file));
    await Flag.create({ country: countryName, image: fileData });
  }
}

module.exports = loadFlagImagesToDatabase;