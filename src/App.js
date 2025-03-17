import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Board from './components/Board';
import DifficultySelector from './components/DifficultySelector';
import ThemeToggle from './components/ThemeToggle';
import Leaderboard from './components/Leaderboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Welcome screen for non-authenticated users
const WelcomeScreen = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Memory Game</h1>
        <p>Challenge your memory and have fun!</p>
        <div className="welcome-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/register" className="auth-button secondary">Register</Link>
        </div>
      </div>
    </div>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/welcome" />;
  }
  return children;
};

function GameContent() {
  const [theme, setTheme] = useState('light');
  const [difficulty, setDifficulty] = useState('medium');
  const { user } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/welcome');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleGameFinish = (score) => {
    const existingScores = JSON.parse(localStorage.getItem('memoryGameHighScores')) || [];
    const newScore = { 
      ...score, 
      date: new Date().toLocaleString(),
      player: user.displayName || user.email
    };
    const updatedScores = [...existingScores, newScore];
    localStorage.setItem('memoryGameHighScores', JSON.stringify(updatedScores));
  };

  return (
    <div className={`App ${theme}`}>
      <header className="app-header">
        <div className="header-top">
          <h1>Memory Game</h1>
          <div className="user-controls">
            <span className="user-info">
              Welcome, {user.displayName || user.email}!
            </span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
        <div className="controls">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
        </div>
      </header>
      <Board difficulty={difficulty} onGameFinish={handleGameFinish} />
      <Leaderboard />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <GameContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
