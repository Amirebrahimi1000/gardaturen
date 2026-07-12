import { MISSIONS } from '../data/missions'
import { useStore } from '../store'

export default function Missions() {
  const { state, toggleMission } = useStore()
  const done = state.missions.length

  return (
    <>
      <h2 className="screen-title">🏆 Oppdrag</h2>
      <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 12px' }}>
        {done} av {MISSIONS.length} oppdrag klart. Hvert oppdrag gir ⭐⭐⭐⭐⭐!
      </p>

      {MISSIONS.map((m) => {
        const on = state.missions.includes(m.id)
        return (
          <button
            key={m.id}
            className={`row-item ${on ? 'done' : ''}`}
            onClick={() => toggleMission(m.id)}
          >
            <span className="ricon">{m.icon}</span>
            <span style={{ flex: 1 }}>
              <div className="rtitle">{m.title}</div>
              <div className="rdesc">{m.desc}</div>
            </span>
            <span className={`tickbox ${on ? 'on' : ''}`}>{on ? '✓' : ''}</span>
          </button>
        )
      })}
    </>
  )
}
