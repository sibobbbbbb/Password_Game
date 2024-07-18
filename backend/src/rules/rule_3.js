const Rule = require('./rule');

const rule_3 = new Rule(3, "Rule 3 - Your password must include an uppercase letter", (text) => {
    return /[A-Z]/.test(text);
});

module.exports = rule_3;