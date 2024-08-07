const Rule = require("./rule");
const isPrime = require("./isPrime");
const rule_19 = new Rule(
  19,
  "Rule 19 - The length of your password must be a prime number",
  (text) => {
    const length = text.length;
    return isPrime(length);
  },
  null
);

module.exports = rule_19;
