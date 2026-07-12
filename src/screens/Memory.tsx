import { useEffect, useState } from 'react'
import { ModePicker } from '../components/ModePicker'
import { useStore } from '../store'

// Trip-themed icons used as memory pairs (bigger deck = more variety).
const DECK = [
  '🚗', '🏔️', '⛴️', '🧀', '🍕', '🥖', '🍫', '🐄', '🌬️', '🏰', '🚩', '🍦',
  '🌲', '🍇', '🛵', '🅿️', '⛽', '🗺️', '🚦', '🏖️', '🥨', '🧭', '☀️', '🌈',
]

const LEVELS = {
  lett: { pairs: 6, label: 'Lett', cols: 3 },
  vanskelig: { pairs: 8, label: 'Vanskelig', cols: 4 },
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
  const [players, setPlayers] = useState<1 | 2 | null>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [busy, setBusy] = useState(false)
  const [current, setCurrent] = useState<1 | 2>(1) // 2p: whose turn
  const [score, setScore] = useState({ a: 0, b: 0 })

  const start = (lvl: Level) => {
    setLevel(lvl)
    setCards(buildCards(LEVELS[lvl].pairs))
    setFlipped([])
    setMatched([])
    setMoves(0)
    setBusy(false)
    setCurrent(1)
    setScore({ a: 0, b: 0 })
  }

  const won = cards.length > 0 && matched.length === cards.length
  const achId = level ? `husk-${level}` : ''

  // Single-player: award the one-time achievement the first time a level is beaten.
  useEffect(() => {
    if (won && players === 1 && achId) unlockAchievement(achId)
  }, [won, players, achId, unlockAchievement])

  const click = (i: number) => {
    if (busy || flipped.includes(i) || matched.includes(i) || flipped.length === 2) return
    const next = [...flipped, i]
    setFlipped(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      if (cards[next[0]] === cards[next[1]]) {
        setMatched((m) => [...m, ...next])
        setFlipped([])
        if (players === 2) {
          // scorer keeps the turn
          setScore((s) => (current === 1 ? { ...s, a: s.a + 1 } : { ...s, b: s.b + 1 }))
        }
      } else {
        setBusy(true)
        setTimeout(() => {
          setFlipped([])
          setBusy(false)
          if (players === 2) setCurrent((p) => (p === 1 ? 2 : 1))
        }, 900)
      }
    }
  }

  // ---- Pick number of players ----
  if (players === null) {
    return (
      <ModePicker
        title="🧠 Husk-spillet"
        desc="Finn parene! Alene: klar hele brettet. To spillere: dere bytter på – finner du et par, får du ett til. Flest par vinner."
        onPick={setPlayers}
      />
    )
  }

  // ---- Pick level ----
  if (!level) {
    return (
      <>
        <button className="backbtn" onClick={() => setPlayers(null)}>
          ← Antall spillere
        </button>
        <div className="card" style={{ textAlign: 'center', marginTop: 12 }}>
          <div style={{ fontSize: 40 }}>🧠</div>
          <p className="subtle" style={{ marginTop: 0 }}>Velg vanskelighetsgrad:</p>
          {(Object.keys(LEVELS) as Level[]).map((lvl) => (
            <button key={lvl} className="primary" onClick={() => start(lvl)}>
              {LEVELS[lvl].label} ({LEVELS[lvl].pairs} par)
              {players === 1 && state.achievements.includes(`husk-${lvl}`) ? ' ✅' : ''}
            </button>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="backbtn" style={{ marginTop: 0 }} onClick={() => setLevel(null)}>
          ← Nivåer
        </button>
        <span className="subtle" style={{ fontWeight: 800 }}>
          {players === 1 ? `Trekk: ${moves}` : `S1: ${score.a} – S2: ${score.b}`}
        </span>
      </div>

      {players === 2 && !won && (
        <p className="progresstext" style={{ margin: '8px 0 0' }}>
          Tur: Spiller {current} {current === 1 ? '🔵' : '🔴'}
        </p>
      )}

      {won && (
        <div className="win-banner" style={{ marginTop: 12 }}>
          {players === 1
            ? `🎉 Du klarte det på ${moves} trekk!`
            : score.a > score.b
              ? `🏆 Spiller 1 vant ${score.a}–${score.b}!`
              : score.b > score.a
                ? `🏆 Spiller 2 vant ${score.b}–${score.a}!`
                : `Uavgjort ${score.a}–${score.b}! 🤝`}
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
