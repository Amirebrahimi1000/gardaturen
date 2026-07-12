export interface BingoCard {
  id: string
  title: string
  flag: string
  items: [string, string][] // [icon, label] — 16 items, rendered as a 4x4 board
}

export const BINGO_CARDS: BingoCard[] = [
  {
    id: 'norge',
    title: 'Norge-bingo',
    flag: '🇳🇴',
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
    items: [
      ['🌲', 'Sypress-tre'], ['🍇', 'Vinmark'], ['🇮🇹', 'Italiensk flagg'], ['🛵', 'Vespa'],
      ['🫒', 'Olivenlund'], ['🍕', 'Pizza-skilt'], ['🌴', 'Palme'], ['🏖️', 'GARDASJØEN!'],
      ['🍨', 'Gelato-sjappe'], ['⛪', 'Gammel kirke'], ['🏛️', 'Gamle ruiner'], ['🍋', 'Sitrontre'],
      ['🚗', 'Bil med I-skilt'], ['🌅', 'Solnedgang'], ['🏰', 'Borg på en høyde'], ['🌻', 'Solsikkeåker'],
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
