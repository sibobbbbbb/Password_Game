const Rule = require('./rule');

const rule_9 = new Rule(9, "Rule 9 - The Roman numerals in your password should multiply to X", (text) => {
    const romanNumerals = ["I", "V", "X", "L", "C", "D", "M"];
    let result = 1;
    for (const romanNumeral of romanNumerals) {
        const regex = new RegExp(romanNumeral, "g");
        const count = (text.match(regex) || []).length;
        if (count > 0) {
            switch (romanNumeral) {
                case "I":
                    result *= count;
                    break;
                case "V":
                    result *= count * 5;
                    break;
                case "X":
                    result *= count * 10;
                    break;
                case "L":
                    result *= count * 50;
                    break;
                case "C":
                    result *= count * 100;
                    break;
                case "D":
                    result *= count * 500;
                    break;
                case "M":
                    result *= count * 1000;
                    break;
            }
        }
    }
    return result === 100; // misal 100
});

module.exports = rule_9;