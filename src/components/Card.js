import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ card, onClick }) => {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return ( 
    <div 
      className="card-container" 
      onClick={handleClick} 
      role="button" 
      tabIndex="0" 
      aria-pressed={card.isFlipped || card.isMatched}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <motion.div
        className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-face card-front">
          {card.value}
        </div>
        <div className="card-face card-back">
          ?
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
