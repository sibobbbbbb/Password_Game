import React, { useState } from "react";

const GameOverScreen = ({ isWinner, score, onPlayAgain }) => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const saveScore = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/score/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, score }),
        }
      );

      if (response.ok) {
        setMessage("Score saved successfully!");
      } else {
        setMessage("Failed to save score.");
      }
    } catch (error) {
      console.error("Error saving score:", error);
      setMessage("Error occurred while saving score.");
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">
          {isWinner ? "Congratulations, You Win!" : "Sorry, You Lose!"}
        </h1>
        <p className="text-2xl mb-4">Your final score: {score}</p>

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={saveScore}
          className="mb-4 bg-green-500 text-white py-2 px-4 rounded"
        >
          Save Score
        </button>
        {message && <p className="text-lg">{message}</p>}

        <button
          onClick={onPlayAgain}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;
