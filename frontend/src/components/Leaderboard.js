import React, { useState, useEffect } from 'react';

const Leaderboard = ({ onBackToStart }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/score/leaderboard`);
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-[#022B42] min-h-screen flex flex-col items-center py-10">
      <button
        onClick={onBackToStart}
        className="mb-8 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-300"
      >
        Back to Start Screen
      </button>
      <div className="bg-[#003A5C] p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Leaderboard</h2>
        <ul className="list-none text-white text-lg">
          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <li key={index} className="flex justify-between border-b border-gray-700 py-3 px-4">
                <span className="text-yellow-400 font-semibold">{index + 1}. {entry.username}</span>
                <span>{entry.score}</span>
              </li>
            ))
          ) : (
            <li className="text-white text-lg text-center">No entries available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
