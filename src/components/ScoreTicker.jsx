import { TICKER_ITEMS } from '../data/mockData'

export default function ScoreTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS] // duplicate for seamless loop

  return (
    <div className="border-b border-white/5" style={{ background: 'var(--pitch-900)' }}>
      <div className="flex items-center">
        <div
          className="shrink-0 px-4 py-2 text-xs font-mono font-semibold tracking-widest z-10"
          style={{ background: 'var(--neon-green)', color: 'black' }}
        >
          LIVE
        </div>
        <div className="ticker-wrap flex-1 py-2">
          <div className="ticker-content">
            {items.map((item, i) => (
              <span key={i} className="inline-block text-xs text-white/70 mr-16 font-mono">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
