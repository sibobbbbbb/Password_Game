const Rule = require("./rule");

const rule_11 = new Rule(
  11,
  "Rule 11 - 🥚 This is my chicken Paul. He hasn’t hatched yet. Please put him in your password and keep him safe",
  () => {
    return true;
  },
  null,
);
module.exports = rule_11;
