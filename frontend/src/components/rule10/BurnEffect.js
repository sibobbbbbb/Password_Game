import { useEffect } from "react";

function isStringAllFireEmoji(text) {
  const characters = Array.from(text);
  const allFireEmoji = characters.every(char => char === "🔥");
  return allFireEmoji;
}

function updateStringWithFireEmoji(text) {
  const characters = Array.from(text);
  for (let i = characters.length - 1; i >= 0; i--) {
    if (characters[i] !== "🔥" && characters[i].match(/[a-zA-Z0-9]/)) {
      characters[i] = "🔥";
      break;
    }
  }
  const result = characters.join('');
  return result;
}


const useBurningEffect = (text, setText, isBurning, setIsBurning) => {
  useEffect(() => {
    let burnInterval;

    if (isBurning) {
      burnInterval = setInterval(() => {
        setText((prevText) => updateStringWithFireEmoji(prevText));
      }, 1000);
    }

    return () => clearInterval(burnInterval);
  }, [isBurning, setText]);
  
  useEffect(() => {
    if (isBurning && isStringAllFireEmoji(text)) {
      console.log("all burn")
      setIsBurning(false);
      setTimeout(() => {
        setIsBurning(true);
      }, Math.floor(Math.random() * (30000 - 20000)) + 20000);
    }
  }, [text, setIsBurning]);
  
  useEffect(() => {
    if (isBurning && text.indexOf("🔥") === -1) {
      console.log("burn stop")
      setIsBurning(false);
      setTimeout(() => {
        setIsBurning(true);
      }, Math.floor(Math.random() * (30000 - 20000)) + 20000);
    }
  }, [text, setIsBurning]);
};


export default useBurningEffect;
