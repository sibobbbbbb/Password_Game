const fs = require('fs');
const path = require('path');
const Rule = require('./rule');

const rules = [];

const rulesDir = __dirname;

fs.readdirSync(rulesDir).forEach(file => {
    if (file !== 'rule.js' && file !== 'rules.js') { 
        const rule = require(path.join(rulesDir, file));
        if (rule instanceof Rule) {
            rules.push(rule);
        } else {
            console.warn(`${file} does not export a valid Rule instance.`);
        }
    }
});
  
module.exports = rules;
