const Rule = require("./rule");

const rule_1 = new Rule(
  1,
  "Rule 1 - Your password must be at least X characters",
  (text, _, {X}) => text.length >= X,
  {
    easy: { X: 8 },
    medium: { X: 10 },
    hard: { X: 12 },
  },
);

module.exports = rule_1;