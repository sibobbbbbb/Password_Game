const sequelize = require('./config/database');
const loadFlagImagesToDatabase= require('./utils/FlagToDatabase');
const loadCaptchasImagesToDatabase = require('./utils/CaptchaToDatabase');
const syncScoreTable = require('./utils/ScoreSynchronized');

loadFlagImagesToDatabase().then(() => {
  console.log('Images have been loaded into the database.');
}).catch((error) => {
  console.error('Error loading images into the database:', error);
});

loadCaptchasImagesToDatabase()
  .then(() => {
    console.log("Captchas have been loaded into the database.");
  })
  .catch((error) => {
    console.error("Error loading captchas into the database:", error);
  });

syncScoreTable().then(() => {
  console.log('Score table synchronized');
}
).catch((error) => {
  console.error('Error synchronizing Score table:', error);
});

const initDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initDatabase();
