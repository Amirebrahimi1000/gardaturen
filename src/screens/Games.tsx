import { useState } from 'react'
import Flags from './Flags'
import Memory from './Memory'

type Sub = 'meny' | 'flagg' | 'husk'

const GAMES: { id: Sub; emoji: string; name: string; desc: string }[] = [
  { id: 'flagg', emoji: '🚩', name: 'Gjett landet', desc: 'Kjenn igjen flaggene fra Europa' },
  { id: 'husk', emoji: '🧠', name: 'Husk-spillet', desc: 'Finn parene – memory med reise-symboler' },
]

export default function Games() {
  const [sub, setSub] = useState<Sub>('meny')

  if (sub === 'meny') {
    return (
      <>
        <h2 className="screen-title">🎮 Minispill</h2>
        <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 12px' }}>
          Spill så mye du vil – perfekt når veien blir lang!
        </p>
        {GAMES.map((g) => (
          <button key={g.id} className="row-item" onClick={() => setSub(g.id)}>
            <span className="ricon">{g.emoji}</span>
            <span style={{ flex: 1 }}>
              <div className="rtitle">{g.name}</div>
              <div className="rdesc">{g.desc}</div>
            </span>
            <span style={{ fontSize: 22, color: 'var(--muted)' }}>▶</span>
          </button>
        ))}
      </>
    )
  }

  return (
    <>
      <button className="backbtn" onClick={() => setSub('meny')}>
        ← Minispill
      </button>
      <div style={{ marginTop: 10 }}>{sub === 'flagg' ? <Flags /> : <Memory />}</div>
    </>
  )
}
