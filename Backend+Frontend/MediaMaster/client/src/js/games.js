import * as images from './images'

const Ubisoft = [
  { title: "Assassin's Creed I", src: images.AC1 },
  { title: "Assassin's Creed II", src: images.AC2 },
  { title: "Assassin's Creed II: Brotherhood", src: images.ACBrotherhood },
  { title: "Assassin's Creed II: Revelations", src: images.ACRevelations },
  { title: "Assassin's Creed III", src: images.AC3 },
  { title: "Assassin's Creed III: Liberation", src: images.ACLiberation },
  { title: "Assassin's Creed IV: Black Flag", src: images.ACIVBlackFlag },
  { title: "Assassin's Creed IV: Freedom Cry", src: images.ACFreedomCry },
  { title: "Assassin's Creed: Rogue", src: images.ACRogue },
  { title: "Assassin's Creed: Unity", src: images.ACUnity },
  { title: "Assassin's Creed: Syndicate", src: images.ACSyndicate },
  { title: "Assassin's Creed: Origins", src: images.ACOrigins },
  { title: "Assassin's Creed: Odyssey", src: images.ACOdyssey },
  { title: "Assassin's Creed: Valhalla", src: images.ACValhalla },
  { title: "Assassin's Creed: Mirage", src: images.ACMirage },
  { title: "Far Cry", src: images.FC1 },
  { title: "Far Cry 2", src: images.FC2 },
  { title: "Far Cry 3", src: images.FC3 },
  { title: "Far Cry Blood Dragon", src: images.FCBD },
  { title: "Far Cry 4", src: images.FC4 },
  { title: "Far Cry Primal", src: images.FCP },
  { title: "Far Cry 5", src: images.FC5 },
  { title: "Far Cry New Dawn", src: images.FCND },
  { title: "Far Cry 6", src: images.FC6 },
];

const Sony = [
  {title: "God of War I", src: images.GOW1},
  {title: "God of War: Ghost of Sparta", src: images.GOWGOP},
  {title: "God of War II", src: images.GOW2},
  {title: "God of War: Chains Of Olympus", src: images.GOWCO},
  {title: "God of War III", src: images.GOW3},
  {title: "God of War: Ascension", src: images.GOWA},
  {title: "God of War IV", src: images.GOW4},
  {title: "God of War Ragnarok", src: images.GOWR},
  {title: "Astro Playroom", src: images.AST},
  {title: "Astro Bot", src: images.ASTB},
  {title: "Horizon Zero Dawn", src: images.HZW},
  {title: "Horizon Forbidden West", src: images.HFW},
  {title: "Ghost Of Tsushima", src: images.GOT},
  {title: "Infamos Second Son", src: images.ISS},
]


const games = [
  { title: "Ubisoft", src: images.Ubi, items: Ubisoft },
  { title: "Sony", src: images.PS, items: Sony },
];

export default games;
