const Rule = require("./rule");

const rule_18 = new Rule(
  18,
  "Rule 18 - Your password must include the length of your password",
  (text) => {
    const length = text.length.toString();
    return text.includes(length);
  },
  null,
);
module.exports = rule_18;