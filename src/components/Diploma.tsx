import { useStore } from '../store'
import { tripCards, bingoScore } from '../data/bingo'
import { getBadges, badgeKey, MEDAL_EMOJI } from './Badges'
import { haversineKm } from '../lib/distance'

// Traveller rank based on how far toward the star goal you've come.
const RANKS: { at: number; title: string; emoji: string }[] = [
  { at: 1.0, title: 'Storreisende', emoji: '👑' },
  { at: 0.75, title: 'Reisemester', emoji: '🚗' },
  { at: 0.5, title: 'Eventyrer', emoji: '🗺️' },
  { at: 0.25, title: 'Oppdager', emoji: '🧭' },
  { at: 0, title: 'Reisenybegynner', emoji: '🌱' },
]

export function Diploma({ onClose }: { onClose: () => void }) {
  const { state, stars, routeCountries, goalStars, activeTrip } = useStore()
  const dateStr = new Date().toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const countryIds = routeCountries.map((c) => c.id)
  const visited = routeCountries.filter((c) => state.countries.includes(c.id))

  const bingoLines = tripCards(countryIds).reduce((n, c) => {
    const s = bingoScore(c.id, new Set(state.bingo[c.id] ?? []))
    return n + s.rows + s.cols + s.diagonals
  }, 0)
  const km = Math.round(haversineKm(activeTrip.from.lat, activeTrip.from.lon, activeTrip.to.lat, activeTrip.to.lon))

  const badges = getBadges(state, stars, routeCountries.length, goalStars, countryIds)
  const earnedBadges = badges.filter((b) => b.done)

  const ratio = goalStars > 0 ? stars / goalStars : 0
  const rank = RANKS.find((r) => ratio >= r.at) ?? RANKS[RANKS.length - 1]

  const stats: { value: number | string; label: string }[] = [
    { value: visited.length, label: 'land besøkt' },
    { value: stars, label: 'stjerner' },
    { value: bingoLines, label: 'bingolinjer' },
    { value: state.journal.length, label: 'dagboksider' },
    { value: km.toLocaleString('nb-NO'), label: 'km luftlinje' },
  ]

  return (
    <div className="diploma-overlay" onClick={onClose}>
      <div className="diploma" onClick={(e) => e.stopPropagation()}>
        <div className="diploma-seal">🎓</div>
        <h2>Reisediplom</h2>
        <p className="diploma-sub">
          {rank.emoji} {rank.title}
        </p>
        <p className="diploma-name">{state.playerName || 'Reisende'}</p>
        <p className="diploma-text">
          har vært på biltur fra 🏁 {activeTrip.from.name} til 🏖️ {activeTrip.to.name}!
        </p>

        <div className="diploma-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {visited.length > 0 && (
          <div className="diploma-stamps">
            {visited.map((c, i) => (
              <div key={c.id} className="stamp" style={{ transform: `rotate(${((i % 3) - 1) * 4}deg)` }}>
                <span className="stamp-flag">{c.flag}</span>
                <span className="stamp-name">{c.name}</span>
              </div>
            ))}
          </div>
        )}

        {earnedBadges.length > 0 && (
          <div className="diploma-medals">
            {earnedBadges.map((b) => (
              <span key={badgeKey(b)} className="diploma-medal" title={b.name}>
                {b.emoji}
                {b.tier && <span className="diploma-medal-tier">{MEDAL_EMOJI[b.tier]}</span>}
              </span>
            ))}
          </div>
        )}

        <p className="diploma-date">{dateStr}</p>
        <div className="diploma-actions no-print">
          <button className="primary" style={{ marginTop: 0 }} onClick={() => window.print()}>
            🖨️ Skriv ut / lagre
          </button>
          <button className="backbtn" style={{ marginTop: 0 }} onClick={onClose}>
            Lukk
          </button>
        </div>
      </div>
    </div>
  )
}
