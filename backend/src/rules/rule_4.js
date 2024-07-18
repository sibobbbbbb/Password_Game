const Rule = require('./rule');

const rule_4 = new Rule(4, "Rule 4 - Your password must include a special character", (text) => {
    return /[!@#$%^&*(),.?":{}|<>]/.test(text);
});

module.exports = rule_4;