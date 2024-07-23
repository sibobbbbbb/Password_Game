const Rule = require('./rule');

const rule_13 = new Rule(13, 'Rule 13 - Your password must include a leap year', (text) => {
  const isLeapYear = (year) => {
    if (year % 4 !== 0) return false;
    if (year % 100 === 0 && year % 400 !== 0) return false;
    return true;
  };

  const extractFourDigitNumbers = (text) => {
    const regex = /\d{4}/g;
    return text.match(regex) || [];
  };

  const fourDigitNumbers = extractFourDigitNumbers(text);
  return fourDigitNumbers.some(number => isLeapYear(parseInt(number, 10)));
});

module.exports = rule_13;