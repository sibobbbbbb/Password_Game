const Rule = require("./rule");

const rule_10 = new Rule(
  10,
  "Rule 10 - Oh no! Your password is on fire 🔥. Quick, put it out!",
  (text, isAlreadyRule10) => {
    return isAlreadyRule10;
  },
  null,
);
module.exports = rule_10;