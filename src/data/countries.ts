export interface Country {
  id: string
  name: string
  flag: string
  order: number // order along the route from Skien to Gardasjøen
  capital: string
  language: string
  hello: string // how to say hi in the local language
  helloTip: string // pronunciation for a 10-year-old
  currency: string
  facts: string[]
  eat: string // a local food to try
}

// The route: Skien → ferge → Danmark → Tyskland → Sveits → (Østerrike/
// Liechtenstein streifes) → Italia → Gardasjøen.
export const COUNTRIES: Country[] = [
  {
    id: 'no',
    name: 'Norge',
    flag: '🇳🇴',
    order: 0,
    capital: 'Oslo',
    language: 'Norsk',
    hello: 'Hei!',
    helloTip: 'Det kan du jo fra før 😄',
    currency: 'Norske kroner (kr)',
    eat: 'Brunost på matpakka',
    facts: [
      'Norge har over 1000 fjorder – vann som strekker seg langt inn i landet.',
      'Turen deres starter i Skien, hjembyen til dikteren Henrik Ibsen.',
      'Norge har verdens lengste veitunnel: Lærdalstunnelen er 24,5 km!',
      'Elg kalles «skogens konge» og kan bli like høy som en bil er lang.',
    ],
  },
  {
    id: 'dk',
    name: 'Danmark',
    flag: '🇩🇰',
    order: 1,
    capital: 'København',
    language: 'Dansk',
    hello: 'Hej!',
    helloTip: 'Uttales «hai», nesten som på engelsk',
    currency: 'Danske kroner (kr)',
    eat: 'Wienerbrød eller en hotdog',
    facts: [
      'Danmark er nesten helt flatt – det høyeste «fjellet» er bare 171 meter!',
      'Danmark har over 400 øyer, og mange er bundet sammen med lange broer.',
      'Legoklossen ble funnet opp i Danmark i 1958.',
      'Det danske flagget, Dannebrog, er et av verdens eldste flagg.',
    ],
  },
  {
    id: 'de',
    name: 'Tyskland',
    flag: '🇩🇪',
    order: 2,
    capital: 'Berlin',
    language: 'Tysk',
    hello: 'Hallo!',
    helloTip: 'Uttales «hallo», med trykk på siste del',
    currency: 'Euro (€)',
    eat: 'Bratwurst (grillpølse) med brød',
    facts: [
      'På tyske motorveier (Autobahn) er det noen steder INGEN fartsgrense.',
      'Tyskland lager kjente biler: BMW, Mercedes, Volkswagen, Porsche og Audi.',
      'Eventyrene om Askepott, Rødhette og Snøhvit ble skrevet ned i Tyskland av brødrene Grimm.',
      'Tyskland grenser til hele 9 land – flere enn nesten alle andre land i Europa.',
    ],
  },
  {
    id: 'ch',
    name: 'Sveits',
    flag: '🇨🇭',
    order: 3,
    capital: 'Bern',
    language: 'Tysk, fransk og italiensk',
    hello: 'Grüezi!',
    helloTip: 'Uttales «grytsi» – slik hilser man i tysktalende Sveits',
    currency: 'Sveitserfranc (CHF)',
    eat: 'Sveitsisk sjokolade 🍫',
    facts: [
      'Sveits er kjent for Alpene, sjokolade, ost og lommekniver.',
      'Gotthard-tunnelen gjennom fjellet er en av verdens lengste – over 57 km med tog!',
      'Kyr i Sveits går ofte med store bjeller rundt halsen som klinger i fjellet.',
      'Sveits har fire offisielle språk. Folk bytter språk fra dal til dal.',
    ],
  },
  {
    id: 'it',
    name: 'Italia',
    flag: '🇮🇹',
    order: 4,
    capital: 'Roma',
    language: 'Italiensk',
    hello: 'Ciao!',
    helloTip: 'Uttales «tsjao» – betyr både hei og ha det',
    currency: 'Euro (€)',
    eat: 'Ekte italiensk pizza eller gelato (is)',
    facts: [
      'Pizza og spaghetti kommer fra Italia – og gelato (italiensk is) også!',
      'Landet er formet som en støvel som sparker en ball (øya Sicilia).',
      'Gardasjøen er Italias STØRSTE innsjø – nesten som et hav med fjell rundt.',
      'I Italia finnes tårnet i Pisa, som heller til siden uten å falle.',
    ],
  },
]

export const byOrder = [...COUNTRIES].sort((a, b) => a.order - b.order)
