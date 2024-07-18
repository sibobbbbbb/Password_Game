const Rule = require('./rule');

const rule_5 = new Rule(5, "Rule 5 - The digits in your password must add up to 25", (text) => {
    let sum = 0;
    for (let i = 0; i < text.length; i++) {
        if (/\d/.test(text[i])) {
            sum += parseInt(text[i]);
        }
    }
    return sum === 25;
});
module.exports = rule_5;