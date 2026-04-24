# ⚡ PITCHSIDE — Football Dashboard

A real-time football scores, news, and standings dashboard built with React + Vite. Dark mode by default. Deploys to Vercel in one click.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx       # Nav + mobile menu
│   ├── ScoreTicker.jsx  # Scrolling score ticker
│   ├── LiveScores.jsx   # Score cards grid
│   ├── NewsFeed.jsx     # News cards + category filter
│   └── Standings.jsx    # League table
├── data/
│   └── mockData.js      # ← Replace with real API calls
├── App.jsx
├── main.jsx
└── index.css
```

## 🔌 Connecting Real APIs

When you have your API-Football key from https://api-sports.io:

1. Create `.env` file:
```
VITE_API_FOOTBALL_KEY=your_key_here
```

2. Replace mock data in `src/data/mockData.js` with fetch calls to:
```
https://v3.football.api-sports.io/fixtures?live=all
https://v3.football.api-sports.io/standings?league=39&season=2024
```

## 🌐 Deploy to Vercel

```bash
# Option 1: Push to GitHub then import on vercel.com (recommended)

# Option 2: Vercel CLI
npm i -g vercel
vercel
```

## 🛠 Tech Stack

- React 18 + Vite
- Tailwind CSS (dark mode)
- Lucide React icons
- Fonts: Bebas Neue + DM Sans
