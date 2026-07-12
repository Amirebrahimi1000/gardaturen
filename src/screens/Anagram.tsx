import { useState } from 'react'
import { ModePicker } from '../components/ModePicker'
import { useStore } from '../store'

const POOL: { word: string; hint: string }[] = [
  { word: 'GARDASJØEN', hint: 'Målet for hele turen' },
  { word: 'ELG', hint: 'Skogens konge' },
  { word: 'PIZZA', hint: 'Italiensk rett med ost og tomat' },
  { word: 'FERJE', hint: 'Frakter bilen over vann' },
  { word: 'ALPENE', hint: 'Høye fjell dere kjører gjennom' },
  { word: 'SJOKOLADE', hint: 'Sveits er verdenskjent for dette' },
  { word: 'TUNNEL', hint: 'Vei gjennom et fjell' },
  { word: 'VAFLER', hint: 'Belgia er kjent for disse' },
  { word: 'GELATO', hint: 'Italiensk is' },
  { word: 'AUTOBAHN', hint: 'Tysk motorvei uten fartsgrense enkelte steder' },
  { word: 'KØBENHAVN', hint: 'Danmarks hovedstad' },
  { word: 'VINDMØLLE', hint: 'Lager strøm av vind' },
  { word: 'BAGUETTE', hint: 'Langt fransk brød' },
  { word: 'MATTERHORN', hint: 'Berømt spisst fjell i Sveits' },
  { word: 'CROISSANT', hint: 'Flakete fransk bakverk' },
  { word: 'EIFFEL', hint: 'Berømt jerntårn i Paris' },
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

function scramble(word: string): string {
  const letters = word.split('')
  for (let tries = 0; tries < 10; tries++) {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[letters[i], letters[j]] = [letters[j], letters[i]]
    }
    if (letters.join('') !== word) break
  }
  return letters.join(' ')
}

export default function Anagram() {
  const { unlockAchievement } = useStore()
  const [players, setPlayers] = useState<1 | 2 | null>(null)
  const [list, setList] = useState<{ word: string; hint: string }[]>([])
  const [idx, setIdx] = useState(0)
  const [scrambled, setScrambled] = useState('')
  const [guess, setGuess] = useState('')
  const [solved, setSolved] = useState(false)
  const [shown, setShown] = useState(false)
  const [score, setScore] = useState({ a: 0, b: 0 })

  const item = list[idx]
  const last = idx === list.length - 1
  const activePlayer: 1 | 2 = idx % 2 === 0 ? 1 : 2

  const start = (n: 1 | 2) => {
    const chosen = shuffle(POOL).slice(0, PER_GAME)
    setPlayers(n)
    setList(chosen)
    setIdx(0)
    setScrambled(scramble(chosen[0].word))
    setGuess('')
    setSolved(false)
    setShown(false)
    setScore({ a: 0, b: 0 })
  }

  const check = () => {
    if (guess.trim().toUpperCase().replace(/\s/g, '') === item.word) {
      setSolved(true)
      if (players === 2) {
        setScore((s) => (activePlayer === 1 ? { ...s, a: s.a + 1 } : { ...s, b: s.b + 1 }))
      }
    }
  }

  const next = () => {
    if (last) {
      if (players === 1) unlockAchievement('anagram')
      return start(players!) // new random set
    }
    const ni = idx + 1
    setIdx(ni)
    setScrambled(scramble(list[ni].word))
    setGuess('')
    setSolved(false)
    setShown(false)
  }

  if (players === null) {
    return (
      <ModePicker
        title="🔀 Vri på ordet"
        desc="Bokstavene er stokket – hva blir ordet? Alene mot klokka, eller to spillere som bytter på (flest riktige vinner)."
        onPick={start}
      />
    )
  }

  // 2p final screen after the last word is resolved
  const finished2p = players === 2 && last && (solved || shown)

  return (
    <>
      <button className="backbtn" onClick={() => setPlayers(null)}>
        ← Antall spillere
      </button>
      <div className="card" style={{ marginTop: 12 }}>
        <div className="subtle" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Ord {idx + 1}/{list.length}</span>
          <span style={{ fontWeight: 800 }}>
            {players === 1 ? '' : `S1: ${score.a} – S2: ${score.b}`}
          </span>
        </div>

        {players === 2 && (
          <p className="progresstext" style={{ margin: '4px 0' }}>
            Tur: Spiller {activePlayer}
          </p>
        )}

        <div className="anagram-word">{scrambled}</div>
        <p className="subtle" style={{ textAlign: 'center', marginTop: 0 }}>
          💡 Hint: {item.hint}
        </p>

        {!solved && !shown && (
          <>
            <input
              className="journal-input"
              placeholder="Skriv ordet …"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && check()}
              autoCapitalize="characters"
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="primary" style={{ marginTop: 0 }} disabled={!guess.trim()} onClick={check}>
                Sjekk
              </button>
              <button className="backbtn" style={{ marginTop: 0 }} onClick={() => setShown(true)}>
                Vis svar
              </button>
            </div>
          </>
        )}

        {(solved || shown) && (
          <>
            <div className="factbox" style={{ textAlign: 'center' }}>
              {solved ? '✅ Riktig! ' : '💡 Svaret var: '}
              <b>{item.word}</b>
            </div>
            {finished2p ? (
              <div className="win-banner">
                {score.a > score.b
                  ? '🏆 Spiller 1 vant!'
                  : score.b > score.a
                    ? '🏆 Spiller 2 vant!'
                    : 'Uavgjort! 🤝'}
              </div>
            ) : null}
            <button className="primary" onClick={next}>
              {last ? '🔁 Nye ord' : 'Neste ord →'}
            </button>
          </>
        )}
      </div>
    </>
  )
}
