import { byOrder } from '../data/countries'

// Approximate positions on a stylised mini-map of the route (viewBox 200x300),
// laid out to roughly match where each country sits geographically.
const POINTS: Record<string, [number, number]> = {
  no: [70, 30],
  dk: [96, 74],
  de: [126, 116],
  be: [88, 140],
  lu: [106, 158],
  fr: [78, 192],
  ch: [126, 196],
  li: [146, 190],
  it: [150, 256],
}

// A small offline locator map: the whole route with the given country pinned.
export function CountryMap({ id }: { id: string }) {
  const stops = byOrder.filter((c) => POINTS[c.id])
  const line = stops.map((c) => POINTS[c.id].join(',')).join(' ')
  const hi = POINTS[id]
  const country = byOrder.find((c) => c.id === id)
  const first = POINTS[stops[0].id]
  const last = POINTS[stops[stops.length - 1].id]

  return (
    <svg
      viewBox="0 0 200 300"
      className="country-map"
      role="img"
      aria-label={`Kart som viser hvor ${country?.name ?? ''} ligger på ruten`}
    >
      <defs>
        <linearGradient id="cm-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bae6fd" />
          <stop offset="1" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="200" height="300" rx="16" fill="url(#cm-sea)" />

      {/* driving route */}
      <polyline
        points={line}
        fill="none"
        stroke="#0369a1"
        strokeOpacity="0.45"
        strokeWidth="2.5"
        strokeDasharray="5 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* start / finish flags */}
      <text x={first[0]} y={first[1] - 13} textAnchor="middle" fontSize="12">🏁</text>
      <text x={last[0] + 2} y={last[1] + 24} textAnchor="middle" fontSize="12">🏖️</text>

      {/* every stop */}
      {stops.map((c) => {
        const [x, y] = POINTS[c.id]
        const active = c.id === id
        return (
          <circle
            key={c.id}
            cx={x}
            cy={y}
            r={active ? 8 : 4}
            fill={active ? '#16a34a' : '#e0f2fe'}
            stroke={active ? '#fff' : '#0369a1'}
            strokeWidth={active ? 2.5 : 1}
            strokeOpacity={active ? 1 : 0.5}
          />
        )
      })}

      {/* pin + name for the highlighted country */}
      {hi && country && (
        <>
          <text x={hi[0]} y={hi[1] - 12} textAnchor="middle" fontSize="17">📍</text>
          <text
            x="100"
            y="292"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#0c4a6e"
          >
            {country.flag} {country.name}
          </text>
        </>
      )}
    </svg>
  )
}
