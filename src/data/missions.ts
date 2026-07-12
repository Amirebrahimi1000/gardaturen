export interface Mission {
  id: string
  icon: string
  title: string
  desc: string
}

// Oppdrag: kreative og observerende oppgaver man haker av når de er gjort.
export const MISSIONS: Mission[] = [
  { id: 'm-lastebil', icon: '🚛', title: 'Lastebil-telling', desc: 'Tell 20 lastebiler før neste pause.' },
  { id: 'm-5land', icon: '🚗', title: 'Bil-detektiv', desc: 'Finn biler med skilt fra 5 forskjellige land.' },
  { id: 'm-tysk', icon: '🔢', title: 'Tell på tysk', desc: 'Lær å telle til 5 på tysk: eins, zwei, drei, vier, fünf.' },
  { id: 'm-dikt', icon: '📝', title: 'Fjelldikt', desc: 'Lag et lite dikt om fjellet eller sjøen du ser.' },
  { id: 'm-abc', icon: '🔤', title: 'Skilt-alfabet', desc: 'Finn et stedsnavn på skilt som begynner på A, så B, så C … hvor langt kommer du?' },
  { id: 'm-utsikt', icon: '📸', title: 'Beste utsikt', desc: 'Bestem hva som er dagens fineste utsikt, og fortell hvorfor.' },
  { id: 'm-farge', icon: '🚙', title: 'Fargejakt', desc: 'Vær først til å se en gul, en rød OG en grønn bil.' },
  { id: 'm-stille', icon: '🤫', title: 'Stille-utfordringen', desc: 'Klar å være helt stille i 3 minutter? (Mamma og pappa elsker denne!)' },
  { id: 'm-sang', icon: '🎵', title: 'Bilsang', desc: 'Syng en sang høyt sammen i bilen.' },
  { id: 'm-italiensk', icon: '🍕', title: 'Bestill på italiensk', desc: 'Øv på å si «una pizza, per favore» (en pizza, takk).' },
  { id: 'm-flagg', icon: '🚩', title: 'Flaggsamler', desc: 'Se flagget til hvert land dere kjører gjennom.' },
  { id: 'm-dyr', icon: '🐄', title: 'Dyrejakt', desc: 'Se en sau, en ku og en hest på samme dag.' },
  { id: 'm-bru', icon: '🌉', title: 'Broteller', desc: 'Tell hvor mange broer dere kjører over på én dag.' },
  { id: 'm-kart', icon: '🗺️', title: 'Kartleser', desc: 'Følg med på kartet og si ifra når dere krysser en landegrense.' },
  { id: 'm-gardasjo', icon: '🏖️', title: 'Endelig framme!', desc: 'Dypp føttene i Gardasjøen når dere kommer fram.' },
  { id: 'm-tunnel', icon: '🕳️', title: 'Tunnel-teller', desc: 'Tell hvor mange tunneler dere kjører gjennom på én dag.' },
  { id: 'm-fransk', icon: '🥖', title: 'Snakk fransk', desc: 'Lær tre ord: bonjour (hei), merci (takk), au revoir (ha det).' },
  { id: 'm-italiensk2', icon: '🔢', title: 'Tell på italiensk', desc: 'Tell til fem: uno, due, tre, quattro, cinque.' },
  { id: 'm-hovedstad', icon: '🏛️', title: 'Hovedstad-mester', desc: 'Kan du navnet på hovedstaden i hvert land dere kjører gjennom?' },
  { id: 'm-gjettland', icon: '🗺️', title: 'Hvor er vi?', desc: 'Gjett hvilket land dere er i uten å se på skilt – sjekk etterpå.' },
  { id: 'm-vaer', icon: '⛅', title: 'Værmelder', desc: 'Spå været om én time. Fikk du rett?' },
  { id: 'm-navn', icon: '🔤', title: 'Rart stedsnavn', desc: 'Finn et stedsnavn som er morsomt eller vanskelig å uttale.' },
  { id: 'm-rekord', icon: '📏', title: 'Dagens rekorder', desc: 'Se den lengste lastebilen, det høyeste fjellet og den største broen i dag.' },
  { id: 'm-quiz', icon: '❓', title: 'Lag et spørsmål', desc: 'Lag ditt eget quizspørsmål og spør de andre i bilen.' },
  { id: 'm-sang2', icon: '🎧', title: 'Én hel sang', desc: 'Hør en hel sang uten å si et eneste ord.' },
  { id: 'm-tegn', icon: '✏️', title: 'Tegn det du så', desc: 'Tegn det fineste du har sett i dag når dere stopper.' },
  { id: 'm-euro', icon: '💶', title: 'Euro-detektiv', desc: 'Finn ut hvilke av landene på turen som bruker euro.' },
]
