const express = require("express");
const cors = require("cors");
const rules = require("./rules/rules.js");
const flagRoutes = require("./database/routes/flags.js");
const captchaRoutes = require("./database/routes/captchas.js");
const scoreRoutes = require("./database/routes/score.js");
const cheatGame = require("./cheat.js");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/flags", flagRoutes);
app.use("/api/captchas", captchaRoutes);
app.use('/api/score', scoreRoutes);

app.get("/", (req, res) => {
  res.send("test");
});

app.post("/api/check", (req, res) => {
  const {
    cheat,
    text,
    difficulty,
    countRevealedRules,
    countries,
    isAlreadyRule10,
    answer,
    sacrificedLetters,
  } = req.body;
  console.log(difficulty);
  console.log(cheat);
  let countRevealedRulesBe = countRevealedRules;
  let results = [];
  let cek = null;
  let wrongRuleId = [];
  let tempText = text;
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].id === 8) {
      cek = countries;
    } else if (rules[i].id === 10) {
      cek = isAlreadyRule10;
    } else if (rules[i].id === 12) {
      cek = answer;
    } else if (rules[i].id === 15) {
      cek = sacrificedLetters;
    } else {
      cek = null;
    }
    const isValid = rules[i].check(text, cek, difficulty);
    if(cheat && !isValid){
      wrongRuleId.push(rules[i].id);
    }
    results.push({
      id: rules[i].id,
      description: rules[i].getDesc(difficulty),
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

  if(cheat){
    console.log(wrongRuleId);
    for(let i = 0; i < wrongRuleId.length; i++){
      console.log(`tempText before ${wrongRuleId[i]}:`, tempText);
      tempText = cheatGame(tempText, wrongRuleId[i], difficulty, rules, countries, isAlreadyRule10, answer, sacrificedLetters);
      console.log(`tempText after ${wrongRuleId[i]}:`, tempText);
    }
  }

  console.log("countRevealedRulesBe : ", countRevealedRulesBe);
  console.log("results", results);

  res.json({
    text: tempText || "",
    results: results,
    countRevealedRules: countRevealedRulesBe,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Port from environment: ${process.env.PORT}`);
});