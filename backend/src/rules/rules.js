const fs = require('fs');
const path = require('path');
const Rule = require('./rule');

const rules = [];

const rulesDir = __dirname;

fs.readdirSync(rulesDir).forEach(file => {
    if (file !== 'rule.js' && file !== 'rules.js' && file !== 'changeDesc.js' && file !== 'isPrime.js') { 
        const rule = require(path.join(rulesDir, file));
        if (rule instanceof Rule) {
            rules.push(rule);
        } else {
            console.warn(`${file} does not export a valid Rule instance.`);
        }
    }
});
rules.sort((a, b) => a.id - b.id);
module.exports = rules;
