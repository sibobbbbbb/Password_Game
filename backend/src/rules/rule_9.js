const Rule = require("./rule");
// BELOM SELESE
const rule_9 = new Rule(
  9,
  "Rule 9 - The Roman numerals in your password should multiply to X",
  (text,_,{X}) => {
    const romanNumerals = ["I", "V", "X", "L", "C", "D", "M"];
    let result = 1;
    for (const romanNumeral of romanNumerals) {
      const regex = new RegExp(romanNumeral, "g");
      const count = (text.match(regex) || []).length;
      console.log("roman : ", romanNumeral);
      console.log("count : ", count);
      if (count > 0) {
        switch (romanNumeral) {
          case "I":
            result *= Math.pow(1, count);
            break;
          case "V":
            result *= Math.pow(5, count);
            break;
          case "X":
            result *= Math.pow(10, count);
            break;
          case "L":
            result *= Math.pow(50, count); 
            break;
          case "C":
            result *= Math.pow(100, count); 
            break;
          case "D":
            result *= Math.pow(500, count);
            break;
          case "M":
            result *= Math.pow(1000, count);
            break;
        }
      }
    }
    console.log(result);
    return result === X;
  },
  {
    easy: { X: 10 },
    medium: { X: 50 },
    hard: { X: 100 },
  }
);

module.exports = rule_9;
