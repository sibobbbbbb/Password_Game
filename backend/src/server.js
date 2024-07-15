const express = require('express');
const cors = require('cors');
const rules = require('./rules/rules.js');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/check', (req, res) => {
  const { text } = req.body;
  let nextRuleIndex = 0;

  for (let i = 0; i < rules.length; i++) {
    if (rules[i].check(text)) {
      nextRuleIndex = i + 1;
    } else {
      break;
    }
  }
  
  res.json({
    rules: rules.slice(0, nextRuleIndex + 1),
    failedRule: nextRuleIndex < rules.length ? rules[nextRuleIndex] : null
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
