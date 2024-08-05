const Rule = require("./rule");

const rule_10 = new Rule(
  10,
  "Rule 10 - Oh no! Your password is on fire 🔥. Quick, put it out!",
  (text, isAlreadyRule10) => {
    return isAlreadyRule10;
  },
  {
    easy: { X: 60000 },
    medium: {X: 40000},
    hard: {X: 25000},
  }
);
module.exports = rule_10;