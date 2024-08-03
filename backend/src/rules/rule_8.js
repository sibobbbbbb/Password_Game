const Rule = require("./rule");

const rule_8 = new Rule(
  8,
  "Rule 8 - Your password must include one of this country",
  (text, countries) => {
    if (countries.length === 0) {
      return false;
    }
    const pattern = countries.map((str) => `(${str})`).join("|");
    const regex = new RegExp(pattern, "i");
    return regex.test(text);
  },
  null
);

module.exports = rule_8;
