const Rule = require("./rule");

const rule_16 = new Rule(
  16,
  "Rule 16 - Your password must contain one of the following words: I want IRK | I need IRK | I love IRK",
  (text) => {
    const regex = /(I want IRK|I need IRK|I love IRK)/;
    return regex.test(text);
  },
  null
);

module.exports = rule_16;
