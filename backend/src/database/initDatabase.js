const sequelize = require('./config/database');
const Flag = require('./models/Flag');
const loadImagesToDatabase= require('./utils/FlagToDatabase');

loadImagesToDatabase().then(() => {
  console.log('Images have been loaded into the database.');
}).catch((error) => {
  console.error('Error loading images into the database:', error);
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
