const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/check', (req, res) => {
  const { text } = req.body;
  if (text.length >= 7) {
    res.json({ result: 'Password length is valid', isCorrect: true });
  } else {
    res.json({ result: 'Password length is too short', isCorrect: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
