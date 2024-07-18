const Rule = require('./rule');

const rule_10 = new Rule(10, 'Rule 10 - Oh no! Your password is on fire 🔥. Quick, put it out!', (text) => {return true} );
module.exports = rule_10;
