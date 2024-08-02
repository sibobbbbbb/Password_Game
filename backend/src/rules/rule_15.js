const Rule = require('./rule');

const rule_15 = new Rule(15, 'Rule 15 - A sacrifice must be made. Pick X letters that you will no longer be able to use', (text, sacrificedLetters) => {
  console.log(sacrificedLetters);
  if (sacrificedLetters.length == 0)
  {
    return false;
  }

  const regexPattern = new RegExp(`[${sacrificedLetters.join('')}]`);
  return !regexPattern.test(text);
});

module.exports = rule_15;