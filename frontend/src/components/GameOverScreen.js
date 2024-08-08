import React from 'react';

const GameOverScreen = ({ isWinner, score, onPlayAgain }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">
          {isWinner ? 'Congratulations, You Win!' : 'Sorry, You Lose!'}
        </h1>
        <p className="text-2xl mb-4">Your final score: {score}</p>
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