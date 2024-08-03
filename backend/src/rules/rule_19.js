const Rule = require("./rule");

const isPrime = (num) => {
  if (num < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

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
