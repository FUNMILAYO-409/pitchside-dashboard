import { useState } from 'react'
import { ExternalLink, RefreshCw, Clock } from 'lucide-react'
import { NEWS, CATEGORIES } from '../data/mockData'

function NewsCard({ article, featured = false }) {
  return (
    <a
      href={article.url}
      className={`card-hover block rounded-xl overflow-hidden border border-white/5 group ${featured ? 'sm:col-span-2' : ''}`}
      style={{ background: 'var(--pitch-900)' }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-52' : 'h-36'}`}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,21,16,0.95) 0%, transparent 60%)' }} />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full"
            style={{
              background: article.category === 'Transfer Rumors' ? 'rgba(255,184,0,0.2)' :
                          article.category === 'Match Reports' ? 'rgba(0,255,135,0.15)' :
                          'rgba(255,255,255,0.1)',
              color: article.category === 'Transfer Rumors' ? 'var(--neon-amber)' :
                     article.category === 'Match Reports' ? 'var(--neon-green)' :
                     'rgba(255,255,255,0.6)',
              border: `1px solid currentColor`,
            }}
          >
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`font-semibold text-white/90 leading-snug group-hover:text-white transition-colors mb-2 ${featured ? 'text-base' : 'text-sm'}`}>
          {article.title}
        </h3>
        {featured && (
          <p className="text-xs text-white/40 leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold" style={{ color: 'var(--neon-green)' }}>{article.source}</span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1 text-xs text-white/30">
              <Clock size={10} />
              {article.time}
            </span>
          </div>
          <ExternalLink size={12} className="text-white/20 group-hover:text-white/50 transition-colors" />
        </div>
      </div>
    </a>
  )
}

export default function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [refreshing, setRefreshing] = useState(false)

  const filtered = activeCategory === 'All'
    ? NEWS
    : NEWS.filter(n => n.category === activeCategory)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <div className="stagger-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-3xl tracking-wide text-white">LATEST NEWS</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={
              activeCategory === cat
                ? { background: 'var(--neon-green)', color: 'black' }
                : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((article, i) => (
          <NewsCard key={article.id} article={article} featured={i === 0} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-white/20 font-mono text-sm">
          No articles found in this category.
        </div>
      )}
    </div>
  )
}
