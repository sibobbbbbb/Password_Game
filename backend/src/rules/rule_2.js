const rule = require('./rule');

const rule_2 = new rule(2, "Rule 2 - Your password must include a number", (text) => {
    return /\d/.test(text);
});

module.exports = rule_2;