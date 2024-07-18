const Rule = require('./rule');

const rule_7 = new Rule(7, "Rule 7 - Your password must include a Roman numeral", (text) => {
    return /(I|V|X|L|C|D|M)/.test(text);
});

module.exports = rule_7;