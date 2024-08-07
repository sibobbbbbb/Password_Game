const changeDesc = require("./rules/changeDesc");
const isPrime = require("./rules/isPrime");

const countDigit = (text) => {
  let sum = 0;
  for (let i = 0; i < text.length; i++) {
    if (/\d/.test(text[i])) {
      sum += parseInt(text[i]);
    }
  }
  return sum;
};

const cheat = (
  text,
  wrongRule,
  difficulty,
  rules,
  countries,
  isAlreadyRule10,
  answer,
  sacrificedLetters
) => {
  let target;
  let tempText;
  switch (wrongRule) {
    case 1:
      let temp =
        rules[wrongRule - 1].difficultyLevels[difficulty].X + (text.length - 5);
      const randomChar = String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      );
      return changeDesc(text, "cheat", "") + randomChar.repeat(temp);
    case 2:
      return (
        changeDesc(text, "cheat", "") +
        Math.floor(Math.random() * 10).toString()
      );
    case 3:
      return (
        changeDesc(text, "cheat", "") +
        String.fromCharCode(65 + Math.floor(Math.random() * 26)).toUpperCase()
      );
    case 4:
      const specialChars = "!@#$%^&*()";
      return (
        changeDesc(text, "cheat", "") +
        specialChars[Math.floor(Math.random() * specialChars.length)]
      );
    case 5:
      tempText = text;
      const targetSum = rules[wrongRule - 1].difficultyLevels[difficulty].X;
      let currentSum = countDigit(tempText);
      target = targetSum - currentSum;

      // Hapus angka jika lebih dari target
      while (target < 0) {
        const digitIdx = tempText.search(/\d/);
        if (digitIdx !== -1) {
          tempText = tempText.slice(0, digitIdx) + tempText.slice(digitIdx + 1);
          target = targetSum - countDigit(tempText);
        } else {
          break;
        }
      }

      // Tambah angka jika kurang dari target
      while (target > 0) {
        const digitToAdd = Math.min(target, 9);
        tempText += digitToAdd.toString();
        target -= digitToAdd;
      }

      return changeDesc(tempText, "cheat", "");
    case 6:
      let month = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];
      return (
        changeDesc(text, "cheat", "") + month[Math.floor(Math.random() * 12)]
      );
    case 7:
      roman = ["I", "V", "X", "L", "C", "D", "M"];
      return (
        changeDesc(text, "cheat", "") + roman[Math.floor(Math.random() * 7)]
      );
    case 8:
      if (countries.length === 0) {
        return changeDesc(text, "cheat", "");
      }
      return (
        changeDesc(text, "cheat", "") +
        countries[Math.floor(Math.random() * countries.length)]
      );
    case 9:
      target = rules[wrongRule - 1].difficultyLevels[difficulty].X;
      text = text.replace(/[IVXLCDM]/g, "");
      switch (target) {
        case 10:
          return changeDesc(text, "cheat", "") + "X";
        case 50:
          return changeDesc(text, "cheat", "") + "L";
        case 100:
          return changeDesc(text, "cheat", "") + "C";
      }
    case 10:
      return changeDesc(text, "cheat", ""); // Nonaktifin burn
    case 11:
      return changeDesc(text, "cheat", ""); // paul nambah telur
    case 12:
      return changeDesc(text, "cheat", "") + answer;
    case 13:
      return changeDesc(text, "cheat", "") + "2000";
    case 14:
      return changeDesc(text, "cheat", ""); // non aktifin makannya si paul
    case 15:
      text = changeDesc(text, "cheat", "");
      sacrificedLetters.forEach((element) => {
        const regex = new RegExp(element, "gi");
        text = text.replace(regex, "");
      });
      return text;
    case 16:
      let words = ["I want IRK", "I need IRK", "I love IRK"];
      return (
        changeDesc(text, "cheat", "") + words[Math.floor(Math.random() * 3)]
      );
    case 17:
      let digits = countDigit(text);
      let percentage = (digits / text.length) * 100;
      target = rules[wrongRule - 1].difficultyLevels[difficulty].X;
      if (percentage >= target) {
        return changeDesc(text, "cheat", "");
      }
      let digitToAdd = Math.floor((target * text.length) / 100) - digits;
      while (digitToAdd > 0) {
        tempText += "0";
        digitToAdd--;
      }
      return changeDesc(tempText, "cheat", "");
    case 18:
      tempText = changeDesc(text, "cheat", "");
      let originalLength = tempText.length;
      let newLength = originalLength + String(originalLength).length;

      while (true) {
        let updatedLength = originalLength + String(newLength).length;
        if (updatedLength === newLength) {
          break;
        }
        newLength = updatedLength;
      }

      return changeDesc(tempText + newLength, "cheat", "");
    case 19:
      tempText = changeDesc(text, "cheat", "");
      let length = tempText.length;

      while (!isPrime(length)) {
        tempText += "0";
        length++;
      }

      return changeDesc(text, "cheat", "");
    case 20:
      const currentTime = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return changeDesc(text, "cheat", "") + currentTime;
  }
};

module.exports = cheat;
