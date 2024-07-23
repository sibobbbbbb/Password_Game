const Rule = require('./rule');

const rule_15 = new Rule(15, 'Rule 15 - A sacrifice must be made. Pick X letters that you will no longer be able to use', () => {
  return true; // nanti disesuaikan lagi
});

module.exports = rule_15;