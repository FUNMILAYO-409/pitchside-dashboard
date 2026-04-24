import { useState } from 'react'
import { RefreshCw, Clock } from 'lucide-react'
import { LIVE_SCORES } from '../data/mockData'

const statusColor = {
  LIVE: { bg: 'rgba(239,68,68,0.12)', text: '#f87171', dot: '#ef4444' },
  HT: { bg: 'rgba(255,184,0,0.12)', text: '#fbbf24', dot: '#f59e0b' },
  FT: { bg: 'rgba(255,255,255,0.05)', text: '#6b7280', dot: '#4b5563' },
}

function ScoreCard({ match, delay }) {
  const s = statusColor[match.status] || statusColor.FT

  return (
    <div
      className="card-hover rounded-xl border border-white/5 p-4 cursor-pointer"
      style={{ background: 'var(--pitch-900)', animationDelay: `${delay}ms`, animation: 'slideUp 0.5s ease-out both' }}
    >
      {/* League + Status */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-white/40 font-mono">{match.leagueLogo} {match.league}</span>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background: s.bg }}>
          {match.status === 'LIVE' && (
            <span className="live-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: s.dot }}></span>
          )}
          <span className="text-xs font-mono font-semibold" style={{ color: s.text }}>
            {match.status === 'LIVE' ? `${match.minute}'` : match.status}
          </span>
        </div>
      </div>

      {/* Teams + Score */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-right">
          <p className="font-semibold text-sm text-white/90 truncate">{match.homeTeam}</p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span
            className="font-display text-3xl leading-none"
            style={{ color: match.homeScore > match.awayScore ? 'var(--neon-green)' : 'white' }}
          >
            {match.homeScore}
          </span>
          <span className="text-white/20 font-mono text-sm">:</span>
          <span
            className="font-display text-3xl leading-none"
            style={{ color: match.awayScore > match.homeScore ? 'var(--neon-green)' : 'white' }}
          >
            {match.awayScore}
          </span>
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-sm text-white/90 truncate">{match.awayTeam}</p>
        </div>
      </div>
    </div>
  )
}

export default function LiveScores() {
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('Just now')

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setLastUpdated('Just now')
    }, 1200)
  }

  const live = LIVE_SCORES.filter(m => m.status === 'LIVE')
  const other = LIVE_SCORES.filter(m => m.status !== 'LIVE')

  return (
    <div className="stagger-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-3xl tracking-wide text-white">LIVE SCORES</h2>
          <p className="text-xs text-white/30 font-mono mt-0.5">
            <Clock size={10} className="inline mr-1" />Updated {lastUpdated}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Live Now */}
      {live.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="live-dot w-2 h-2 rounded-full bg-red-500 inline-block"></span>
            <span className="text-xs font-mono text-red-400 tracking-widest">LIVE NOW</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {live.map((match, i) => <ScoreCard key={match.id} match={match} delay={i * 80} />)}
          </div>
        </div>
      )}

      {/* Other Results */}
      <div>
        <p className="text-xs font-mono text-white/30 tracking-widest mb-3">TODAY'S RESULTS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {other.map((match, i) => <ScoreCard key={match.id} match={match} delay={(live.length + i) * 80} />)}
        </div>
      </div>
    </div>
  )
}
