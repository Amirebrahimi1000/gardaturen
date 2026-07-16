import { useState } from 'react'
import { ModePicker } from '../components/ModePicker'
import { useStore } from '../store'

interface Q {
  q: string
  answer: number
  unit: string
}

const POOL: Q[] = [
  { q: 'Hvor høyt er Alpenes høyeste fjell, Mont Blanc?', answer: 4808, unit: 'm' },
  { q: 'Hvor høyt er Eiffeltårnet i Paris?', answer: 330, unit: 'm' },
  { q: 'Hvor lang er togtunnelen gjennom Gotthard i Sveits?', answer: 57, unit: 'km' },
  { q: 'Hvor mange øyer har Danmark omtrent?', answer: 400, unit: 'stk' },
  { q: 'Hvor høyt er Danmarks høyeste punkt?', answer: 171, unit: 'm' },
  { q: 'Hvor mange land er medlemmer i EU?', answer: 27, unit: 'stk' },
  { q: 'Hvor lang er Gardasjøen fra nord til sør?', answer: 52, unit: 'km' },
  { q: 'Hvor gammelt er Colosseum i Roma omtrent?', answer: 1950, unit: 'år' },
  { q: 'Hvor høyt er Sveits sitt berømte fjell Matterhorn?', answer: 4478, unit: 'm' },
  { q: 'Hvor mange innbyggere bor det i Luxembourg (hele landet)?', answer: 660000, unit: 'stk' },
  { q: 'Hvor gammelt er tårnet i Pisa omtrent?', answer: 850, unit: 'år' },
  { q: 'Hvor mange offisielle språk har Sveits?', answer: 4, unit: 'stk' },
  { q: 'Hvor lang er Norges lengste veitunnel (Lærdalstunnelen)?', answer: 24, unit: 'km' },
  { q: 'Hvor mange kilometer i timen er fartsgrensen på mange norske motorveier?', answer: 110, unit: 'km/t' },
  { q: 'Hvor dyp er Gardasjøen på det dypeste?', answer: 346, unit: 'm' },
  { q: 'Hvor mange land i Europa bruker euro?', answer: 20, unit: 'stk' },
]
const PER_GAME = 6

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function closeness(guess: number, answer: number): string {
  const off = Math.abs(guess - answer) / answer
  if (off <= 0.1) return 'Kjempenære! 🎯'
  if (off <= 0.3) return 'Ganske nære! 👍'
  if (off <= 0.6) return 'Litt bom 😅'
  return 'Langt unna 🙈'
}

export default function DistanceGuess() {
  const { unlockAchievement } = useStore()
  const [players, setPlayers] = useState<1 | 2 | null>(null)
  const [list, setList] = useState<Q[]>([])
  const [idx, setIdx] = useState(0)
  const [g1, setG1] = useState('')
  const [g2, setG2] = useState('')
  const [turn, setTurn] = useState<'p1' | 'p2'>('p1')
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState({ a: 0, b: 0 })

  const q = list[idx]
  const last = idx === list.length - 1

  const start = (n: 1 | 2) => {
    setPlayers(n)
    setList(shuffle(POOL).slice(0, PER_GAME))
    setIdx(0)
    setScore({ a: 0, b: 0 })
    setG1('')
    setG2('')
    setTurn('p1')
    setRevealed(false)
  }

  const revealOne = () => {
    if (!g1.trim()) return
    setRevealed(true)
    unlockAchievement('avstand')
  }

  const submitP1 = () => {
    if (!g1.trim()) return
    setTurn('p2')
  }
  const revealTwo = () => {
    if (!g2.trim()) return
    const d1 = Math.abs(Number(g1) - q.answer)
    const d2 = Math.abs(Number(g2) - q.answer)
    if (d1 < d2) setScore((s) => ({ ...s, a: s.a + 1 }))
    else if (d2 < d1) setScore((s) => ({ ...s, b: s.b + 1 }))
    setRevealed(true)
  }

  const next = () => {
    if (last) {
      start(players!)
      return
    }
    setIdx((i) => i + 1)
    setG1('')
    setG2('')
    setTurn('p1')
    setRevealed(false)
  }

  if (players === null) {
    return (
      <ModePicker
        title="📏 Gjett avstanden"
        desc="Gjett tallet! Alene ser du hvor nære du var. To spillere: den som er nærmest vinner runden."
        onPick={start}
      />
    )
  }

  return (
    <>
      <button className="backbtn" onClick={() => setPlayers(null)}>
        ← Antall spillere
      </button>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="subtle" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            Spørsmål {idx + 1}/{list.length}
          </span>
          {players === 2 && (
            <span style={{ fontWeight: 800 }}>
              S1: {score.a} – S2: {score.b}
            </span>
          )}
        </div>
        <p className="quiz-q" style={{ fontSize: 18 }}>
          {q.q}
        </p>

        {!revealed && players === 1 && (
          <>
            <input
              className="journal-input"
              type="number"
              inputMode="numeric"
              placeholder={`Ditt tall (${q.unit})`}
              value={g1}
              onChange={(e) => setG1(e.target.value)}
            />
            <button className="primary" style={{ marginTop: 0 }} disabled={!g1.trim()} onClick={revealOne}>
              Se svaret
            </button>
          </>
        )}

        {!revealed && players === 2 && turn === 'p1' && (
          <>
            <p className="subtle">Spiller 1 gjetter (spiller 2 ser bort! 🙈)</p>
            <input
              className="journal-input"
              type="number"
              inputMode="numeric"
              placeholder={`Spiller 1 (${q.unit})`}
              value={g1}
              onChange={(e) => setG1(e.target.value)}
            />
            <button className="primary" style={{ marginTop: 0 }} disabled={!g1.trim()} onClick={submitP1}>
              Klar → spiller 2
            </button>
          </>
        )}

        {!revealed && players === 2 && turn === 'p2' && (
          <>
            <p className="subtle">Spiller 2 gjetter nå! 👀</p>
            <input
              className="journal-input"
              type="number"
              inputMode="numeric"
              placeholder={`Spiller 2 (${q.unit})`}
              value={g2}
              onChange={(e) => setG2(e.target.value)}
            />
            <button className="primary" style={{ marginTop: 0 }} disabled={!g2.trim()} onClick={revealTwo}>
              Se svaret
            </button>
          </>
        )}

        {revealed && (
          <>
            <div className="factbox" style={{ textAlign: 'center' }}>
              Riktig svar: <b>{q.answer.toLocaleString('nb-NO')} {q.unit}</b>
              <br />
              {players === 1 ? (
                <>
                  Du gjettet {Number(g1).toLocaleString('nb-NO')} – {closeness(Number(g1), q.answer)}
                </>
              ) : (
                <>
                  Spiller 1: {Number(g1).toLocaleString('nb-NO')} · Spiller 2:{' '}
                  {Number(g2).toLocaleString('nb-NO')}
                  <br />
                  {Math.abs(Number(g1) - q.answer) < Math.abs(Number(g2) - q.answer)
                    ? '🏆 Spiller 1 var nærmest!'
                    : Math.abs(Number(g2) - q.answer) < Math.abs(Number(g1) - q.answer)
                      ? '🏆 Spiller 2 var nærmest!'
                      : 'Like nære – uavgjort!'}
                </>
              )}
            </div>
            <button className="primary" onClick={next}>
              {last ? '🔁 Spill igjen' : 'Neste →'}
            </button>
          </>
        )}
      </div>
    </>
  )
}
