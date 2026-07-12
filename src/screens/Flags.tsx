import { useState } from 'react'
import { ModePicker } from '../components/ModePicker'
import { PLATES } from '../data/plates'
import { useStore } from '../store'

const POOL = PLATES.map((p) => ({ code: p.code, name: p.country, flag: p.flag }))
const ROUNDS_2P = 8 // total rounds in two-player mode (4 each)

function pickRound(preferUnseen: string[]) {
  const unseen = POOL.filter((c) => !preferUnseen.includes(c.code))
  const bag = unseen.length > 0 ? unseen : POOL
  const correct = bag[Math.floor(Math.random() * bag.length)]
  const distractors = POOL.filter((c) => c.code !== correct.code)
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[distractors[i], distractors[j]] = [distractors[j], distractors[i]]
  }
  const options = [correct, ...distractors.slice(0, 3)]
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[options[i], options[j]] = [options[j], options[i]]
  }
  return { correct, options }
}

export default function Flags() {
  const { state, guessFlag } = useStore()
  const [players, setPlayers] = useState<1 | 2 | null>(null)
  const [round, setRound] = useState(() => pickRound(state.flags))
  const [picked, setPicked] = useState<string | null>(null)
  // two-player
  const [turn, setTurn] = useState(0) // 0-indexed round number
  const [score, setScore] = useState({ a: 0, b: 0 })

  const revealed = picked !== null
  const gotIt = picked === round.correct.code
  const activePlayer: 1 | 2 = turn % 2 === 0 ? 1 : 2
  const done2p = players === 2 && turn >= ROUNDS_2P

  const start = (n: 1 | 2) => {
    setPlayers(n)
    setRound(pickRound(n === 1 ? state.flags : []))
    setPicked(null)
    setTurn(0)
    setScore({ a: 0, b: 0 })
  }

  const answer = (code: string) => {
    if (revealed) return
    setPicked(code)
    const correct = code === round.correct.code
    if (players === 1) {
      guessFlag(round.correct.code, correct)
    } else if (correct) {
      setScore((s) => (activePlayer === 1 ? { ...s, a: s.a + 1 } : { ...s, b: s.b + 1 }))
    }
  }

  const next = () => {
    if (players === 2) {
      setTurn((t) => t + 1)
    }
    setRound(pickRound(players === 1 ? state.flags : []))
    setPicked(null)
  }

  if (players === null) {
    return (
      <ModePicker
        title="🚩 Gjett landet"
        desc="Hvilket land hører flagget til? Alene: samle stjerner. To spillere: dere bytter på – flest riktige av 8 vinner."
        onPick={start}
      />
    )
  }

  if (done2p) {
    return (
      <>
        <button className="backbtn" onClick={() => setPlayers(null)}>
          ← Antall spillere
        </button>
        <div className="card" style={{ marginTop: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>🏁</div>
          <p style={{ fontWeight: 800 }}>
            Spiller 1: {score.a} – Spiller 2: {score.b}
            <br />
            {score.a > score.b
              ? '🏆 Spiller 1 vant!'
              : score.b > score.a
                ? '🏆 Spiller 2 vant!'
                : 'Uavgjort! 🤝'}
          </p>
          <button className="primary" onClick={() => start(2)}>
            🔁 Spill igjen
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <button className="backbtn" onClick={() => setPlayers(null)}>
        ← Antall spillere
      </button>

      <div className="card" style={{ textAlign: 'center', marginTop: 12 }}>
        {players === 1 ? (
          <p className="subtle" style={{ marginTop: 0 }}>
            Gjettet riktig på {state.flags.length} av {POOL.length} flagg.
          </p>
        ) : (
          <p className="subtle" style={{ marginTop: 0 }}>
            Runde {turn + 1}/{ROUNDS_2P} · Tur: <b>Spiller {activePlayer}</b> · S1 {score.a} – S2{' '}
            {score.b}
          </p>
        )}

        <div className="flag-big">{round.correct.flag}</div>
        <div className="quiz-opts">
          {round.options.map((opt) => {
            let cls = 'opt'
            if (revealed) {
              if (opt.code === round.correct.code) cls += ' correct'
              else if (opt.code === picked) cls += ' wrong'
              else cls += ' dim'
            }
            return (
              <button
                key={opt.code}
                className={cls}
                disabled={revealed}
                style={{ textAlign: 'center' }}
                onClick={() => answer(opt.code)}
              >
                {opt.name}
              </button>
            )
          })}
        </div>

        {revealed && (
          <>
            <div className="factbox" style={{ textAlign: 'left' }}>
              {gotIt ? '✅ Riktig! ' : `💡 Dette var flagget til ${round.correct.name}. `}
              Bilskilt-koden er «{round.correct.code}» – se om du finner en slik bil også!
            </div>
            <button className="primary" onClick={next}>
              {players === 2 && turn + 1 >= ROUNDS_2P ? 'Se resultat 🏁' : 'Nytt flagg 🚩'}
            </button>
          </>
        )}
      </div>
    </>
  )
}
