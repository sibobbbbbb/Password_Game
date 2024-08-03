const Rule = require("./rule");

const rule_5 = new Rule(
  5,
  "Rule 5 - The digits in your password must add up to X",
  (text, _ ,{ X }) => {
    let sum = 0;
    for (let i = 0; i < text.length; i++) {
      if (/\d/.test(text[i])) {
        sum += parseInt(text[i]);
      }
    }
    return sum === X;
  },
  {
    easy: { X: 15 },
    medium: { X: 25 },
    hard: { X: 35 },
  },
);
module.exports = rule_5;
