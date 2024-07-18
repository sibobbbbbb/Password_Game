const Rule = require('./rule');

const rule_8 = new Rule(8, "Rule 8 - Your password must include one of this country", (text) => {
    const countries = ["USA", "Canada", "UK", "Australia", "Germany"]; //misal ini dulu
    for (const country of countries) {
        if (text.includes(country)) {
            return true;
        }
    }
    return false;
});

module.exports = rule_8;