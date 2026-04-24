import { useState } from 'react'
import Header from './components/Header'
import ScoreTicker from './components/ScoreTicker'
import LiveScores from './components/LiveScores'
import NewsFeed from './components/NewsFeed'
import Standings from './components/Standings'

export default function App() {
  const [activeTab, setActiveTab] = useState('Scores')

  return (
    <div className="noise min-h-screen" style={{ background: 'var(--pitch-950)' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScoreTicker />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'Scores' && <LiveScores />}
        {activeTab === 'News' && <NewsFeed />}
        {activeTab === 'Standings' && <Standings />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-16 py-8 text-center">
        <p className="text-xs font-mono text-white/20">
          PITCHSIDE © 2025 — Built with React + Vite · Data from API-Football
        </p>
        <p className="text-xs font-mono text-white/10 mt-1">
          Currently showing demo data · Connect API keys to go live
        </p>
      </footer>
    </div>
  )
}
