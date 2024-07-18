const Rule = require('./rule');

const rule_1 = new Rule(1, "Rule 1 - Your password must be at least 5 characters", (text) => {
    return text.length >= 5;
});

module.exports = rule_1;