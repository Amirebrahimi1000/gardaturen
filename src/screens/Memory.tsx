import { useEffect, useState } from 'react'
import { useStore } from '../store'

// Trip-themed icons used as memory pairs.
const DECK = ['🚗', '🏔️', '⛴️', '🧀', '🍕', '🥖', '🍫', '🐄', '🌬️', '🏰', '🚩', '🍦', '🌲', '🍇', '🛵', '🅿️']

const LEVELS = {
  lett: { pairs: 6, label: 'Lett', cols: 3, stars: '⭐⭐⭐⭐' },
  vanskelig: { pairs: 8, label: 'Vanskelig', cols: 4, stars: '⭐⭐⭐⭐' },
} as const
type Level = keyof typeof LEVELS

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildCards(pairs: number): string[] {
  const chosen = shuffle(DECK).slice(0, pairs)
  return shuffle([...chosen, ...chosen])
}

export default function Memory() {
  const { state, unlockAchievement } = useStore()
  const [level, setLevel] = useState<Level | null>(null)
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [busy, setBusy] = useState(false)

  const start = (lvl: Level) => {
    setLevel(lvl)
    setCards(buildCards(LEVELS[lvl].pairs))
    setFlipped([])
    setMatched([])
    setMoves(0)
    setBusy(false)
  }

  const won = cards.length > 0 && matched.length === cards.length
  const achId = level ? `husk-${level}` : ''
  const firstWin = won && achId !== '' && !state.achievements.includes(achId)

  // Award the one-time achievement the first time a level is beaten.
  useEffect(() => {
    if (won && achId) unlockAchievement(achId)
  }, [won, achId, unlockAchievement])

  const click = (i: number) => {
    if (busy || flipped.includes(i) || matched.includes(i) || flipped.length === 2) return
    const next = [...flipped, i]
    setFlipped(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      if (cards[next[0]] === cards[next[1]]) {
        setMatched((m) => [...m, ...next])
        setFlipped([])
      } else {
        setBusy(true)
        setTimeout(() => {
          setFlipped([])
          setBusy(false)
        }, 900)
      }
    }
  }

  // ---- Level picker ----
  if (!level) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🧠</div>
        <p style={{ fontWeight: 800, margin: '4px 0' }}>Husk-spillet</p>
        <p className="subtle" style={{ marginTop: 0 }}>
          Snu to og to kort og finn parene. Klarer du hele brettet?
        </p>
        {(Object.keys(LEVELS) as Level[]).map((lvl) => (
          <button key={lvl} className="primary" onClick={() => start(lvl)}>
            {LEVELS[lvl].label} ({LEVELS[lvl].pairs} par)
            {state.achievements.includes(`husk-${lvl}`) ? ' ✅' : ''}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="backbtn" style={{ marginTop: 0 }} onClick={() => setLevel(null)}>
          ← Nivåer
        </button>
        <span className="subtle" style={{ fontWeight: 800 }}>
          Trekk: {moves}
        </span>
      </div>

      {won && (
        <div className="win-banner" style={{ marginTop: 12 }}>
          🎉 Du klarte det på {moves} trekk!
          {firstWin ? ` +${4} ⭐` : ''}
        </div>
      )}

      <div
        className="memory-grid"
        style={{ gridTemplateColumns: `repeat(${LEVELS[level].cols}, 1fr)`, marginTop: 12 }}
      >
        {cards.map((emoji, i) => {
          const show = flipped.includes(i) || matched.includes(i)
          return (
            <button
              key={i}
              className={`mcard ${show ? 'up' : ''} ${matched.includes(i) ? 'done' : ''}`}
              onClick={() => click(i)}
            >
              {show ? emoji : '❓'}
            </button>
          )
        })}
      </div>

      <button className="primary" onClick={() => start(level)}>
        {won ? '🔁 Spill igjen' : '🔀 Stokk om på nytt'}
      </button>
    </div>
  )
}
