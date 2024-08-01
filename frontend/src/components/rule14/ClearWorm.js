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

const checkWorms = (text, setGameOver, setText, Y) => {
  const wormCount = (text.match(/🐛/g) || []).length;
  console.log(wormCount);
  console.log(text);

  if (wormCount < Y) {
    setGameOver(true);
  } else {
    const clearedText = clearWorm(text, Y);
    setText(clearedText);
  }
};


export default checkWorms;
