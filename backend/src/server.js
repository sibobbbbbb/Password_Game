const express = require("express");
const cors = require("cors");
const rules = require("./rules/rules.js");
const flagRoutes = require('./database/routes/flags.js');
// const captchaRoutes = require('./database/routes/captchas.js');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/flags', flagRoutes);
// app.use('/api/captchas', captchaRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the image upload service!');
});

app.post("/api/check", (req, res) => {
  const { text, countRevealedRules,countries } = req.body;
  let countRevealedRulesBe = countRevealedRules;
  let results = [];
  for (let i = 0; i < rules.length; i++) {
    const isValid = (rules[i].id === 8 && countries != [])? rules[i].check(text,countries) : rules[i].check(text);
    results.push({
      id: rules[i].id,
      description: rules[i].description,
      isValid: isValid,
    });
    if (countRevealedRulesBe === rules[i].id) {
      if (!results.every((result) => result.isValid)) {
        break;
      }
    } else if (countRevealedRulesBe < rules[i].id) {
      countRevealedRulesBe++;
      if (!isValid) {
        break;
      }
    }
  }

  console.log(countRevealedRulesBe);
  console.log(results);

  res.json({
    results: results,
    countRevealedRules: countRevealedRulesBe,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
