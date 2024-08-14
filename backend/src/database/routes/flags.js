const express = require('express');
const router = express.Router();
const Flag = require('../models/Flag');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

router.get('/random', async (req, res) => {
  try {
    const flags = await Flag.findAll({
      attributes: ['id', 'country'],
    });
    const shuffledFlags = flags.sort(() => 0.5 - Math.random());
    const selectedFlags = shuffledFlags.slice(0, 3);
    const responseFlags = selectedFlags.map(flag => ({
      id: flag.id,
      country: flag.country,
      imageUrl: `${BASE_URL}/api/flags/image/${flag.id}`,
    }));

    res.json(responseFlags);
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
