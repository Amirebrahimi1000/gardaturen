import { useState } from 'react'
import { useStore } from '../store'

const SIZE = 10
const WORDS_PER_BOARD = 8
// Large pool – each board picks a random subset, so you rarely see the same board twice.
const POOL = [
  'PIZZA', 'ALPENE', 'FERJE', 'FJELL', 'ELG', 'OST', 'TUNNEL', 'VAFLER',
  'SVEITS', 'ITALIA', 'NORGE', 'DANMARK', 'TYSKLAND', 'FERIE', 'BOBIL',
  'SJOKOLADE', 'GARDASJØEN', 'MOTORVEI', 'SOMMER', 'KART', 'PASS', 'BRO',
  'GELATO', 'FLAGG', 'BINGO', 'KABIN', 'PASTA', 'VINDMØLLE',
  'SEKK', 'PUTE', 'REISE', 'FART', 'GRENSE', 'KRONER',
]
const ALPHABET = 'ABCDEFGHIJKLMNOPRSTUVÆØÅ'
const DIRS = [
  [0, 1], // right
  [1, 0], // down
  [1, 1], // diagonal down-right
]

interface Cell {
  r: number
  c: number
}
interface Board {
  grid: string[][]
  words: string[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makeBoard(): Board {
  const words = shuffle(POOL.filter((w) => w.length <= SIZE)).slice(0, WORDS_PER_BOARD)
  const grid: string[][] = Array.from({ length: SIZE }, () => Array<string>(SIZE).fill(''))
  const placed: string[] = []
  for (const word of words) {
    let done = false
    for (let attempt = 0; attempt < 150 && !done; attempt++) {
      const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)]
      const maxR = dr ? SIZE - word.length : SIZE - 1
      const maxC = dc ? SIZE - word.length : SIZE - 1
      const r0 = Math.floor(Math.random() * (maxR + 1))
      const c0 = Math.floor(Math.random() * (maxC + 1))
      let ok = true
      for (let k = 0; k < word.length; k++) {
        const ch = grid[r0 + dr * k][c0 + dc * k]
        if (ch !== '' && ch !== word[k]) {
          ok = false
          break
        }
      }
      if (!ok) continue
      for (let k = 0; k < word.length; k++) grid[r0 + dr * k][c0 + dc * k] = word[k]
      placed.push(word)
      done = true
    }
  }
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (grid[r][c] === '') grid[r][c] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  return { grid, words: placed }
}

function lineCells(a: Cell, b: Cell): Cell[] | null {
  const dRow = b.r - a.r
  const dCol = b.c - a.c
  if (dRow === 0 && dCol === 0) return null
  if (dRow !== 0 && dCol !== 0 && Math.abs(dRow) !== Math.abs(dCol)) return null
  const dr = Math.sign(dRow)
  const dc = Math.sign(dCol)
  const len = Math.max(Math.abs(dRow), Math.abs(dCol))
  const cells: Cell[] = []
  for (let k = 0; k <= len; k++) cells.push({ r: a.r + dr * k, c: a.c + dc * k })
  return cells
}

export default function WordSearch() {
  const { unlockAchievement } = useStore()
  const [board, setBoard] = useState<Board>(makeBoard)
  const [found, setFound] = useState<string[]>([])
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set())
  const [sel, setSel] = useState<Cell | null>(null)

  const { grid, words } = board
  const key = (r: number, c: number) => `${r},${c}`
  const done = found.length === words.length

  const tap = (r: number, c: number) => {
    if (!sel) {
      setSel({ r, c })
      return
    }
    const cells = lineCells(sel, { r, c })
    setSel(null)
    if (!cells) return
    const str = cells.map((p) => grid[p.r][p.c]).join('')
    const rev = str.split('').reverse().join('')
    const match = words.find((w) => (w === str || w === rev) && !found.includes(w))
    if (match) {
      const nf = [...found, match]
      setFound(nf)
      setFoundCells((prev) => {
        const s = new Set(prev)
        cells.forEach((p) => s.add(key(p.r, p.c)))
        return s
      })
      if (nf.length === words.length) unlockAchievement('ordsok')
    }
  }

  const restart = () => {
    setFound([])
    setFoundCells(new Set())
    setSel(null)
    setBoard(makeBoard())
  }

  return (
    <div className="card">
      <p style={{ fontWeight: 800, margin: '0 0 4px' }}>🔤 Ordsøk</p>
      <p className="subtle" style={{ marginTop: 0 }}>
        Trykk på første og siste bokstav i et ord. Ordene ligger bortover, nedover og på skrå. Funnet{' '}
        {found.length}/{words.length}.
      </p>

      <div className="ws-grid" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}>
        {grid.map((row, r) =>
          row.map((ch, c) => {
            const isFound = foundCells.has(key(r, c))
            const isSel = sel?.r === r && sel?.c === c
            return (
              <button
                key={key(r, c)}
                className={`ws-cell ${isFound ? 'found' : ''} ${isSel ? 'sel' : ''}`}
                onClick={() => tap(r, c)}
              >
                {ch}
              </button>
            )
          }),
        )}
      </div>

      <div className="ws-words">
        {words.map((w) => (
          <span key={w} className={`ws-word ${found.includes(w) ? 'done' : ''}`}>
            {w}
          </span>
        ))}
      </div>

      {done && <div className="win-banner">🎉 Alle ordene funnet! +4 ⭐</div>}
      <button className="primary" onClick={restart}>
        🔀 Nytt brett
      </button>
    </div>
  )
}
