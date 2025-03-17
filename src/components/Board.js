import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './Board.css';

const difficultyMap = {
  easy: 4,
  medium: 8,
  hard: 12
};

const Board = ({ difficulty, onGameFinish }) => {
  const numPairs = difficultyMap[difficulty] || 8;

  // Generate and shuffle deck
  const generateDeck = () => {
    const values = Array.from({ length: numPairs }, (_, i) =>
      String.fromCharCode(65 + i)
    );
    let deck = [];
    values.forEach(value => {
      deck.push({ id: `${value}-1`, value, isFlipped: false, isMatched: false });
      deck.push({ id: `${value}-2`, value, isFlipped: false, isMatched: false });
    });
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const [cards, setCards] = useState(generateDeck());
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Audio effects (ensure audio files exist in public/assets/)
  const flipSound = useRef(new Audio(process.env.PUBLIC_URL + '/assets/flip.mp3'));
  const matchSound = useRef(new Audio(process.env.PUBLIC_URL + '/assets/match.mp3'));
  const mismatchSound = useRef(new Audio(process.env.PUBLIC_URL + '/assets/mismatch.mp3'));

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else if (!timerActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, time]);

  const handleCardClick = (cardId) => {
    if (disabled) return;

    if (!timerActive) setTimerActive(true);

    // Play flip sound
    flipSound.current.currentTime = 0;
    flipSound.current.play();

    const newCards = cards.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const clickedCard = newCards.find(card => card.id === cardId);
    if (!firstCard) {
      setFirstCard(clickedCard);
    } else if (!secondCard && clickedCard.id !== firstCard.id) {
      setSecondCard(clickedCard);
      setDisabled(true);
      setMoves(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.value === secondCard.value) {
        matchSound.current.currentTime = 0;
        matchSound.current.play();
        setCards(prevCards =>
          prevCards.map(card =>
            card.value === firstCard.value ? { ...card, isMatched: true } : card
          )
        );
        resetTurn();
      } else {
        mismatchSound.current.currentTime = 0;
        mismatchSound.current.play();
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              (card.id === firstCard.id || card.id === secondCard.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          resetTurn();
        }, 500);
      }
    }
  }, [firstCard, secondCard]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (cards.length && cards.every(card => card.isMatched)) {
      setTimerActive(false);
      onGameFinish({ moves, time, difficulty });
    }
  }, [cards, moves, time, difficulty, onGameFinish]);

  const handleReset = () => {
    setCards(generateDeck());
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
    setMoves(0);
    setTime(0);
    setTimerActive(false);
  };

  return (
    <div className="board">
      <div className="stats" aria-live="polite">
        <p>Moves: {moves}</p>
        <p>Time: {time} sec</p>
      </div>
      <button onClick={handleReset} className="reset-button" aria-label="Restart Game">
        Restart
      </button>
      <div className="cards-grid">
        {cards.map(card => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default Board;
