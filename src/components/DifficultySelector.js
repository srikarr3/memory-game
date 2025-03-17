import React from 'react';
import './DifficultySelector.css';

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  const handleChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <div className="difficulty-selector">
      <label htmlFor="difficulty-select">Difficulty:</label>
      <select
        id="difficulty-select"
        value={difficulty}
        onChange={handleChange}
        aria-label="Select Difficulty"
      >
        <option value="easy">Easy (4 Pairs)</option>
        <option value="medium">Medium (8 Pairs)</option>
        <option value="hard">Hard (12 Pairs)</option>
      </select>
    </div>
  );
};

export default DifficultySelector;
