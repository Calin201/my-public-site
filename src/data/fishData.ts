export type FishSpeciesId = 'koi' | 'betta' | 'clown';
export type WaterLightingId = 'day' | 'sunset' | 'deep';

export interface FishSpecies {
  id: FishSpeciesId;
  name: string;
  scientific: string;
  origin: string;
  tagline: string;
  description: string;
  bodyBase: string;
  bodyHighlight: string;
  bellyTone: string;
  finColor: string;
  finAccent: string;
  patternColor: string;
  stripeOutline: string;
  tailType: 'forked' | 'veil' | 'fan';
  facts: string[];
}

export const FISH_SPECIES: FishSpecies[] = [
  {
    id: 'koi',
    name: 'Koi Kohaku',
    scientific: 'Cyprinus rubrofuscus',
    origin: 'Japonia • Iazuri ornamentale',
    tagline: 'Alb perlat cu pete corai — simbol al energiei și perseverenței',
    description:
      'Koi Kohaku este cea mai emblematică varietate de crap ornamental japonez. Înoată calm, recunoaște persoana care îl hrănește și poate trăi zeci de ani.',
    bodyBase: '#FFFDF8',
    bodyHighlight: '#FFF4E6',
    bellyTone: '#F1E7D8',
    finColor: '#FFE8D1',
    finAccent: '#EA580C',
    patternColor: '#EA580C',
    stripeOutline: '#C2410C',
    tailType: 'forked',
    facts: [
      'Recunoaște fețele și pașii celor care îi aduc mâncare.',
      'Înoată grațios prin contracții ondulatorii ale întregului corp.',
      'Un Koi sănătos poate trăi între 25 și 50 de ani.',
    ],
  },
  {
    id: 'betta',
    name: 'Betta Regal',
    scientific: 'Betta splendens',
    origin: 'Asia de Sud-Est • Ape calme',
    tagline: 'Voaluri lungi safir & turcoaz care dansează în curenții blânzi',
    description:
      'Cunoscut ca peștele luptător siamez, Betta impresionează prin înotătoarele sale ample ca o pânză de mătase și reflexiile irizate în lumină.',
    bodyBase: '#1D4ED8',
    bodyHighlight: '#38BDF8',
    bellyTone: '#1E3A8A',
    finColor: '#22D3EE',
    finAccent: '#0284C7',
    patternColor: '#0EA5E9',
    stripeOutline: '#1E40AF',
    tailType: 'veil',
    facts: [
      'Are un organ special numit labirint, cu care poate respira și aer de la suprafață.',
      'Înotătoarele sale acționează ca niște evantaie fluide la fiecare întoarcere.',
      'Își poate schimba ușor nuanța în funcție de lumină și stare.',
    ],
  },
  {
    id: 'clown',
    name: 'Pește Clovn',
    scientific: 'Amphiprion ocellaris',
    origin: 'Recife de corali • Indo-Pacific',
    tagline: 'Portocaliu vibrant cu benzi albe conturate fin — expert al recifului',
    description:
      'Trăiește în simbioză cu anemonele de mare, protejat de un strat natural de mucus. Se strecoară agil printre corali cu mișcări scurte și jucăușe.',
    bodyBase: '#F97316',
    bodyHighlight: '#FDBA74',
    bellyTone: '#EA580C',
    finColor: '#FB923C',
    finAccent: '#13222B',
    patternColor: '#FFFFFF',
    stripeOutline: '#13222B',
    tailType: 'fan',
    facts: [
      'Toți peștii clovn se nasc cu un strat protector care îi apără de înțepăturile anemonei.',
      'Comunică prin mici pocnete și vibrații acustice rapide.',
      'Înotătoarele rotunjite îl ajută să manevreze precis în spații înguste.',
    ],
  },
];

export interface AnatomyHotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  title: string;
  role: string;
  explanation: string;
  funFact: string;
}

export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'caudal',
    xPercent: 18,
    yPercent: 52,
    title: 'Înotătoarea caudală (Coada)',
    role: 'Propulsie și viteză',
    explanation:
      'Motorul principal al peștelui: împinge apa alternativ stânga-dreapta și generează forța necesară pentru sprint sau înot lin.',
    funFact: 'Când apeși butonul „Turbo!”, frecvența bătăilor de coadă aproape se triplează.',
  },
  {
    id: 'dorsal',
    xPercent: 53,
    yPercent: 25,
    title: 'Înotătoarea dorsală',
    role: 'Stabilitate laterală',
    explanation:
      'Funcționează ca o chilă de velier — împiedică răsturnarea și menține corpul drept atunci când peștele virează brusc.',
    funFact: 'La Betta Regal, înotătoarea dorsală devine un voal spectaculos folosit la semnalizare.',
  },
  {
    id: 'lateral',
    xPercent: 42,
    yPercent: 48,
    title: 'Linia laterală',
    role: 'Radar de vibrații',
    explanation:
      'Un șir de receptori senzoriali de-a lungul flancului care detectează undele din apă, obstacolele și chiar firimiturile căzute.',
    funFact: 'Datorită ei, peștele simte undele din acvariu înainte să vadă obiectul cu ochii.',
  },
  {
    id: 'swim-bladder',
    xPercent: 58,
    yPercent: 60,
    title: 'Vezica înotătoare',
    role: 'Flotabilitate neutră',
    explanation:
      'Un sac intern cu gaz care ajustează densitatea corpului astfel încât peștele să poată pluti nemișcat la orice adâncime fără efort.',
    funFact: 'Fără vezica înotătoare, peștele ar trebui să dea continuu din coadă ca să nu se scufunde.',
  },
  {
    id: 'gills',
    xPercent: 72,
    yPercent: 53,
    title: 'Operculul și branhiile',
    role: 'Respirație subacvatică',
    explanation:
      'Peștele înghite apă prin gură și o împinge prin lamelele branhiale bogat vascularizate, extrăgând oxigenul dizolvat.',
    funFact: 'Pulsul ritmic al operculului pe care îl vezi în SVG imită exact ciclul real de respirație.',
  },
];

export interface WaterLighting {
  id: WaterLightingId;
  label: string;
  gradientTop: string;
  gradientMid: string;
  gradientBottom: string;
  beamColor: string;
  seabedFill: string;
  kelpFront: string;
  kelpBack: string;
}

export const WATER_LIGHTING: Record<WaterLightingId, WaterLighting> = {
  day: {
    id: 'day',
    label: 'Zi de recif',
    gradientTop: '#CCFBF1',
    gradientMid: '#38BDF8',
    gradientBottom: '#0369A1',
    beamColor: 'rgba(255, 255, 255, 0.36)',
    seabedFill: '#E7D8BE',
    kelpFront: '#0F766E',
    kelpBack: '#115E59',
  },
  sunset: {
    id: 'sunset',
    label: 'Apus tropical',
    gradientTop: '#FED7AA',
    gradientMid: '#FB7185',
    gradientBottom: '#1E3A8A',
    beamColor: 'rgba(255, 237, 213, 0.34)',
    seabedFill: '#D6B99B',
    kelpFront: '#7C2D12',
    kelpBack: '#431407',
  },
  deep: {
    id: 'deep',
    label: 'Adâncime nocturnă',
    gradientTop: '#164E63',
    gradientMid: '#0F172A',
    gradientBottom: '#020617',
    beamColor: 'rgba(56, 189, 248, 0.16)',
    seabedFill: '#1E293B',
    kelpFront: '#0E7490',
    kelpBack: '#155E75',
  },
};

export interface FishMetric {
  label: string;
  value: number;
  suffix: string;
  detail: string;
}

export const FISH_METRICS: FishMetric[] = [
  { label: 'Câmp vizual', value: 300, suffix: '°', detail: 'Vede aproape panoramic în jurul său' },
  { label: 'Bătăi de coadă', value: 8, suffix: '/sec', detail: 'În regim de sprint rapid' },
  { label: 'Oxigen extras', value: 80, suffix: '%', detail: 'Randament al branhiilor în apă curată' },
  { label: 'Longevitate', value: 30, suffix: ' ani', detail: 'Pentru un Koi îngrijit într-un iaz bun' },
];
