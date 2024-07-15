const rule = require('./rule');

const rule_5 = new rule(5, "Rule 5 - Your password must include a month of the year" , (text) => {
    return /(?:january|february|march|april|may|june|july|august|september|october|november|december)/i.test(text);
});

module.exports = rule_5;
