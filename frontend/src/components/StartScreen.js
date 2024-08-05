import React, { useState } from "react";


const StartScreen = ({ onStart }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const handleStart = () => {
    onStart(selectedDifficulty);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="py-5 text-6xl font-bold text-white text-center">
        Welcome to Password Game
      </h1>
      <div className="mt-4">
        <label className="text-white text-xl mb-2">Select Difficulty:</label>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="ml-2 p-2 rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button
        onClick={handleStart}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Start
      </button>
    </div>
  );
};

export default StartScreen;