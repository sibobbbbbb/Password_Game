const Rule = require("./rule");

const rule_2 = new Rule(
  2,
  "Rule 2 - Your password must include a number",
  (text) => {
    return /\d/.test(text);
  },
  null,
);

module.exports = rule_2;