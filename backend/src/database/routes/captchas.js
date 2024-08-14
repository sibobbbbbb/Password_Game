const express = require('express');
const router = express.Router();
const Captcha = require('../models/Captcha');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

router.get('/random', async (req, res) => {
  try {
    const count = await Captcha.count();
    const randomIndex = Math.floor(Math.random() * count);
    const randomCaptcha = await Captcha.findOne({ offset: randomIndex });

    if (randomCaptcha) {
      const captcha = {
        id: randomCaptcha.id,
        answer: randomCaptcha.answer,
        imageUrl: `${BASE_URL}/api/captchas/image/${randomCaptcha.id}`,
      };
      res.json(captcha);
    } else {
      res.status(404).send('No captcha found');
    }
  } catch (error) {
    console.error('Error fetching random captcha:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk mengirimkan gambar sebagai blob
router.get('/image/:id', async (req, res) => {
  try {
    const captcha = await Captcha.findByPk(req.params.id);
    if (captcha) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(captcha.image);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
