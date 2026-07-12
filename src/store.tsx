import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

// ---- Points awarded per action (stars) -------------------------------------
export const POINTS = {
  bingoCell: 1,
  quizCorrect: 2,
  country: 3,
  mission: 5,
  plate: 2,
} as const

// Total stars needed to "drive" all the way to Gardasjøen on the reise-o-meter.
export const GOAL_STARS = 260

interface SaveState {
  playerName: string
  bingo: Record<string, string[]> // cardId -> marked cell ids
  quiz: Record<string, boolean> // questionId -> was answered correctly
  countries: string[] // unlocked country ids
  missions: string[] // completed mission ids
  plates: string[] // collected plate codes
}

const EMPTY: SaveState = {
  playerName: '',
  bingo: {},
  quiz: {},
  countries: [],
  missions: [],
  plates: [],
}

const STORAGE_KEY = 'gardaturen.save.v1'

function load(): SaveState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    return { ...EMPTY, ...JSON.parse(raw) }
  } catch {
    return EMPTY
  }
}

interface Store {
  state: SaveState
  stars: number
  setName: (name: string) => void
  toggleBingo: (cardId: string, cellId: string) => void
  answerQuiz: (questionId: string, correct: boolean) => void
  unlockCountry: (id: string) => void
  toggleMission: (id: string) => void
  togglePlate: (code: string) => void
  reset: () => void
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SaveState>(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setName = useCallback((playerName: string) => {
    setState((s) => ({ ...s, playerName }))
  }, [])

  const toggleBingo = useCallback((cardId: string, cellId: string) => {
    setState((s) => {
      const marked = new Set(s.bingo[cardId] ?? [])
      marked.has(cellId) ? marked.delete(cellId) : marked.add(cellId)
      return { ...s, bingo: { ...s.bingo, [cardId]: [...marked] } }
    })
  }, [])

  const answerQuiz = useCallback((questionId: string, correct: boolean) => {
    setState((s) => {
      // Once answered correctly it stays correct; never regress the score.
      if (s.quiz[questionId]) return s
      return { ...s, quiz: { ...s.quiz, [questionId]: correct } }
    })
  }, [])

  const unlockCountry = useCallback((id: string) => {
    setState((s) => (s.countries.includes(id) ? s : { ...s, countries: [...s.countries, id] }))
  }, [])

  const toggleMission = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      missions: s.missions.includes(id)
        ? s.missions.filter((m) => m !== id)
        : [...s.missions, id],
    }))
  }, [])

  const togglePlate = useCallback((code: string) => {
    setState((s) => ({
      ...s,
      plates: s.plates.includes(code)
        ? s.plates.filter((p) => p !== code)
        : [...s.plates, code],
    }))
  }, [])

  const reset = useCallback(() => {
    setState((s) => ({ ...EMPTY, playerName: s.playerName }))
  }, [])

  const stars = useMemo(() => {
    const bingoCells = Object.values(state.bingo).reduce((n, arr) => n + arr.length, 0)
    const quizCorrect = Object.values(state.quiz).filter(Boolean).length
    return (
      bingoCells * POINTS.bingoCell +
      quizCorrect * POINTS.quizCorrect +
      state.countries.length * POINTS.country +
      state.missions.length * POINTS.mission +
      state.plates.length * POINTS.plate
    )
  }, [state])

  const value: Store = {
    state,
    stars,
    setName,
    toggleBingo,
    answerQuiz,
    unlockCountry,
    toggleMission,
    togglePlate,
    reset,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
