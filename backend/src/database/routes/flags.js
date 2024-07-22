const express = require('express');
const router = express.Router();
const Flag = require('../models/Flag');

router.get('/random', async (req, res) => {
  try {
    const count = await Flag.count();
    
    const randomIndexes = Array.from({ length: 3 }, () => Math.floor(Math.random() * count));
    const randomFlags = await Promise.all(randomIndexes.map(index => Flag.findOne({ offset: index })));

    const flags = randomFlags.map(flag => ({
      id: flag.id,
      country: flag.country,
      imageUrl: `http://localhost:5000/api/flags/image/${flag.id}`,
    }));

    res.json(flags);
  } catch (error) {
    console.error('Error fetching random flags:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk mengirimkan gambar sebagai blob
router.get('/image/:id', async (req, res) => {
  try {
    const flag = await Flag.findByPk(req.params.id);
    if (flag) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(flag.image);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
