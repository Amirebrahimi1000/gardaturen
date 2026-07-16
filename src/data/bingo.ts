export interface BingoCard {
  id: string
  title: string
  flag: string
  items: [string, string][] // [icon, label] — 16 items, rendered as a 4x4 board
  countryIds?: string[] // country-specific card; shown only if the trip visits it
}

// Cards for the active trip: country cards only for visited countries, plus all
// the theme cards (which have no countryIds).
export function tripCards(countryIds: string[]): BingoCard[] {
  return BINGO_CARDS.filter(
    (c) => !c.countryIds || c.countryIds.some((id) => countryIds.includes(id)),
  )
}

// ---- Line scoring ---------------------------------------------------------
// Bonus stars for completing whole lines on a 4x4 board. The values differ so
// that the harder achievements are worth more, and a full board is the biggest
// single prize of all.
export const BINGO_BONUS = {
  row: 3, // full horizontal row
  col: 3, // full vertical column
  diagonal: 5, // full diagonal (only two exist, so it's worth more)
  fullBoard: 15, // every cell marked — the top prize
} as const

const ROWS = [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => r * 4 + c))
const COLS = [0, 1, 2, 3].map((c) => [0, 1, 2, 3].map((r) => r * 4 + c))
const DIAGONALS = [
  [0, 5, 10, 15],
  [3, 6, 9, 12],
]

export interface BingoScore {
  rows: number // number of complete rows
  cols: number // number of complete columns
  diagonals: number // number of complete diagonals
  fullBoard: boolean
  bonus: number // total bonus stars from lines + full board
  lineCells: Set<number> // cell indices that belong to at least one complete line
}

// Score one card from the set of marked cell ids (`${cardId}-${index}`).
export function bingoScore(cardId: string, marked: Set<string>): BingoScore {
  const has = (i: number) => marked.has(`${cardId}-${i}`)
  const lineCells = new Set<number>()
  const scoreLines = (lines: number[][]) => {
    let count = 0
    for (const line of lines) {
      if (line.every(has)) {
        count++
        line.forEach((i) => lineCells.add(i))
      }
    }
    return count
  }

  const rows = scoreLines(ROWS)
  const cols = scoreLines(COLS)
  const diagonals = scoreLines(DIAGONALS)
  const fullBoard = ROWS.flat().every(has)
  const bonus =
    rows * BINGO_BONUS.row +
    cols * BINGO_BONUS.col +
    diagonals * BINGO_BONUS.diagonal +
    (fullBoard ? BINGO_BONUS.fullBoard : 0)

  return { rows, cols, diagonals, fullBoard, bonus, lineCells }
}

export const BINGO_CARDS: BingoCard[] = [
  {
    id: 'norge',
    title: 'Norge-bingo',
    flag: '🇳🇴',
    countryIds: ['no'],
    items: [
      ['🫎', 'Elg-skilt'], ['🕳️', 'Tunnel'], ['💦', 'Foss eller elv'], ['🚐', 'Bobil'],
      ['🐑', 'Sau'], ['⛴️', 'Ferje'], ['🏔️', 'Fjell med snø'], ['🇳🇴', 'Norsk flagg'],
      ['🅿️', 'Bomstasjon'], ['🐄', 'Ku'], ['🌲', 'Granskog'], ['🏞️', 'Innsjø/fjord'],
      ['🚗', 'Rød bil'], ['🚛', 'Lastebil'], ['⛽', 'Bensinstasjon'], ['🌉', 'Bro'],
    ],
  },
  {
    id: 'danmark',
    title: 'Danmark-bingo',
    flag: '🇩🇰',
    countryIds: ['dk'],
    items: [
      ['🌬️', 'Vindmølle'], ['🟩', 'Flatt landskap'], ['🌉', 'Lang bro'], ['🐷', 'Grisefarm'],
      ['🌾', 'Kornåker'], ['🚗', 'Bil med DK-skilt'], ['🇩🇰', 'Dansk flagg'], ['🚲', 'Syklist'],
      ['🛒', 'Netto/Rema'], ['🌭', 'Pølsevogn'], ['🏰', 'Slott'], ['⛴️', 'Ferje'],
      ['🐄', 'Ku'], ['🌊', 'Havet'], ['🧱', 'Lego-skilt'], ['🚙', 'Blå bil'],
    ],
  },
  {
    id: 'tyskland',
    title: 'Tyskland-bingo',
    flag: '🇩🇪',
    countryIds: ['de'],
    items: [
      ['🛣️', 'Autobahn-skilt'], ['🚛', 'Stor lastebil'], ['🌬️', 'Vindmøllepark'], ['🏰', 'Borg/slott'],
      ['🚙', 'BMW/Audi/Merc.'], ['🚏', '«Ausfahrt»-skilt'], ['🅿️', 'Rasteplass'], ['🏍️', 'Motorsykkel'],
      ['☀️', 'Solcellepanel'], ['🥨', 'Bakeri/pretzel'], ['🌉', 'Bro'], ['🕳️', 'Tunnel'],
      ['⛪', 'Kirketårn'], ['🌲', 'Skog'], ['🚄', 'Tog'], ['🏭', 'Fabrikk'],
    ],
  },
  {
    id: 'alpene',
    title: 'Alpe-bingo (Sveits)',
    flag: '🇨🇭',
    countryIds: ['ch'],
    items: [
      ['🏔️', 'Snøtopp'], ['🐄', 'Ku med bjelle'], ['🕳️', 'Lang tunnel'], ['🌉', 'Bro over en dal'],
      ['🏞️', 'Blå fjellsjø'], ['🏡', 'Trehytte'], ['🚂', 'Tog i fjellet'], ['🇨🇭', 'Sveitsisk flagg'],
      ['💦', 'Foss ned et fjell'], ['🧀', 'Ost-skilt'], ['🍫', 'Sjokolade-skilt'], ['🚡', 'Taubane'],
      ['🐐', 'Geit'], ['❄️', 'Snø ved veien'], ['🚗', 'Bil med CH-skilt'], ['🌸', 'Blomstereng'],
    ],
  },
  {
    id: 'italia',
    title: 'Italia-bingo',
    flag: '🇮🇹',
    countryIds: ['it'],
    items: [
      ['🌲', 'Sypress-tre'], ['🍇', 'Vinmark'], ['🇮🇹', 'Italiensk flagg'], ['🛵', 'Vespa'],
      ['🫒', 'Olivenlund'], ['🍕', 'Pizza-skilt'], ['🌴', 'Palme'], ['🏖️', 'GARDASJØEN!'],
      ['🍨', 'Gelato-sjappe'], ['⛪', 'Gammel kirke'], ['🏛️', 'Gamle ruiner'], ['🍋', 'Sitrontre'],
      ['🚗', 'Bil med I-skilt'], ['🌅', 'Solnedgang'], ['🏰', 'Borg på en høyde'], ['🌻', 'Solsikkeåker'],
    ],
  },
  {
    id: 'belgia',
    title: 'Belgia-bingo',
    flag: '🇧🇪',
    countryIds: ['be'],
    items: [
      ['🍟', 'Pommes frites-bod'], ['🧇', 'Vaffel-skilt'], ['🍫', 'Sjokoladebutikk'], ['🇧🇪', 'Belgisk flagg'],
      ['🚗', 'Bil med B-skilt'], ['🌾', 'Flatt jorde'], ['🏰', 'Gammelt torg'], ['🚲', 'Syklist'],
      ['⛪', 'Kirketårn'], ['🌉', 'Kanal eller bro'], ['🚛', 'Lastebil'], ['🐄', 'Ku'],
      ['🏭', 'Fabrikk'], ['🚄', 'Lyntog'], ['🌧️', 'Regn'], ['🅿️', 'Motorveiskilt'],
    ],
  },
  {
    id: 'luxembourg',
    title: 'Luxembourg-bingo',
    flag: '🇱🇺',
    countryIds: ['lu'],
    items: [
      ['🇱🇺', 'Luxemburgsk flagg'], ['🚗', 'Bil med L-skilt'], ['🏰', 'Slott på en klippe'], ['🌉', 'Høy bro'],
      ['🏦', 'Bank-bygg'], ['🌲', 'Skog (Ardennene)'], ['⛪', 'Kirke'], ['🚆', 'Gratis tog/buss'],
      ['🏞️', 'Dyp elvedal'], ['🚙', 'Utenlandsk bil'], ['🌦️', 'Skyet vær'], ['🅿️', 'Bensinstasjon'],
      ['🐄', 'Ku på beite'], ['🏘️', 'Landsby'], ['🌳', 'Grønn park'], ['💶', 'Euro-skilt'],
    ],
  },
  {
    id: 'frankrike',
    title: 'Frankrike-bingo',
    flag: '🇫🇷',
    countryIds: ['fr'],
    items: [
      ['🥖', 'Baguette-bakeri'], ['🥐', 'Croissant-skilt'], ['🇫🇷', 'Fransk flagg'], ['🚗', 'Bil med F-skilt'],
      ['🍇', 'Vinmark'], ['🧀', 'Ost-skilt'], ['🏰', 'Slott (château)'], ['🌻', 'Solsikkeåker'],
      ['⛪', 'Katedral'], ['🌉', 'Elv med bro'], ['🚄', 'TGV-lyntog'], ['🅿️', 'Autoroute-skilt (péage)'],
      ['🐄', 'Ku på jorde'], ['🚲', 'Syklist'], ['☀️', 'Sol'], ['🚧', 'Bomstasjon (péage)'],
    ],
  },
  {
    id: 'liechtenstein', title: 'Liechtenstein-bingo', flag: '🇱🇮', countryIds: ['li'],
    items: [
      ['🇱🇮', 'Liechtensteinsk flagg'], ['🚗', 'Bil med FL-skilt'], ['🏰', 'Fyrsteslottet'], ['🏔️', 'Alpetopp'],
      ['🐄', 'Ku med bjelle'], ['🌲', 'Fjellskog'], ['⛪', 'Kirke i Vaduz'], ['🍇', 'Vinmark'],
      ['🚵', 'Fjellsykkel'], ['🏦', 'Bank'], ['🏞️', 'Elva Rhinen'], ['🚡', 'Taubane'],
      ['🌸', 'Blomstereng'], ['☀️', 'Sol over fjell'], ['🚌', 'Turbuss'], ['🅿️', 'Utsiktsplass'],
    ],
  },
  {
    id: 'sverige', title: 'Sverige-bingo', flag: '🇸🇪', countryIds: ['se'],
    items: [
      ['🇸🇪', 'Svensk flagg'], ['🚗', 'Bil med S-skilt'], ['🌲', 'Endeløs granskog'], ['🫎', 'Elg-skilt'],
      ['🏠', 'Rødt trehus'], ['🛒', 'IKEA-skilt'], ['🦌', 'Hjort eller rein'], ['🏞️', 'Innsjø'],
      ['🚙', 'En Volvo'], ['🌾', 'Kornåker'], ['🐄', 'Ku'], ['🌉', 'Lang bro'],
      ['🕳️', 'Tunnel'], ['⛴️', 'Ferje'], ['☀️', 'Sol'], ['🚲', 'Syklist'],
    ],
  },
  {
    id: 'nederland', title: 'Nederland-bingo', flag: '🇳🇱', countryIds: ['nl'],
    items: [
      ['🇳🇱', 'Nederlandsk flagg'], ['🚗', 'Bil med NL-skilt'], ['🌬️', 'Vindmølle'], ['🌷', 'Tulipaner'],
      ['🚲', 'Masse sykler'], ['🧀', 'Ostebod'], ['🐄', 'Ku'], ['🌊', 'Dike eller kanal'],
      ['⛴️', 'Kanalbåt'], ['🟩', 'Helt flatt land'], ['🚜', 'Traktor'], ['🌉', 'Bro'],
      ['🚛', 'Lastebil'], ['☁️', 'Skyer'], ['🌾', 'Åker'], ['🏠', 'Smalt hus'],
    ],
  },
  {
    id: 'osterrike', title: 'Østerrike-bingo', flag: '🇦🇹', countryIds: ['at'],
    items: [
      ['🇦🇹', 'Østerriksk flagg'], ['🚗', 'Bil med A-skilt'], ['🏔️', 'Alpetopp'], ['⛷️', 'Skisted-skilt'],
      ['🏰', 'Slott'], ['🐄', 'Ku med bjelle'], ['🌲', 'Barskog'], ['🎻', 'Musikk-skilt'],
      ['🚡', 'Taubane'], ['🕳️', 'Fjelltunnel'], ['🌉', 'Viadukt'], ['💧', 'Fjellelv'],
      ['⛪', 'Kirketårn'], ['🌸', 'Blomstereng'], ['☀️', 'Sol over fjell'], ['🚌', 'Turbuss'],
    ],
  },
  {
    id: 'spania', title: 'Spania-bingo', flag: '🇪🇸', countryIds: ['es'],
    items: [
      ['🇪🇸', 'Spansk flagg'], ['🚗', 'Bil med E-skilt'], ['☀️', 'Stekende sol'], ['🫒', 'Olivenlund'],
      ['🍊', 'Appelsintre'], ['🏖️', 'Strand'], ['⚽', 'Fotball-skilt'], ['🌻', 'Solsikkeåker'],
      ['🏰', 'Borg (castell)'], ['🌴', 'Palme'], ['🍅', 'Tomatåker'], ['🚗', 'Rød bil'],
      ['🌉', 'Bro'], ['⛽', 'Bensinstasjon'], ['🏜️', 'Tørt landskap'], ['🐂', 'Okse-skilt'],
    ],
  },
  {
    id: 'portugal', title: 'Portugal-bingo', flag: '🇵🇹', countryIds: ['pt'],
    items: [
      ['🇵🇹', 'Portugisisk flagg'], ['🚗', 'Bil med P-skilt'], ['🌊', 'Atlanterhavet'], ['🐟', 'Fiskebåt'],
      ['🧱', 'Fargerike fliser'], ['🌉', 'Rød bro (Lisboa)'], ['🚋', 'Gul trikk'], ['🍊', 'Appelsintre'],
      ['🌴', 'Palme'], ['🏄', 'Surfer'], ['🍇', 'Vinmark'], ['⛪', 'Kirke'],
      ['☀️', 'Sol'], ['🚗', 'Bil'], ['🅿️', 'Rasteplass'], ['🐄', 'Ku'],
    ],
  },
  {
    id: 'polen', title: 'Polen-bingo', flag: '🇵🇱', countryIds: ['pl'],
    items: [
      ['🇵🇱', 'Polsk flagg'], ['🚗', 'Bil med PL-skilt'], ['🌲', 'Stor skog'], ['🦬', 'Bison-skilt'],
      ['🏰', 'Slott'], ['⛪', 'Kirke'], ['🌾', 'Kornåker'], ['🐄', 'Ku'],
      ['🚛', 'Lastebil'], ['🏘️', 'Fargerik gamleby'], ['🚜', 'Traktor'], ['🌉', 'Bro'],
      ['🕳️', 'Tunnel'], ['⛽', 'Bensinstasjon'], ['☀️', 'Sol'], ['🚗', 'Rød bil'],
    ],
  },
  {
    id: 'tsjekkia', title: 'Tsjekkia-bingo', flag: '🇨🇿', countryIds: ['cz'],
    items: [
      ['🇨🇿', 'Tsjekkisk flagg'], ['🚗', 'Bil med CZ-skilt'], ['🏰', 'Eventyrslott'], ['🍺', 'Ølhus-skilt'],
      ['🕰️', 'Klokketårn'], ['⛪', 'Kirketårn'], ['🌲', 'Skog'], ['🌉', 'Bro over elv'],
      ['🏘️', 'By med røde tak'], ['🐄', 'Ku'], ['🌾', 'Åker'], ['🚋', 'Trikk'],
      ['🚛', 'Lastebil'], ['☀️', 'Sol'], ['🕳️', 'Tunnel'], ['🚗', 'Bil'],
    ],
  },
  {
    id: 'slovakia', title: 'Slovakia-bingo', flag: '🇸🇰', countryIds: ['sk'],
    items: [
      ['🇸🇰', 'Slovakisk flagg'], ['🚗', 'Bil med SK-skilt'], ['🏔️', 'Tatra-fjell'], ['🏰', 'Borg på en høyde'],
      ['🌲', 'Fjellskog'], ['🕳️', 'Grotte-skilt'], ['💧', 'Elva Donau'], ['⛪', 'Trekirke'],
      ['🐑', 'Sau'], ['🐄', 'Ku'], ['🌉', 'Bro'], ['🚜', 'Traktor'],
      ['🌾', 'Åker'], ['☀️', 'Sol'], ['🚌', 'Buss'], ['🚗', 'Bil'],
    ],
  },
  {
    id: 'slovenia', title: 'Slovenia-bingo', flag: '🇸🇮', countryIds: ['si'],
    items: [
      ['🇸🇮', 'Slovensk flagg'], ['🚗', 'Bil med SLO-skilt'], ['🏔️', 'Alpetopp'], ['🏞️', 'Bled-innsjø'],
      ['🌲', 'Grønn skog'], ['🕳️', 'Drypphule-skilt'], ['💧', 'Turkis elv'], ['⛪', 'Kirke på en øy'],
      ['🐝', 'Bikube'], ['🐄', 'Ku'], ['🌉', 'Bro'], ['🌸', 'Blomstereng'],
      ['☀️', 'Sol'], ['🚵', 'Fjellsykkel'], ['🌊', 'Kort kyststripe'], ['🚗', 'Bil'],
    ],
  },
  {
    id: 'kroatia', title: 'Kroatia-bingo', flag: '🇭🇷', countryIds: ['hr'],
    items: [
      ['🇭🇷', 'Kroatisk flagg'], ['🚗', 'Bil med HR-skilt'], ['🌊', 'Blått hav'], ['⛵', 'Seilbåt'],
      ['🏝️', 'En øy'], ['🏰', 'Bymur (Dubrovnik)'], ['💦', 'Foss (Plitvice)'], ['🐕', 'Dalmatiner-hund'],
      ['🫒', 'Olivenlund'], ['🍇', 'Vinmark'], ['⛪', 'Kirke'], ['🌴', 'Palme'],
      ['☀️', 'Sol'], ['🚤', 'Motorbåt'], ['🚗', 'Bil'], ['🅿️', 'Rasteplass'],
    ],
  },
  {
    id: 'ungarn', title: 'Ungarn-bingo', flag: '🇭🇺', countryIds: ['hu'],
    items: [
      ['🇭🇺', 'Ungarsk flagg'], ['🚗', 'Bil med H-skilt'], ['🌉', 'Bro over Donau'], ['♨️', 'Bade-skilt'],
      ['🌶️', 'Paprika-bod'], ['🏰', 'Slott'], ['🐴', 'Hest på sletta'], ['🌾', 'Stor slette'],
      ['⛪', 'Kirke'], ['🐄', 'Ku'], ['🚋', 'Gammel t-bane'], ['🌉', 'Bro'],
      ['☀️', 'Sol'], ['🚜', 'Traktor'], ['🚗', 'Bil'], ['🅿️', 'Rasteplass'],
    ],
  },
  {
    id: 'storbritannia', title: 'Storbritannia-bingo', flag: '🇬🇧', countryIds: ['gb'],
    items: [
      ['🇬🇧', 'Britisk flagg'], ['🚗', 'Bil med GB-skilt'], ['↔️', 'Kjører på venstre side'], ['🚌', 'Rød dobbeltdekker'],
      ['🕰️', 'Stort klokketårn'], ['☂️', 'Noen med paraply'], ['🐑', 'Sau på grønn eng'], ['🏰', 'Gammelt slott'],
      ['🌧️', 'Regn'], ['☕', 'Te-skilt'], ['🚕', 'Svart drosje'], ['⛪', 'Katedral'],
      ['🌉', 'Bro'], ['🐄', 'Ku'], ['🌲', 'Skog'], ['🅿️', 'Rasteplass'],
    ],
  },
  {
    id: 'irland', title: 'Irland-bingo', flag: '🇮🇪', countryIds: ['ie'],
    items: [
      ['🇮🇪', 'Irsk flagg'], ['🚗', 'Bil med IRL-skilt'], ['☘️', 'Kløver'], ['🐑', 'Masse sauer'],
      ['🟢', 'Knallgrønne enger'], ['🌧️', 'Regn'], ['🌈', 'Regnbue'], ['🏰', 'Borgruin'],
      ['🌊', 'Klipper mot havet'], ['⛪', 'Steinkirke'], ['🐄', 'Ku'], ['↔️', 'Kjører på venstre'],
      ['🎻', 'Musikk-pub-skilt'], ['☀️', 'Sol mellom skyer'], ['🌉', 'Bro'], ['🅿️', 'Rasteplass'],
    ],
  },
  {
    id: 'finland', title: 'Finland-bingo', flag: '🇫🇮', countryIds: ['fi'],
    items: [
      ['🇫🇮', 'Finsk flagg'], ['🚗', 'Bil med FIN-skilt'], ['🏞️', 'Innsjø'], ['🌲', 'Furuskog'],
      ['🦌', 'Reinsdyr-skilt'], ['🛖', 'Badstue (sauna)'], ['❄️', 'Snø'], ['🫎', 'Elg-skilt'],
      ['🚗', 'Rød bil'], ['🌉', 'Bro'], ['🐄', 'Ku'], ['🏠', 'Trehytte'],
      ['☀️', 'Midnattssol'], ['🚛', 'Tømmerbil'], ['🌾', 'Åker'], ['🅿️', 'Rasteplass'],
    ],
  },
  {
    id: 'hellas', title: 'Hellas-bingo', flag: '🇬🇷', countryIds: ['gr'],
    items: [
      ['🇬🇷', 'Gresk flagg'], ['🚗', 'Bil med GR-skilt'], ['🏛️', 'Gamle søyler'], ['🌊', 'Blått hav'],
      ['⛵', 'Seilbåt'], ['🐐', 'Geit i fjellet'], ['🫒', 'Olivenlund'], ['☀️', 'Stekende sol'],
      ['🏝️', 'En øy'], ['🏠', 'Hvitt hus, blått tak'], ['🍋', 'Sitrontre'], ['⛪', 'Kloster på fjell'],
      ['🐟', 'Fiskebåt'], ['🌴', 'Palme'], ['🚗', 'Bil'], ['🅿️', 'Rasteplass'],
    ],
  },
  {
    id: 'kjoretoy',
    title: 'Kjøretøy-bingo',
    flag: '🚙',
    items: [
      ['🏍️', 'Motorsykkel'], ['🚌', 'Buss'], ['🚛', 'Lastebil m/henger'], ['🚜', 'Traktor'],
      ['🚓', 'Politibil'], ['🏎️', 'Sportsbil'], ['🚕', 'Taxi'], ['🚑', 'Ambulanse'],
      ['🚐', 'Campingbil'], ['🚗', 'Rød bil'], ['🛵', 'Scooter'], ['🚚', 'Varebil'],
      ['🚒', 'Brannbil'], ['🔌', 'Elbil som lader'], ['🚲', 'Sykler på taket'], ['🌍', 'Utenlandsk skilt'],
    ],
  },
  {
    id: 'rasteplass',
    title: 'Rasteplass-bingo',
    flag: '🅿️',
    items: [
      ['⛽', 'Bensinpumpe'], ['🔌', 'Ladestasjon'], ['🚻', 'Toalett-skilt'], ['☕', 'Noen med kaffe'],
      ['🍦', 'Noen spiser is'], ['🐕', 'Hund som luftes'], ['🗺️', 'Info-kart'], ['🧺', 'Bord å sitte ved'],
      ['🙆', 'Noen strekker beina'], ['🚗', 'Mange parkerte biler'], ['🚛', 'Lastebil på pause'], ['🗑️', 'Søppelkasse'],
      ['🚏', 'Buss-stopp'], ['🚐', 'Bobil parkert'], ['📸', 'Noen tar bilde'], ['🅿️', 'Stort P-skilt'],
    ],
  },
  {
    id: 'vaer',
    title: 'Vær-bingo',
    flag: '⛅',
    items: [
      ['☀️', 'Strålende sol'], ['🌧️', 'Regn på ruta'], ['☁️', 'Store skyer'], ['🌈', 'Regnbue'],
      ['⚡', 'Lyn eller torden'], ['🌫️', 'Tåke'], ['🟦', 'Blå himmel'], ['🌬️', 'Trær som blåser'],
      ['🌡️', 'Over 25 °C'], ['❄️', 'Snø i fjellet'], ['🌥️', 'Delvis skyet'], ['🌆', 'Solnedgang'],
      ['🌙', 'Måne på himmelen'], ['⭐', 'Første stjerne'], ['🌦️', 'Sol og regn'], ['☔', 'Noen med paraply'],
    ],
  },
  {
    id: 'by',
    title: 'By-bingo',
    flag: '🏙️',
    items: [
      ['⛪', 'Kirke'], ['🏢', 'Høyt bygg'], ['🗽', 'Statue'], ['⛲', 'Fontene'],
      ['🚊', 'Trikk/t-bane'], ['☕', 'Uteservering'], ['🛍️', 'Handlegate'], ['🏛️', 'Stort torg'],
      ['📷', 'Turist med kamera'], ['🚦', 'Trafikklys'], ['🚕', 'Taxi'], ['🚏', 'Busstopp'],
      ['🌉', 'Bybro'], ['🕰️', 'Klokketårn'], ['🎡', 'Pariserhjul'], ['🚉', 'Togstasjon'],
    ],
  },
  {
    id: 'natur',
    title: 'Natur-bingo',
    flag: '🌳',
    items: [
      ['🏞️', 'Innsjø'], ['🌳', 'Tett skog'], ['🌼', 'Blomstereng'], ['💦', 'Foss'],
      ['🐦', 'Stor fugl'], ['🐴', 'Hest'], ['🌅', 'Sol opp/ned'], ['🦌', 'Rådyr/hjort'],
      ['🐄', 'Ku på beite'], ['🐑', 'Sau i flokk'], ['🌲', 'Granskog'], ['🦋', 'Sommerfugl'],
      ['🏔️', 'Fjelltopp'], ['🌊', 'Elv med stryk'], ['🐇', 'Hare/kanin'], ['🦆', 'Ender i vann'],
    ],
  },
]
