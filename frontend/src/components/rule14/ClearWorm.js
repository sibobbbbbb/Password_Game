function clearWorm(str, n) {
  let count = 0;
  let result = "";
  let charArray = Array.from(str);

  for (let i = 0; i < charArray.length; i++) {
    if (charArray[i] === '🐛' && count < n) {
      count++;
    } else {
      result += charArray[i];
    }
  }

  return result;
}

export const checkWorms = (text, setGameOver, setText, X) => {
  const wormCount = (text.match(/🐛/g) || []).length;
 
  if (wormCount < X) {
    setGameOver(true);
  } else {
    const clearedText = clearWorm(text, X);
    setText(clearedText);
  }
};

export const feedPaulByDifficulty = {
  easy: {X: 2, Y: 20000 },
  medium: { X: 4, Y: 15000 },
  hard: { X: 5, Y: 12000 },
};
