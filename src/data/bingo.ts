export interface BingoCard {
  id: string
  title: string
  flag: string
  cells: { id: string; label: string; icon: string }[]
}

// Each card is a 3x3 grid (9 things to spot out the window).
export const BINGO_CARDS: BingoCard[] = [
  {
    id: 'norge',
    title: 'Norge-bingo',
    flag: '🇳🇴',
    cells: [
      { id: 'elgskilt', label: 'Elg-skilt', icon: '🫎' },
      { id: 'tunnel', label: 'En tunnel', icon: '🕳️' },
      { id: 'foss', label: 'En foss eller elv', icon: '💦' },
      { id: 'bobil', label: 'En bobil', icon: '🚐' },
      { id: 'sau', label: 'Sau eller ku', icon: '🐑' },
      { id: 'ferje', label: 'En ferje', icon: '⛴️' },
      { id: 'snofjell', label: 'Fjell med snø', icon: '🏔️' },
      { id: 'flagg', label: 'Norsk flagg', icon: '🇳🇴' },
      { id: 'bom', label: 'En bomstasjon', icon: '🅿️' },
    ],
  },
  {
    id: 'danmark',
    title: 'Danmark-bingo',
    flag: '🇩🇰',
    cells: [
      { id: 'vindmolle', label: 'En vindmølle', icon: '🌬️' },
      { id: 'flatt', label: 'Helt flatt landskap', icon: '🟩' },
      { id: 'bro', label: 'En lang bro', icon: '🌉' },
      { id: 'gris', label: 'Grisefarm', icon: '🐷' },
      { id: 'korn', label: 'Kornåker', icon: '🌾' },
      { id: 'dkbil', label: 'Bil med DK-skilt', icon: '🚗' },
      { id: 'dkflagg', label: 'Dansk flagg', icon: '🇩🇰' },
      { id: 'sykkel', label: 'Noen på sykkel', icon: '🚲' },
      { id: 'netto', label: 'En Netto- eller Rema-butikk', icon: '🛒' },
    ],
  },
  {
    id: 'tyskland',
    title: 'Tyskland-bingo',
    flag: '🇩🇪',
    cells: [
      { id: 'autobahn', label: 'Autobahn-skilt', icon: '🛣️' },
      { id: 'lastebil', label: 'Stor lastebil', icon: '🚛' },
      { id: 'vindpark', label: 'Mange vindmøller sammen', icon: '🌬️' },
      { id: 'slott', label: 'En borg eller slott', icon: '🏰' },
      { id: 'tyskbil', label: 'BMW, Audi eller Mercedes', icon: '🚙' },
      { id: 'ausfahrt', label: 'Skilt med «Ausfahrt»', icon: '🚏' },
      { id: 'rasteplass', label: 'En rasteplass', icon: '🅿️' },
      { id: 'mc', label: 'En motorsykkel', icon: '🏍️' },
      { id: 'solpanel', label: 'Solcellepanel på et tak', icon: '☀️' },
    ],
  },
  {
    id: 'alpene',
    title: 'Alpe-bingo (Sveits)',
    flag: '🇨🇭',
    cells: [
      { id: 'topp', label: 'Snøtopp om sommeren', icon: '🏔️' },
      { id: 'kubjelle', label: 'Ku med bjelle', icon: '🐄' },
      { id: 'langtunnel', label: 'En veldig lang tunnel', icon: '🕳️' },
      { id: 'viadukt', label: 'Bro høyt over en dal', icon: '🌉' },
      { id: 'innsjo', label: 'En blå fjellsjø', icon: '🏞️' },
      { id: 'chalet', label: 'Trehytte (chalet)', icon: '🏡' },
      { id: 'tog', label: 'Et tog i fjellet', icon: '🚂' },
      { id: 'chflagg', label: 'Sveitsisk flagg', icon: '🇨🇭' },
      { id: 'foss2', label: 'Foss ned et fjell', icon: '💦' },
    ],
  },
  {
    id: 'italia',
    title: 'Italia-bingo',
    flag: '🇮🇹',
    cells: [
      { id: 'sypress', label: 'Høye smale sypress-trær', icon: '🌲' },
      { id: 'vinmark', label: 'Vinmark', icon: '🍇' },
      { id: 'itflagg', label: 'Italiensk flagg', icon: '🇮🇹' },
      { id: 'vespa', label: 'En Vespa-scooter', icon: '🛵' },
      { id: 'oliven', label: 'Olivenlund', icon: '🫒' },
      { id: 'pizza', label: 'Pizza-skilt', icon: '🍕' },
      { id: 'palme', label: 'En palme', icon: '🌴' },
      { id: 'gardasjo', label: 'GARDASJØEN!', icon: '🏖️' },
      { id: 'gelato', label: 'En is-sjappe (gelato)', icon: '🍨' },
    ],
  },
]
