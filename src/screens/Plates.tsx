import { PLATES } from '../data/plates'
import { useStore } from '../store'

export default function Plates() {
  const { state, togglePlate } = useStore()
  const onRoute = PLATES.filter((p) => p.onRoute)
  const bonus = PLATES.filter((p) => !p.onRoute)

  const cell = (code: string, country: string, flag: string) => {
    const on = state.plates.includes(code)
    return (
      <button key={code} className={`plate ${on ? 'on' : ''}`} onClick={() => togglePlate(code)}>
        <span className="pflag">{on ? '✅' : flag}</span>
        <div>
          <span className="pcode">{code}</span>
        </div>
        <div className="pname">{country}</div>
      </button>
    )
  }

  return (
    <>
      <h2 className="screen-title">🚗 Skiltjakt</h2>
      <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 8px' }}>
        Se på bilskiltene rundt deg – den lille bokstavkoden viser hvilket land bilen er fra. Trykk
        når du har sett den! ⭐⭐
      </p>

      <div className="section-label">På ruten deres</div>
      <div className="plate-grid">{onRoute.map((p) => cell(p.code, p.country, p.flag))}</div>

      <div className="section-label">Bonus – kan dukke opp overalt</div>
      <div className="plate-grid">{bonus.map((p) => cell(p.code, p.country, p.flag))}</div>

      <p className="subtle" style={{ color: '#e0f2fe', textAlign: 'center', marginTop: 14 }}>
        Samlet {state.plates.length} av {PLATES.length} land 🌍
      </p>
    </>
  )
}
