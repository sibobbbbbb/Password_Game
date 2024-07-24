const Rule = require("./rule");

const rule_17 = new Rule(
  17,
  "Rule 17 - At least X% of your password must be in digits",
  (text) => {
    const X = 30; // misal 30%
    const digits = text.replace(/[^0-9]/g, "").length;
    const percentage = (digits / text.length) * 100;
    return percentage >= X;
  }
);

module.exports = rule_17;
