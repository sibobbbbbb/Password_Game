const Rule = require("./rule");

const rule_14 = new Rule(
  14,
  "Rule 14 - 🐔 Paul has hatched ! Please don’t forget to feed him. He eats X 🐛 every Y second",
  () => {
    return true;
  },
  null, // di frontend 
);

module.exports = rule_14;
