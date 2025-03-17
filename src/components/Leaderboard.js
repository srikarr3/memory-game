import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('memoryGameHighScores')) || [];
    const sortedScores = storedScores.sort((a, b) => {
      if (a.time === b.time) return a.moves - b.moves;
      return a.time - b.time;
    });
    setScores(sortedScores);
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {scores.length === 0 ? (
        <p>No high scores yet. Play a game to get started!</p>
      ) : (
        <div className="leaderboard-table-container">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Difficulty</th>
                <th>Moves</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index} className={index < 3 ? `rank-${index + 1}` : ''}>
                  <td className="rank-cell">
                    {index + 1}
                    {index < 3 && <span className="trophy">🏆</span>}
                  </td>
                  <td className="player-cell">
                    <span className="player-name">{score.player}</span>
                  </td>
                  <td className="difficulty-cell">
                    <span className={`difficulty-badge ${score.difficulty}`}>
                      {score.difficulty}
                    </span>
                  </td>
                  <td>{score.moves}</td>
                  <td>{score.time}s</td>
                  <td>{new Date(score.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
