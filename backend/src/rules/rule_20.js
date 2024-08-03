const Rule = require("./rule");

const rule_20 = new Rule(
  20,
  "Rule 20 - Your password must include the current time",
  (text) => {
    const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    console.log(currentTime);
    return text.includes(currentTime);
  }, // ex : 10:30
  null,
);


module.exports = rule_20;
