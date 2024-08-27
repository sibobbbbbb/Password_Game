const express = require('express');
const Score = require('../models/Score');
const router = express.Router();

// save score
router.post('/save', async (req, res) => {
  try {
    const { username, score } = req.body;
    if (!username || !score) {
      return res.status(400).json({ error: 'Username and score are required' });
    }
    console.log(username, score);
    await Score.create({ username, score });
    console.log('Score saved successfully');
    return res.status(201).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error('Error saving score:', error);
    return res.status(500).json({ error: 'Failed to save score' });
  }
});

// ambil leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    // Ambil 10 skor tertinggi dari database
    const leaderboard = await Score.findAll({
      order: [['score', 'DESC']],
      limit: 10
    });
    console.log('Leaderboard fetched successfully');
    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
