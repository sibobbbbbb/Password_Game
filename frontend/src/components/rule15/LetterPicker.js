import React, { useState } from "react";

export const nSacredLettersByDifficulty = {
  easy: { X: 1 },
  medium: { X: 3 },
  hard: { X: 5 },
};

export const LetterPicker = ({ onSelect, maxLetters, onClose }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const handleSelect = (letter) => {
    if (
      !selectedLetters.includes(letter) &&
      selectedLetters.length < maxLetters
    ) {
      const newSelectedLetters = [...selectedLetters, letter];
      setSelectedLetters(newSelectedLetters);
    }
  };

  const handleRemove = (letter) => {
    const newSelectedLetters = selectedLetters.filter(
      (selectedLetter) => selectedLetter !== letter
    );
    setSelectedLetters(newSelectedLetters);
  };

  const handleSubmit = () => {
    onSelect(selectedLetters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">
          Pick {maxLetters} letters that you will no longer be able to use:
        </h2>
        <div className="flex flex-wrap justify-center mb-4">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => handleSelect(letter)}
              disabled={selectedLetters.includes(letter)}
              className={`m-1 p-2 border rounded ${
                selectedLetters.includes(letter) ? "bg-red-500" : "bg-blue-500"
              } text-white`}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center mb-4">
          {selectedLetters.map((letter) => (
            <div
              key={letter}
              className="m-1 p-2 border rounded bg-red-500 text-white flex items-center"
            >
              {letter}
              <button
                onClick={() => handleRemove(letter)}
                className="ml-2 bg-gray-700 p-1 rounded text-white"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="items-center">
          <button
            onClick={handleSubmit}
            disabled={selectedLetters.length < maxLetters}
            className="bg-green-500 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};