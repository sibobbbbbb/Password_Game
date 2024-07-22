import { useEffect } from "react";

function isStringAllFireEmoji(text) {
  const characters = Array.from(text);
  const allFireEmoji = characters.every(char => char === "🔥");
  return allFireEmoji;
}

function updateStringWithFireEmoji(text) {
  const characters = Array.from(text);
  for (let i = characters.length - 1; i >= 0; i--) {
    if (characters[i] !== "🔥") {
      characters[i] = "🔥";
      break;
    }
  }
  const result = characters.join('');
  return result;
}

const useBurningEffect = (text, setText, isBurning, setIsBurning) => {
  useEffect(() => {

    if (isBurning) {
      let burnInterval = setInterval(() => {
        if (isBurning && isStringAllFireEmoji(text)) {
          console.log("all burn")
          setIsBurning(false);
          clearInterval(burnInterval);
          setTimeout(() => {
            setIsBurning(true);
            console.log("burn start")
          }, Math.floor(Math.random() * (60000 - 50000 + 1)) + 50000);
        }
        
        if (isBurning && text.indexOf("🔥") === -1) {
          console.log("burn stop")
          setIsBurning(false);
          clearInterval(burnInterval);
          setTimeout(() => {
            console.log("burn start")
            setIsBurning(true);
          }, Math.floor(Math.random() * (60000 - 50000 + 1)) + 50000);
        }
        setText((prevText) => updateStringWithFireEmoji(prevText));
      }, 1000);
    }

  }, [isBurning, setText]);
};


export default useBurningEffect;