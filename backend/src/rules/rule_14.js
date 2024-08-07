const Rule = require("./rule");

const rule_14 = new Rule(
  14,
  "Rule 14 - 🐔 Paul has hatched ! Please don’t forget to feed him. He eats X 🐛 every Z second",
  () => {
    return true;
  },
  {
    easy: { X: 2, Y: 20 },
    medium: { X: 4, Y: 15 },
    hard: { X: 5, Y: 12 },
  }
);

module.exports = rule_14;
