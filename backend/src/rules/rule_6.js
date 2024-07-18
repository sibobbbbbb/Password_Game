const Rule = require('./rule');

const rule_6 = new Rule(6, "Rule 6 - Your password must include a month of the year" , (text) => {
    return /(?:january|february|march|april|may|june|july|august|september|october|november|december)/i.test(text);
});

module.exports = rule_6;
