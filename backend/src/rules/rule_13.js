const Rule = require("./rule");

const rule_13 = new Rule(
  13,
  "Rule 13 - Your password must include a leap year",
  (text) => {
    const isLeapYear = (year) => {
      if (year % 4 !== 0) return false;
      if (year % 100 === 0 && year % 400 !== 0) return false;
      return true;
    };

    const extractNumbers = (text) => {
      const regex = /\d+/g;
      return text.match(regex) || [];
    };

    const numbers = extractNumbers(text);
    return numbers.some((number) => {
      const year = parseInt(number, 10);
      return isLeapYear(year);
    });
  },
  null
);

module.exports = rule_13;
