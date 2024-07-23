import { useEffect } from "react";

export function isStringAllFireEmoji(text) {
  const characters = Array.from(text);
  const allFireEmoji = characters.every(char => char === "🔥");
  return allFireEmoji;
}

export function updateStringWithFireEmoji(text) {
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