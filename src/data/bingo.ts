export interface BingoCard {
  id: string
  title: string
  flag: string
  items: [string, string][] // [icon, label] — 24 items, rendered as 5x5 with a free centre
}

// Each card has 24 spottable things; the board shows them as a 5x5 grid with a
// free ⭐ centre square.
export const BINGO_CARDS: BingoCard[] = [
  {
    id: 'norge',
    title: 'Norge-bingo',
    flag: '🇳🇴',
    items: [
      ['🫎', 'Elg-skilt'], ['🕳️', 'Tunnel'], ['💦', 'Foss eller elv'], ['🚐', 'Bobil'],
      ['🐑', 'Sau'], ['⛴️', 'Ferje'], ['🏔️', 'Fjell med snø'], ['🇳🇴', 'Norsk flagg'],
      ['🅿️', 'Bomstasjon'], ['🐄', 'Ku'], ['🌲', 'Granskog'], ['🏞️', 'Innsjø eller fjord'],
      ['🚗', 'Rød bil'], ['🚛', 'Lastebil'], ['⛽', 'Bensinstasjon'], ['🔌', 'Ladestasjon'],
      ['🚜', 'Traktor'], ['🏠', 'Rødt hus'], ['🚲', 'Syklist'], ['🐎', 'Hest'],
      ['🌉', 'Bro'], ['☀️', 'Solskinn'], ['🐦', 'Stor fugl'], ['🚌', 'Buss'],
    ],
  },
  {
    id: 'danmark',
    title: 'Danmark-bingo',
    flag: '🇩🇰',
    items: [
      ['🌬️', 'Vindmølle'], ['🟩', 'Flatt landskap'], ['🌉', 'Lang bro'], ['🐷', 'Grisefarm'],
      ['🌾', 'Kornåker'], ['🚗', 'Bil med DK-skilt'], ['🇩🇰', 'Dansk flagg'], ['🚲', 'Syklist'],
      ['🛒', 'Netto/Rema-butikk'], ['🌭', 'Pølsevogn'], ['🏰', 'Slott'], ['⛴️', 'Ferje'],
      ['🐄', 'Ku'], ['🚛', 'Lastebil'], ['⛽', 'Bensinstasjon'], ['🏠', 'Bondegård'],
      ['🌊', 'Havet'], ['🚌', 'Buss'], ['🐦', 'Måke'], ['☀️', 'Sol'],
      ['🌧️', 'Regn'], ['🚜', 'Traktor'], ['🧱', 'Lego-skilt'], ['🚙', 'Blå bil'],
    ],
  },
  {
    id: 'tyskland',
    title: 'Tyskland-bingo',
    flag: '🇩🇪',
    items: [
      ['🛣️', 'Autobahn-skilt'], ['🚛', 'Stor lastebil'], ['🌬️', 'Vindmøllepark'], ['🏰', 'Borg/slott'],
      ['🚙', 'BMW/Audi/Mercedes'], ['🚏', '«Ausfahrt»-skilt'], ['🅿️', 'Rasteplass'], ['🏍️', 'Motorsykkel'],
      ['☀️', 'Solcellepanel'], ['🍺', 'Ølhage-skilt'], ['🥨', 'Bakeri/pretzel'], ['🚗', 'Veldig rask bil'],
      ['🌉', 'Bro'], ['🕳️', 'Tunnel'], ['⛪', 'Kirketårn'], ['🚗', 'Rød bil'],
      ['🌲', 'Skog'], ['🐄', 'Ku'], ['🚌', 'Buss'], ['🚜', 'Traktor'],
      ['⛽', 'Bensinstasjon'], ['🌧️', 'Regn'], ['🚄', 'Tog'], ['🏭', 'Fabrikk'],
    ],
  },
  {
    id: 'alpene',
    title: 'Alpe-bingo (Sveits)',
    flag: '🇨🇭',
    items: [
      ['🏔️', 'Snøtopp'], ['🐄', 'Ku med bjelle'], ['🕳️', 'Veldig lang tunnel'], ['🌉', 'Bro over en dal'],
      ['🏞️', 'Blå fjellsjø'], ['🏡', 'Trehytte (chalet)'], ['🚂', 'Tog i fjellet'], ['🇨🇭', 'Sveitsisk flagg'],
      ['💦', 'Foss ned et fjell'], ['🧀', 'Ost-skilt'], ['🍫', 'Sjokolade-skilt'], ['⛰️', 'Bratt fjellvei'],
      ['🚡', 'Taubane'], ['🐐', 'Geit'], ['🌲', 'Barskog'], ['❄️', 'Snø ved veien'],
      ['🚗', 'Bil med CH-skilt'], ['🚴', 'Syklist i motbakke'], ['🏂', 'Skisted-skilt'], ['🌸', 'Blomstereng'],
      ['🛣️', 'Vignett-skilt'], ['☀️', 'Sol over fjell'], ['🅿️', 'Utsiktsplass'], ['🚌', 'Turbuss'],
    ],
  },
  {
    id: 'italia',
    title: 'Italia-bingo',
    flag: '🇮🇹',
    items: [
      ['🌲', 'Sypress-tre'], ['🍇', 'Vinmark'], ['🇮🇹', 'Italiensk flagg'], ['🛵', 'Vespa-scooter'],
      ['🫒', 'Olivenlund'], ['🍕', 'Pizza-skilt'], ['🌴', 'Palme'], ['🏖️', 'GARDASJØEN!'],
      ['🍨', 'Gelato-sjappe'], ['⛪', 'Gammel kirke'], ['🏛️', 'Gamle ruiner'], ['🍋', 'Sitrontre'],
      ['🚗', 'Bil med I-skilt'], ['🏔️', 'Alpene i sør'], ['🌅', 'Solnedgang'], ['🚤', 'Båt på sjøen'],
      ['🏰', 'Borg på en høyde'], ['🛥️', 'Ferje på Gardasjøen'], ['🚙', 'Liten italiensk bil'], ['🌻', 'Solsikkeåker'],
      ['🍝', 'Restaurant-skilt'], ['🚌', 'Turbuss'], ['🅿️', 'Autogrill (rasteplass)'], ['🐝', 'Bie i blomster'],
    ],
  },
  {
    id: 'kjoretoy',
    title: 'Kjøretøy-bingo',
    flag: '🚙',
    items: [
      ['🏍️', 'Motorsykkel'], ['🚌', 'Buss'], ['🚛', 'Lastebil med henger'], ['🚜', 'Traktor'],
      ['🚓', 'Politibil'], ['🏎️', 'Sportsbil'], ['🚕', 'Taxi'], ['🚑', 'Ambulanse'],
      ['🚐', 'Campingbil'], ['🚗', 'Rød bil'], ['🚙', 'Svart SUV'], ['🛵', 'Scooter'],
      ['🚚', 'Varebil'], ['🚒', 'Brannbil'], ['🚲', 'Syklist'], ['🛻', 'Pickup'],
      ['🔌', 'Elbil som lader'], ['🚗', 'Cabriolet'], ['🚗', 'Veteranbil'], ['🚗', 'Gul bil'],
      ['🚗', 'Bil med tilhenger'], ['🚌', 'Dobbeltdekkerbuss'], ['🚲', 'Bil med sykler på taket'], ['🌍', 'Utenlandsk skilt'],
    ],
  },
  {
    id: 'rasteplass',
    title: 'Rasteplass-bingo',
    flag: '🅿️',
    items: [
      ['⛽', 'Bensinpumpe'], ['🔌', 'Ladestasjon'], ['🚻', 'Toalett-skilt'], ['☕', 'Noen med kaffe'],
      ['🍦', 'Noen spiser is'], ['🐕', 'Hund som luftes'], ['🗺️', 'Info-skilt/kart'], ['🧺', 'Bord å sitte ved'],
      ['🙆', 'Noen strekker på beina'], ['🚗', 'Mange parkerte biler'], ['🚛', 'Lastebil på pause'], ['🌳', 'Tre med skygge'],
      ['🗑️', 'Søppelkasse'], ['🥪', 'Noen spiser matpakke'], ['🚏', 'Buss-stopp'], ['💧', 'Vann-tappested'],
      ['🚐', 'Bobil parkert'], ['🧸', 'Barn som leker'], ['🚲', 'Sykkelstativ'], ['📸', 'Noen tar bilde'],
      ['🏪', 'Liten kiosk'], ['👨‍👩‍👧', 'En annen familie'], ['🅿️', 'Stort P-skilt'], ['🦮', 'Kjæledyr på tur'],
    ],
  },
  {
    id: 'vaer',
    title: 'Vær-bingo',
    flag: '⛅',
    items: [
      ['☀️', 'Strålende sol'], ['🌧️', 'Regn på ruta'], ['☁️', 'Store skyer'], ['🌈', 'Regnbue'],
      ['⚡', 'Lyn eller torden'], ['🌫️', 'Tåke'], ['🟦', 'Blå himmel'], ['🌬️', 'Trær som blåser'],
      ['🌡️', 'Over 25 °C'], ['❄️', 'Snø i fjellet'], ['🌥️', 'Delvis skyet'], ['💨', 'Kraftig vindkast'],
      ['🌆', 'Solnedgang'], ['🌙', 'Måne på himmelen'], ['⭐', 'Første stjerne'], ['🌦️', 'Sol og regn samtidig'],
      ['🥵', 'Veldig varmt i bilen'], ['🧊', 'Under 10 °C'], ['🌤️', 'Sol bak en sky'], ['🌧️', 'Vått på veien'],
      ['🏙️', 'Dis over dalen'], ['🌞', 'Sol i øynene'], ['☔', 'Noen med paraply'], ['🌪️', 'Vind-varsel-skilt'],
    ],
  },
  {
    id: 'by',
    title: 'By-bingo',
    flag: '🏙️',
    items: [
      ['⛪', 'Kirke'], ['🏢', 'Høyt bygg'], ['🗽', 'Statue'], ['⛲', 'Fontene'],
      ['🚊', 'Trikk eller t-bane'], ['☕', 'Uteservering'], ['🛍️', 'Travel handlegate'], ['🏛️', 'Stort torg'],
      ['📷', 'Turist med kamera'], ['🚦', 'Trafikklys'], ['🚕', 'Taxi'], ['🚏', 'Busstopp'],
      ['🚲', 'Bysykkel'], ['🌉', 'Bybro'], ['🏨', 'Hotell-skilt'], ['🏪', 'Kiosk'],
      ['🚧', 'Veiarbeid'], ['🅿️', 'Parkeringshus'], ['🧑‍🤝‍🧑', 'Folkemengde'], ['🐕', 'Hund i byen'],
      ['🕰️', 'Klokketårn'], ['🎡', 'Pariserhjul'], ['🏬', 'Kjøpesenter'], ['🚉', 'Togstasjon'],
    ],
  },
  {
    id: 'natur',
    title: 'Natur-bingo',
    flag: '🌳',
    items: [
      ['🏞️', 'Innsjø'], ['🌳', 'Tett skog'], ['🌼', 'Blomstereng'], ['💦', 'Foss'],
      ['🐦', 'Stor fugl'], ['🐴', 'Hest'], ['🌅', 'Soloppgang/solnedgang'], ['🌙', 'Måne på dagtid'],
      ['⭐', 'Stjerner om kvelden'], ['🦌', 'Rådyr eller hjort'], ['🐄', 'Ku på beite'], ['🐑', 'Sau i flokk'],
      ['🌲', 'Granskog'], ['🍄', 'Sopp ved veien'], ['🦋', 'Sommerfugl'], ['🐝', 'Bie'],
      ['🏔️', 'Fjelltopp'], ['🌊', 'Elv med stryk'], ['🪨', 'Stor fjellvegg'], ['🌾', 'Åker'],
      ['🐇', 'Hare eller kanin'], ['🌸', 'Blomstrende tre'], ['🦆', 'Ender i vann'], ['🌻', 'Solsikker'],
    ],
  },
]
