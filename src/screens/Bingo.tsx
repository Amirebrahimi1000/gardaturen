import { useState } from 'react'
import { BINGO_CARDS } from '../data/bingo'
import { useStore } from '../store'

export default function Bingo() {
  const { state, toggleBingo } = useStore()
  const [cardId, setCardId] = useState(BINGO_CARDS[0].id)
  const card = BINGO_CARDS.find((c) => c.id === cardId)!
  const marked = new Set(state.bingo[cardId] ?? [])

  const cells = card.items.map(([icon, label], i) => ({ id: `${card.id}-${i}`, icon, label }))
  const allDone = cells.every((c) => marked.has(c.id))

  return (
    <>
      <h2 className="screen-title">🎯 Reisebingo</h2>

      <div className="chips">
        {BINGO_CARDS.map((c) => {
          const done = (state.bingo[c.id]?.length ?? 0) === c.items.length
          return (
            <button
              key={c.id}
              className={`chip ${done ? 'done' : ''}`}
              style={c.id === cardId ? { outline: '3px solid var(--lake)' } : undefined}
              onClick={() => setCardId(c.id)}
            >
              {c.flag} {c.title.replace('-bingo', '')}
            </button>
          )
        })}
      </div>

      <div className="card">
        <p className="subtle" style={{ marginTop: 0 }}>
          Trykk på en rute når du ser den ute av vinduet. Klarer du hele brettet? ⭐
        </p>
        <div className="bingo-grid bingo-4x4">
          {cells.map((cell) => {
            const on = marked.has(cell.id)
            return (
              <button
                key={cell.id}
                className={`bingo-cell ${on ? 'marked' : ''}`}
                onClick={() => toggleBingo(cardId, cell.id)}
              >
                {on && <span className="check">✅</span>}
                <span className="bemoji">{cell.icon}</span>
                <span className="blabel">{cell.label}</span>
              </button>
            )
          })}
        </div>
        {allDone && <div className="win-banner">🎉 BINGO! Hele brettet er fullført!</div>}
      </div>
    </>
  )
}
