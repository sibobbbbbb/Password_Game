import React, { useState } from "react";
import Leaderboard from "./Leaderboard";

const StartScreen = ({ onStart }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [viewLeaderboard, setViewLeaderboard] = useState(false);

  const handleStart = () => {
    onStart(selectedDifficulty);
  };

  const showLeaderboard = () => {
    setViewLeaderboard(true);
  };

  const showStartScreen = () => {
    setViewLeaderboard(false);
  };

  if (viewLeaderboard) {
    return <Leaderboard onBackToStart={showStartScreen} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#022B42]">
      <h1 className="py-5 text-6xl font-bold text-white text-center">
        Welcome to Password Game
      </h1>
      <div className="mt-4">
        <label className="text-white text-xl mb-2">Select Difficulty:</label>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="ml-2 p-2 rounded bg-white text-black"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button
        onClick={handleStart}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-300"
      >
        Start
      </button>
      <button
        onClick={showLeaderboard}
        className="my-3 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-300"
      >
        Go to Leaderboard
      </button>
    </div>
  );
};

export default StartScreen;