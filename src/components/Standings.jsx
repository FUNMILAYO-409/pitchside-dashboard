import { useState } from 'react'
import { STANDINGS } from '../data/mockData'

const formColors = {
  W: { bg: 'rgba(0,255,135,0.15)', text: 'var(--neon-green)' },
  D: { bg: 'rgba(255,184,0,0.15)', text: 'var(--neon-amber)' },
  L: { bg: 'rgba(239,68,68,0.15)', text: '#f87171' },
}

function FormBadge({ result }) {
  const c = formColors[result] || formColors.D
  return (
    <span
      className="w-5 h-5 inline-flex items-center justify-center rounded text-xs font-bold"
      style={{ background: c.bg, color: c.text }}
    >
      {result}
    </span>
  )
}

export default function Standings() {
  const leagues = Object.keys(STANDINGS)
  const [activeLeague, setActiveLeague] = useState(leagues[0])
  const rows = STANDINGS[activeLeague]

  const championsSpots = activeLeague === 'Premier League' ? 4 : activeLeague === 'La Liga' ? 4 : 2

  return (
    <div className="stagger-3">
      <h2 className="font-display text-3xl tracking-wide text-white mb-5">STANDINGS</h2>

      {/* League tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {leagues.map(league => (
          <button
            key={league}
            onClick={() => setActiveLeague(league)}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={
              activeLeague === league
                ? { background: 'var(--neon-green)', color: 'black' }
                : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            {league}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/5 overflow-hidden" style={{ background: 'var(--pitch-900)' }}>
        {/* Table header */}
        <div className="grid text-xs font-mono text-white/30 px-4 py-3 border-b border-white/5"
          style={{ gridTemplateColumns: '2rem 1fr 2rem 2rem 2rem 2rem 3rem 2rem 5rem' }}>
          <span>#</span>
          <span>TEAM</span>
          <span className="text-center">P</span>
          <span className="text-center">W</span>
          <span className="text-center">D</span>
          <span className="text-center">L</span>
          <span className="text-center">GD</span>
          <span className="text-center">PTS</span>
          <span className="text-center">FORM</span>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={row.team}
            className="grid items-center px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
            style={{ gridTemplateColumns: '2rem 1fr 2rem 2rem 2rem 2rem 3rem 2rem 5rem' }}
          >
            {/* Position */}
            <span
              className="text-xs font-mono font-bold"
              style={{
                color: i < championsSpots ? 'var(--neon-green)' :
                       i === championsSpots ? 'var(--neon-amber)' : 'rgba(255,255,255,0.3)'
              }}
            >
              {row.pos}
            </span>

            {/* Team */}
            <div className="flex items-center gap-2 min-w-0">
              {i < championsSpots && (
                <div className="w-0.5 h-4 rounded-full shrink-0" style={{ background: 'var(--neon-green)' }} />
              )}
              <span className="text-sm font-medium text-white/80 truncate">{row.team}</span>
            </div>

            <span className="text-center text-xs text-white/40 font-mono">{row.p}</span>
            <span className="text-center text-xs text-white/40 font-mono">{row.w}</span>
            <span className="text-center text-xs text-white/40 font-mono">{row.d}</span>
            <span className="text-center text-xs text-white/40 font-mono">{row.l}</span>
            <span
              className="text-center text-xs font-mono font-semibold"
              style={{ color: row.gd.startsWith('+') ? 'var(--neon-green)' : row.gd === '0' ? 'white' : '#f87171' }}
            >
              {row.gd}
            </span>
            <span className="text-center text-sm font-bold text-white">{row.pts}</span>

            {/* Form */}
            <div className="flex items-center justify-center gap-0.5">
              {row.form.map((r, j) => <FormBadge key={j} result={r} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-0.5 h-3 rounded-full" style={{ background: 'var(--neon-green)' }} />
          <span className="text-xs text-white/30 font-mono">Champions League</span>
        </div>
      </div>
    </div>
  )
}
