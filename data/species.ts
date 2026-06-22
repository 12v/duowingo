export interface SpeciesSeed {
  slug: string;
  commonName: string;
  scientificName: string;
  /** Override if Xeno-canto's `en` field differs from commonName */
  xcSearchName?: string;
  tier: "easy" | "medium" | "hard";
  aliases: string[];
}

export const SPECIES_SEED: SpeciesSeed[] = [
  // --- Easy: Garden Birds ---
  { slug: "european-robin", commonName: "European Robin", scientificName: "Erithacus rubecula", tier: "easy", aliases: ["Robin"] },
  { slug: "house-sparrow", commonName: "House Sparrow", scientificName: "Passer domesticus", tier: "easy", aliases: ["Sparrow"] },
  { slug: "eurasian-blue-tit", commonName: "Eurasian Blue Tit", scientificName: "Cyanistes caeruleus", tier: "easy", aliases: ["Blue Tit"] },
  { slug: "great-tit", commonName: "Great Tit", scientificName: "Parus major", tier: "easy", aliases: [] },
  { slug: "eurasian-blackbird", commonName: "Eurasian Blackbird", scientificName: "Turdus merula", tier: "easy", aliases: ["Blackbird"] },
  { slug: "eurasian-wren", commonName: "Eurasian Wren", scientificName: "Troglodytes troglodytes", tier: "easy", aliases: ["Wren"] },
  { slug: "common-chaffinch", commonName: "Common Chaffinch", scientificName: "Fringilla coelebs", tier: "easy", aliases: ["Chaffinch"] },
  { slug: "european-goldfinch", commonName: "European Goldfinch", scientificName: "Carduelis carduelis", tier: "easy", aliases: ["Goldfinch"] },
  { slug: "european-starling", commonName: "European Starling", scientificName: "Sturnus vulgaris", tier: "easy", aliases: ["Starling"] },
  { slug: "common-wood-pigeon", commonName: "Common Wood Pigeon", scientificName: "Columba palumbus", tier: "easy", aliases: ["Wood Pigeon"] },
  { slug: "eurasian-collared-dove", commonName: "Eurasian Collared Dove", scientificName: "Streptopelia decaocto", tier: "easy", aliases: ["Collared Dove"] },
  { slug: "eurasian-magpie", commonName: "Eurasian Magpie", scientificName: "Pica pica", tier: "easy", aliases: ["Magpie"] },
  { slug: "carrion-crow", commonName: "Carrion Crow", scientificName: "Corvus corone", tier: "easy", aliases: ["Crow"] },
  { slug: "dunnock", commonName: "Dunnock", scientificName: "Prunella modularis", tier: "easy", aliases: [] },
  { slug: "european-greenfinch", commonName: "European Greenfinch", scientificName: "Chloris chloris", tier: "easy", aliases: ["Greenfinch"] },
  { slug: "long-tailed-tit", commonName: "Long-tailed Tit", scientificName: "Aegithalos caudatus", tier: "easy", aliases: [] },
  { slug: "great-spotted-woodpecker", commonName: "Great Spotted Woodpecker", scientificName: "Dendrocopos major", tier: "easy", aliases: [] },

  // --- Medium: Woodland, Farmland & Water Birds ---
  { slug: "common-cuckoo", commonName: "Common Cuckoo", scientificName: "Cuculus canorus", tier: "medium", aliases: ["Cuckoo"] },
  { slug: "eurasian-jay", commonName: "Eurasian Jay", scientificName: "Garrulus glandarius", tier: "medium", aliases: ["Jay"] },
  { slug: "common-chiffchaff", commonName: "Common Chiffchaff", scientificName: "Phylloscopus collybita", tier: "medium", aliases: ["Chiffchaff"] },
  { slug: "willow-warbler", commonName: "Willow Warbler", scientificName: "Phylloscopus trochilus", tier: "medium", aliases: [] },
  { slug: "song-thrush", commonName: "Song Thrush", scientificName: "Turdus philomelos", tier: "medium", aliases: [] },
  { slug: "mistle-thrush", commonName: "Mistle Thrush", scientificName: "Turdus viscivorus", tier: "medium", aliases: [] },
  { slug: "eurasian-skylark", commonName: "Eurasian Skylark", scientificName: "Alauda arvensis", tier: "medium", aliases: ["Skylark"] },
  { slug: "yellowhammer", commonName: "Yellowhammer", scientificName: "Emberiza citrinella", tier: "medium", aliases: [] },
  { slug: "common-reed-bunting", commonName: "Common Reed Bunting", scientificName: "Emberiza schoeniclus", tier: "medium", aliases: ["Reed Bunting"] },
  { slug: "sedge-warbler", commonName: "Sedge Warbler", scientificName: "Acrocephalus schoenobaenus", tier: "medium", aliases: [] },
  { slug: "common-moorhen", commonName: "Common Moorhen", scientificName: "Gallinula chloropus", tier: "medium", aliases: ["Moorhen"] },
  { slug: "eurasian-coot", commonName: "Eurasian Coot", scientificName: "Fulica atra", tier: "medium", aliases: ["Coot"] },
  { slug: "mallard", commonName: "Mallard", scientificName: "Anas platyrhynchos", tier: "medium", aliases: [] },
  { slug: "grey-heron", commonName: "Grey Heron", scientificName: "Ardea cinerea", tier: "medium", aliases: [] },
  { slug: "common-kingfisher", commonName: "Common Kingfisher", scientificName: "Alcedo atthis", tier: "medium", aliases: ["Kingfisher"] },
  { slug: "eurasian-nuthatch", commonName: "Eurasian Nuthatch", scientificName: "Sitta europaea", tier: "medium", aliases: ["Nuthatch"] },
  { slug: "eurasian-treecreeper", commonName: "Eurasian Treecreeper", scientificName: "Certhia familiaris", tier: "medium", aliases: ["Treecreeper"] },
  { slug: "lesser-whitethroat", commonName: "Lesser Whitethroat", scientificName: "Curruca curruca", tier: "medium", aliases: [] },
  { slug: "eurasian-blackcap", commonName: "Eurasian Blackcap", scientificName: "Sylvia atricapilla", tier: "medium", aliases: ["Blackcap"] },

  // --- Hard: Birds of Prey, Seabirds & Scarcer Species ---
  { slug: "common-buzzard", commonName: "Common Buzzard", scientificName: "Buteo buteo", tier: "hard", aliases: ["Buzzard"] },
  { slug: "eurasian-sparrowhawk", commonName: "Eurasian Sparrowhawk", scientificName: "Accipiter nisus", tier: "hard", aliases: ["Sparrowhawk"] },
  { slug: "barn-owl", commonName: "Barn Owl", scientificName: "Tyto alba", tier: "hard", aliases: [] },
  { slug: "tawny-owl", commonName: "Tawny Owl", scientificName: "Strix aluco", tier: "hard", aliases: [] },
  { slug: "common-kestrel", commonName: "Common Kestrel", scientificName: "Falco tinnunculus", tier: "hard", aliases: ["Kestrel"] },
  { slug: "atlantic-puffin", commonName: "Atlantic Puffin", scientificName: "Fratercula arctica", tier: "hard", aliases: ["Puffin"] },
  { slug: "northern-gannet", commonName: "Northern Gannet", scientificName: "Morus bassanus", tier: "hard", aliases: ["Gannet"] },
  { slug: "black-legged-kittiwake", commonName: "Black-legged Kittiwake", scientificName: "Rissa tridactyla", tier: "hard", aliases: ["Kittiwake"] },
  { slug: "european-herring-gull", commonName: "European Herring Gull", scientificName: "Larus argentatus", tier: "hard", aliases: ["Herring Gull"] },
  { slug: "eurasian-curlew", commonName: "Eurasian Curlew", scientificName: "Numenius arquata", tier: "hard", aliases: ["Curlew"] },
  { slug: "common-redshank", commonName: "Common Redshank", scientificName: "Tringa totanus", tier: "hard", aliases: ["Redshank"] },
  { slug: "eurasian-oystercatcher", commonName: "Eurasian Oystercatcher", scientificName: "Haematopus ostralegus", tier: "hard", aliases: ["Oystercatcher"] },
  { slug: "european-nightjar", commonName: "European Nightjar", scientificName: "Caprimulgus europaeus", tier: "hard", aliases: ["Nightjar"] },
  { slug: "corn-crake", commonName: "Corn Crake", scientificName: "Crex crex", tier: "hard", aliases: [] },
  { slug: "common-snipe", commonName: "Common Snipe", scientificName: "Gallinago gallinago", tier: "hard", aliases: ["Snipe"] },
];
