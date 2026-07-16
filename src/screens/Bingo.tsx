import { useEffect, useRef, useState } from 'react'
import { tripCards, bingoScore, BINGO_BONUS } from '../data/bingo'
import { useStore } from '../store'
import { celebrate } from '../lib/celebrate'

export default function Bingo() {
  const { state, toggleBingo, routeCountries } = useStore()
  const cards = tripCards(routeCountries.map((c) => c.id))
  const [cardId, setCardId] = useState(cards[0]?.id)
  const card = cards.find((c) => c.id === cardId) ?? cards[0]
  const marked = new Set(state.bingo[card.id] ?? [])
  const score = bingoScore(card.id, marked)

  const cells = card.items.map(([icon, label], i) => ({ id: `${card.id}-${i}`, icon, label, idx: i }))

  // Play a little fanfare whenever the bonus for the active card grows (a new
  // line or full board just completed). Skip on first view / card switch.
  const prevBonus = useRef<Record<string, number>>({})
  useEffect(() => {
    const seen = prevBonus.current
    if (card.id in seen && score.bonus > seen[card.id]) celebrate()
    seen[card.id] = score.bonus
  }, [card.id, score.bonus])

  return (
    <>
      <h2 className="screen-title">🎯 Reisebingo</h2>

      <div className="chips">
        {cards.map((c) => {
          const done = (state.bingo[c.id]?.length ?? 0) === c.items.length
          return (
            <button
              key={c.id}
              className={`chip ${done ? 'done' : ''}`}
              style={c.id === card.id ? { outline: '3px solid var(--lake)' } : undefined}
              onClick={() => setCardId(c.id)}
            >
              {c.flag} {c.title.replace('-bingo', '')}
            </button>
          )
        })}
      </div>

      <div className="card">
        <p className="subtle" style={{ marginTop: 0 }}>
          Trykk på en rute når du ser den ute av vinduet. Full rekke, kolonne eller diagonal gir
          bonuspoeng – og fullt brett gir superbonus! ⭐
        </p>

        <div className="bingo-score">
          <div className="bscore-item">
            <b>{score.rows}</b>
            <span>rekker · {BINGO_BONUS.row}⭐</span>
          </div>
          <div className="bscore-item">
            <b>{score.cols}</b>
            <span>kolonner · {BINGO_BONUS.col}⭐</span>
          </div>
          <div className="bscore-item">
            <b>{score.diagonals}</b>
            <span>diagonaler · {BINGO_BONUS.diagonal}⭐</span>
          </div>
          <div className={`bscore-item total ${score.bonus > 0 ? 'on' : ''}`}>
            <b>+{score.bonus}</b>
            <span>bonus ⭐</span>
          </div>
        </div>

        <div className="bingo-grid bingo-4x4">
          {cells.map((cell) => {
            const on = marked.has(cell.id)
            const inLine = score.lineCells.has(cell.idx)
            return (
              <button
                key={cell.id}
                className={`bingo-cell ${on ? 'marked' : ''} ${inLine ? 'inline' : ''}`}
                onClick={() => toggleBingo(card.id, cell.id)}
              >
                {on && <span className="check">✅</span>}
                <span className="bemoji">{cell.icon}</span>
                <span className="blabel">{cell.label}</span>
              </button>
            )
          })}
        </div>
        {score.fullBoard && (
          <div className="win-banner">🎉 BINGO! Hele brettet er fullført! +{BINGO_BONUS.fullBoard} ⭐</div>
        )}
      </div>
    </>
  )
}
