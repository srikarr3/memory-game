# 🎮 Memory Game

A modern, responsive memory card game built with React and Firebase, featuring authentication, leaderboards, and dark/light mode.

## ✨ Features

- 🎯 Multiple difficulty levels
- 🌓 Dark/Light mode toggle
- 🔐 User authentication (Login/Register)
- 📊 Real-time leaderboard
- 🏆 Score tracking
- 💾 Progress saving
- 📱 Responsive design
- 🎨 Modern UI with animations

## 🚀 Live Demo

[Play the game](https://memory-game-psi-plum.vercel.app/welcome) - Deployed on Vercel

## 🛠️ Technologies Used

- ⚛️ React
- 🔥 Firebase (Authentication & Database)
- 🎨 CSS3 with Modern Features
- 📱 Responsive Design
- 🌐 Vercel Deployment

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## 💻 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/srikarr3/memory-game.git
   cd memory-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication and Realtime Database
   - Copy the `.env.example` file to a new file named `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and replace the placeholder values with your actual Firebase configuration
   - ⚠️ IMPORTANT: Never commit the `.env` file to version control
   ```env
   REACT_APP_FIREBASE_API_KEY=your_actual_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_actual_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   REACT_APP_FIREBASE_APP_ID=your_actual_app_id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎮 Game Features

### Authentication
- User registration with email and password
- Secure login system
- Remember me functionality
- Password reset capability

### Gameplay
- Multiple difficulty levels (Easy, Medium, Hard)
- Score tracking based on moves and time
- Card matching with animations
- Progress saving

### Leaderboard
- Real-time updates
- Filtering by difficulty
- Display of player rankings
- Time and move count tracking

### UI/UX
- Responsive design for all devices
- Dark/Light mode toggle
- Modern animations and transitions
- Clean and intuitive interface

## 📱 Responsive Design

- Desktop: Full experience with larger cards
- Tablet: Optimized layout for medium screens
- Mobile: Compact design with touch-friendly cards

## 🔒 Security Features

- Secure authentication
- Protected routes
- Environment variable protection
- Firebase security rules

## 👤 Author

Srikar
- GitHub: [@srikarr3](https://github.com/srikarr3)

## 🌟 Acknowledgments

- React.js community
- Firebase team
- All contributors and testers
