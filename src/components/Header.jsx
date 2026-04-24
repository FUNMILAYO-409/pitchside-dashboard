import { useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'

export default function Header({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const tabs = ['Scores', 'News', 'Standings']

  return (
    <header className="sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(4,13,8,0.92)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: 'var(--neon-green)' }}>
            <Zap size={16} fill="black" stroke="black" />
          </div>
          <span className="font-display text-2xl tracking-wider" style={{ color: 'var(--neon-green)' }}>PITCHSIDE</span>
          <span className="hidden sm:inline text-xs text-white/30 font-mono ml-1 mt-1">LIVE</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'text-black font-semibold'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              style={activeTab === tab ? { background: 'var(--neon-green)' } : {}}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Live badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30" style={{ background: 'rgba(239,68,68,0.08)' }}>
          <span className="live-dot w-2 h-2 rounded-full bg-red-500 inline-block"></span>
          <span className="text-xs font-mono text-red-400">3 LIVE</span>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-2 rounded text-white/60 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 px-4 py-3 flex gap-2" style={{ background: 'rgba(4,13,8,0.98)' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setMenuOpen(false) }}
              className={`flex-1 py-2 rounded text-sm font-medium transition-all ${
                activeTab === tab ? 'text-black' : 'text-white/50'
              }`}
              style={activeTab === tab ? { background: 'var(--neon-green)' } : { background: 'rgba(255,255,255,0.05)' }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
