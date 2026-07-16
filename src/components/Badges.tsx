import { useEffect, useState } from 'react'
import { useStore } from '../store'
import { tripCards, bingoScore } from '../data/bingo'
import { PLATES } from '../data/plates'
import { COUNTRY_DB } from '../data/countryDB'
import { celebrate } from '../lib/celebrate'

type StoreState = ReturnType<typeof useStore>['state']

export type Medal = 'bronze' | 'silver' | 'gold'
export const MEDAL_EMOJI: Record<Medal, string> = { bronze: '🥉', silver: '🥈', gold: '🥇' }

export interface BadgeDef {
  emoji: string
  name: string
  done: boolean
  hint: string
  progress?: { cur: number; max: number }
  tier?: Medal // highest medal reached (tiered badges only)
}

// The nine single-play mini-game achievements (excludes per-country gps-* ids).
const GAME_ACHIEVEMENTS = [
  'reaksjon', 'skiltmatte', 'anagram', 'avstand',
  'reiserute', 'ordsok', 'hovedstad', 'husk-lett', 'husk-vanskelig',
]

// A badge that levels up through bronze/silver/gold as the value grows.
function tieredBadge(
  emoji: string,
  name: string,
  value: number,
  [bronze, silver, gold]: [number, number, number],
  unit: string,
): BadgeDef {
  const tier: Medal | undefined =
    value >= gold ? 'gold' : value >= silver ? 'silver' : value >= bronze ? 'bronze' : undefined
  const nextAt = value < bronze ? bronze : value < silver ? silver : value < gold ? gold : undefined
  return {
    emoji,
    name,
    done: value >= bronze,
    tier,
    progress: { cur: Math.min(value, gold), max: gold },
    hint: nextAt ? `${value}/${nextAt} ${unit}` : `Gull! ${value} ${unit} 🏆`,
  }
}

// A badge that simply fills toward a single goal.
function progressBadge(emoji: string, name: string, cur: number, max: number, hint: string): BadgeDef {
  const done = max > 0 && cur >= max
  return {
    emoji,
    name,
    done,
    hint: done ? 'Klart! ✓' : `${cur}/${max} · ${hint}`,
    progress: { cur, max: Math.max(max, 1) },
  }
}

export function getBadges(
  state: StoreState,
  stars: number,
  totalCountries: number,
  goalStars: number,
  countryIds: string[],
): BadgeDef[] {
  const quizCorrect = Object.values(state.quiz).filter(Boolean).length
  const cards = tripCards(countryIds)
  const bingoLines = cards.reduce((n, c) => {
    const s = bingoScore(c.id, new Set(state.bingo[c.id] ?? []))
    return n + s.rows + s.cols + s.diagonals
  }, 0)
  const bingoCardsDone = cards.filter((c) => (state.bingo[c.id]?.length ?? 0) === c.items.length).length
  const routeCodes = new Set(countryIds.map((id) => COUNTRY_DB[id]?.plate))
  const routePlates = PLATES.filter((p) => routeCodes.has(p.code))
  const gotRoutePlates = routePlates.filter((p) => state.plates.includes(p.code)).length
  const gamesDone = GAME_ACHIEVEMENTS.filter((a) => state.achievements.includes(a)).length

  return [
    // Quick early wins
    { emoji: '🌟', name: 'God start', done: stars >= 1, hint: 'Få din første stjerne' },
    { emoji: '🧭', name: 'På vei', done: state.countries.length >= 1, hint: 'Besøk ditt første land' },
    { emoji: '✨', name: 'Første linje', done: bingoLines >= 1, hint: 'Fullfør én bingolinje' },
    // Tiered badges that grow with you
    tieredBadge('❓', 'Quizmester', quizCorrect, [10, 25, 50], 'riktige'),
    tieredBadge('🚩', 'Flaggekspert', state.flags.length, [5, 12, 20], 'flagg'),
    tieredBadge('📐', 'Linjejeger', bingoLines, [3, 10, 25], 'linjer'),
    tieredBadge('📔', 'Dagbokskribent', state.journal.length, [1, 3, 7], 'sider'),
    tieredBadge('🎮', 'Spillmester', gamesDone, [3, 6, 9], 'spill'),
    // Whole-trip goals
    progressBadge('🌍', 'Grensekrysser', state.countries.length, totalCountries, 'Besøk alle land'),
    progressBadge('🧩', 'Bingomester', bingoCardsDone, cards.length, 'Fullfør alle bingokort'),
    progressBadge('🚗', 'Skiltsamler', gotRoutePlates, routePlates.length, 'Samle rute-skilt'),
    progressBadge('🏖️', 'Framme!', Math.min(stars, goalStars), goalStars, 'Kjør helt fram'),
  ]
}

// Identity of an earned badge, tier-aware so a bronze→silver upgrade counts as new.
export const badgeKey = (b: BadgeDef) => (b.tier ? `${b.name}:${b.tier}` : b.name)

const seenKey = (tripId: string) => `gardaturen.badgesSeen.${tripId}`
function loadSeen(tripId: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(seenKey(tripId)) ?? '[]')
  } catch {
    return []
  }
}

export function Badges() {
  const { state, stars, routeCountries, goalStars, activeTrip } = useStore()
  const badges = getBadges(state, stars, routeCountries.length, goalStars, routeCountries.map((c) => c.id))
  const earned = badges.filter((b) => b.done)

  // Badges earned since the last time this screen was opened get a "Nytt!" pulse
  // and a little fanfare. Computed once on mount so they stay highlighted while
  // viewing; then persisted so they won't re-pulse next time.
  const [newBadges] = useState<Set<string>>(() => {
    const seen = new Set(loadSeen(activeTrip.id))
    return new Set(earned.map(badgeKey).filter((k) => !seen.has(k)))
  })
  useEffect(() => {
    if (newBadges.size > 0) celebrate()
    const seen = new Set([...loadSeen(activeTrip.id), ...earned.map(badgeKey)])
    try {
      localStorage.setItem(seenKey(activeTrip.id), JSON.stringify([...seen]))
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="badges card">
      <div className="badges-head">
        🏅 Merker — {earned.length}/{badges.length}
      </div>
      <div className="badges-grid">
        {badges.map((b) => {
          const isNew = newBadges.has(badgeKey(b))
          const showBar = b.progress && b.progress.cur < b.progress.max
          const pct = b.progress ? Math.round((b.progress.cur / b.progress.max) * 100) : 0
          return (
            <div
              key={b.name}
              className={`badge-item ${b.done ? 'earned' : ''} ${b.tier ? `tier-${b.tier}` : ''} ${
                isNew ? 'isnew' : ''
              }`}
            >
              {isNew && <span className="badge-new">Nytt!</span>}
              <span className="badge-emoji">
                {b.emoji}
                {b.tier && <span className="badge-medal">{MEDAL_EMOJI[b.tier]}</span>}
              </span>
              <span className="badge-name">{b.name}</span>
              {showBar && (
                <div className="badge-bar">
                  <div className="badge-bar-fill" style={{ width: `${pct}%` }} />
                </div>
              )}
              <span className="badge-hint">{b.hint}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
