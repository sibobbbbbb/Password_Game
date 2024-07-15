const rule = require('./rule');

const rule_3 = new rule(3, "Rule 3 - Your password must include an uppercase letter", (text) => {
    return /[A-Z]/.test(text);
});

module.exports = rule_3;