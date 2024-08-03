const Rule = require("./rule");

const rule_12 = new Rule(
  12,
  "Rule 12 - Your password must include this CAPTCHA",
  (text, answer) => {
    if (!answer) {
      return false;
    }
    const pattern = `(${answer})`;
    const regex = new RegExp(pattern, "i");
    return regex.test(text);
  },
  null,
);

module.exports = rule_12;
