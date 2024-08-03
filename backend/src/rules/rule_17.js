const Rule = require("./rule");

const rule_17 = new Rule(
  17,
  "Rule 17 - At least X% of your password must be in digits",
  (text,_,{X}) => {
    const digits = text.replace(/[^0-9]/g, "").length;
    const percentage = (digits / text.length) * 100;
    return percentage >= X;
  },
  {
    easy: { X: 10 },
    medium: { X: 20 },
    hard: { X: 30 },
  }
);

module.exports = rule_17;
