const fs = require("fs");
const path = require("path");
const sequelize = require("../config/database");
const Captcha = require("../models/Captcha");

async function loadCaptchasImagesToDatabase() {
  await sequelize.sync({ force: true });

  const captchasDir = path.join(__dirname, "../images/captchas");
  const captchaFiles = fs.readdirSync(captchasDir);

  for (const file of captchaFiles) {
    const filePath = path.join(captchasDir, file);
    const fileData = fs.readFileSync(filePath);
    const answer = path.basename(file, path.extname(file));
    await Captcha.create({ answer: answer, image: fileData });
  }
}


module.exports = loadCaptchasImagesToDatabase;
