export const highlightInvalidCharacters = (
  inputText,
  invalidNumbers,
  invalidRomans,
  setHighlightedText
) => {
  let newText = inputText;
  if (invalidNumbers) {
    newText = newText.replace(
      /\d/g,
      (match) => `<span class="bg-red-500">${match}</span>`
    );
  }
  if (invalidRomans) {
    const romanPattern = /[IVXLCDM]/g;
    newText = newText.replace(
      romanPattern,
      (match) => `<span class="bg-red-500">${match}</span>`
    );
  }
  setHighlightedText(newText);
};
