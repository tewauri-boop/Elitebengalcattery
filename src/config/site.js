// src/config/site.js
// SINGLE SOURCE OF TRUTH for Elite Bengal Cattery
// WebForge v9.1 Architecture

export const SITE = {
  name: 'Elite Bengal Cattery',
  tagline: 'Ethically Bred Purebred Bengal Kittens with Exceptional Rosettes and Wild Elegance',
  domain: 'DOMAIN.com',           // Rule 2: Single source of truth. DOMAIN.com while pending.
  locale: 'en-US',                // BCP-47
  currency: 'USD',
  target: 'vercel',               // 'vercel' | 'static'
  primaryColor: '#8B5A2B',        // Bengal Auburn Bronze
  accentColor: '#D4AF37',         // Warm Glitter Gold
  darkBg: '#121214',
  lightBg: '#FAF7F2',
  gscVerification: 'pending',
  indexNowKey: 'bengal-ebc882194',
  cartKey: 'mm-cart',             // localStorage key for cart
  logo: '/images/logo.webp',
  tiktok: 'https://www.tiktok.com/@elitebengalcatter',
  tiktokHandle: '@elitebengalcatter',
};

export const CONTACT = {
  email: 'elitebengalcattery28@gmail.com',
  // Entity encoded for bot protection in HTML and JSON-LD
  emailEncoded: 'elitebengalcattery28&#64;gmail.com',
  phone: '+1 720 310 0222',
  whatsapp: '+1 720 310 0222',
  whatsappRaw: '17203100222',
  address: 'North Carolina, United States',
  hq: 'Raleigh & Charlotte Metro Area, North Carolina, USA',
  country: 'United States',
  state: 'North Carolina',
};

export const SHOP = {
  minOrder: 0,
  freeShippingThreshold: 0,       // Free nationwide pet courier hand delivery
  shippingFee: 0,                 // 100% Free VIP Pet Nanny Delivery
  cryptoDiscount: 10,             // 10% instant discount on BTC, USDT, ETH
  paymentMethods: [
    'Zelle',
    'Cash App',
    'PayPal',
    'Chime',
    'crypto-BTC',
    'crypto-USDT',
    'Bank Wire Transfer',
    'Certified Gift Cards'
  ],
};

export const FORMS = {
  provider: 'web3forms',          // 'web3forms' (default) | 'resend'
  web3formsKey: 'pending',        // When pending, falls back gracefully to thank-you redirect
  resendFrom: '',
  turnstileSiteKey: '',
};

export const CHAT = {
  channels: [
    { type: 'whatsapp', label: 'WhatsApp Concierge', value: '+1 720 310 0222', url: 'https://wa.me/17203100222' },
    { type: 'email', label: 'Direct Email', value: 'elitebengalcattery28@gmail.com', url: 'mailto:elitebengalcattery28@gmail.com' },
    { type: 'tiktok', label: 'TikTok', value: '@elitebengalcatter', url: 'https://www.tiktok.com/@elitebengalcatter' },
  ],
};

export const BRAND = {
  foundingYear: '2019',
  foundingLocation: 'North Carolina, USA',
  description: 'Elite Bengal Cattery is an elite, TICA-registered hobby cattery in North Carolina specializing in championship bloodline Bengal kittens with wild rosettes, sweet temperament, and certified genetic health.',
  milestones: [
    { year: '2019', event: 'Elite Bengal Cattery founded in North Carolina with foundational European champion Bengal bloodlines.' },
    { year: '2021', event: 'Achieved 100% DNA health-certified parentage program (PK-Def, PRA-b, and annual HCM cardiologist screenings).' },
    { year: '2023', event: 'Introduced Glacier Snow Bengal lines (Seal Lynx Point & Seal Mink) featuring vivid blue ocular pigmentation.' },
    { year: '2025', event: 'Expanded white-glove in-cabin flight nanny courier service across all 50 states.' },
  ],
  differentiation: [
    '100% TICA Registered Purebred Lineage with complete pedigree documentation and genetic parentage guarantee.',
    'Comprehensive DNA Genetic Clearance: 100% negative for PK-Def, PRA-b, and negative annual echocardiogram screenings for HCM.',
    'Early Neurological Stimulation (ENS) and cage-free in-home nursery upbringing around children and gentle family pets.',
    'Complimentary White-Glove Pet Courier Delivery across the continental United States with continuous live travel updates.',
  ],
  sameAs: [
    'https://www.tiktok.com/@elitebengalcatter',
  ],
  awards: [
    'TICA Registered Ethical Cattery of Excellence Standards',
  ],
};

export const CATEGORIES = [
  {
    slug: 'brown-rosetted',
    name: 'Brown Rosetted Bengals',
    shortName: 'Brown Rosetted',
    tagline: 'Warm golden undercoats with striking two-tone jaguar-like doughnut rosettes.',
    description: 'Our traditional brown rosetted Bengal kittens embody the majesty of wild Asian Leopard Cats with high-contrast rosettes, warm amber undertones, and glittered silk pelts.',
    image: '/images/brown-rosetted-bengals-coat.jpg',
    subcategories: ['traditional-warm-brown', 'caramel-clouded'],
  },
  {
    slug: 'snow-bengals',
    name: 'Snow Bengal Kittens',
    shortName: 'Snow Bengals',
    tagline: 'Breathtaking ivory coats, glacier-blue eyes, and delicate cocoa leopard rosettes.',
    description: 'Snow Bengals showcase rare genetics including Seal Lynx Point, Seal Mink, and Seal Sepia with iridescent blue ocular depth and contrast-rich markings.',
    image: '/images/snow-bengals-coat.jpg',
    subcategories: ['seal-lynx-point', 'seal-mink'],
  },
  {
    slug: 'silver-charcoal',
    name: 'Silver & Charcoal Bengals',
    shortName: 'Silver & Charcoal',
    tagline: 'Gleaming pewter coats with pitch-black markings and exotic midnight masks.',
    description: 'Bred for shimmering metallic sheen, our Silver and Charcoal Bengal kittens carry dramatic jet-black rosetting over cool diamond coats with zero tarnish.',
    image: '/images/silver-charcoal-bengals-coat.jpg',
    subcategories: ['pure-silver', 'charcoal-twilight'],
  },
  {
    slug: 'breeding-rights',
    name: 'Breeding & Show Rights',
    shortName: 'Breeding Prospects',
    tagline: 'Exceptional structural conformation, strong chin, wild profile, and fertile champion pedigrees.',
    description: 'Select Bengal kittens offered with full TICA breeding rights and registration to approved ethical catteries seeking outstanding genetics and distinct wild expression.',
    image: '/images/breeding-show-rights.jpg',
    subcategories: ['queen-prospects', 'stud-prospects'],
  },
];

export const PRODUCTS = [
  {
    slug: 'astra-warm-gold-rosetted-female',
    name: 'Astra — Warm Gold Rosetted Female',
    price: 2200,
    category: 'brown-rosetted',
    subcategory: 'traditional-warm-brown',
    shortDescription: 'Exquisite two-tone doughnut rosettes on a glowing apricot base with playful, affectionate temperament.',
    description: 'Astra is a breathtaking female Bengal kitten possessing massive, open two-tone rosettes surrounded by deep jet-black halos. Her coat carries heavy gold glitter that glistens under natural sunlight. Exceptionally cuddly, well-socialized with children, and litter trained. See more daily photos and updates on TikTok @elitebengalcatter. Ready for her forever family with complete veterinary wellness certificates.',
    badge: 'Popular',
    featured: true,
    gender: 'Female',
    dob: '10 Weeks Old',
    colorPattern: 'Brown Rosetted (Warm Amber)',
    eyes: 'Deep Emerald Green',
    healthStatus: 'PK-Def Normal, PRA-b Normal, Vaccinated, Microchipped',
    images: [
      '/images/astra-brown-rosetted-1.jpg',
      '/images/astra-brown-rosetted-2.jpg',
      '/images/astra-brown-rosetted-3.jpg',
    ],
  },
  {
    slug: 'titan-giant-doughnut-rosetted-male',
    name: 'Titan — Giant Doughnut Rosetted Male',
    price: 2950,
    category: 'brown-rosetted',
    subcategory: 'traditional-warm-brown',
    shortDescription: 'Magnificent wild posture, thick muscular build, and large symmetrical jaguar rosetting.',
    description: 'Titan is a showstopper male Bengal kitten showcasing a wild leopard-like head profile, puffed nose leather, and distinct doughnut rosettes distributed evenly across his athletic frame. He loves interactive feather toys, water fountains, and following his humans around the house. Photos and clips available on TikTok @elitebengalcatter.',
    badge: 'Champion Bloodline',
    featured: true,
    gender: 'Male',
    dob: '11 Weeks Old',
    colorPattern: 'Brown (Black) Spotted Tabby',
    eyes: 'Golden Topaz',
    healthStatus: 'Certified Healthy, Dewormed, Up-to-Date Core Vaccines, TICA Registered',
    images: [
      '/images/titan-brown-doughnut-1.jpg',
      '/images/titan-brown-doughnut-2.jpg',
      '/images/titan-brown-doughnut-3.jpg',
    ],
  },
  {
    slug: 'glacier-seal-lynx-snow-male',
    name: 'Glacier — Seal Lynx Point Snow Male',
    price: 3650,
    category: 'snow-bengals',
    subcategory: 'seal-lynx-point',
    shortDescription: 'Ultra-rare glacier-blue eyes with frost-cream pelt and defined milk-chocolate rosettes.',
    description: 'Glacier is an ethereal Seal Lynx Point Snow Bengal with striking sapphire eyes that captivate instantly. His milk-chocolate rosettes will continue to darken and enrich in contrast over his first 18 months. Extremely gentle, calm, and sweet-natured. Follow his nursery progress on TikTok @elitebengalcatter.',
    badge: 'Rare Blue Eyes',
    featured: true,
    gender: 'Male',
    dob: '9 Weeks Old',
    colorPattern: 'Seal Lynx Point Snow (Glacier Ice)',
    eyes: 'Deep Arctic Glacier Blue',
    healthStatus: 'DNA Clear by Parentage, Microchipped, Complete Vet Records',
    images: [
      '/images/glacier-snow-lynx-1.jpg',
      '/images/glacier-snow-lynx-2.jpg',
      '/images/glacier-snow-lynx-3.jpg',
    ],
  },
  {
    slug: 'ivory-snow-mink-rosetted-female',
    name: 'Ivory — Snow Mink Rosetted Female',
    price: 2600,
    category: 'snow-bengals',
    subcategory: 'seal-mink',
    shortDescription: 'Warm cashmere cream background with rich caramel markings and aqua green-blue eyes.',
    description: 'Ivory is a regal Snow Mink female Bengal with exquisite aqua eyes and soft, plush rosettes. Raised with love in our living room nursery with continuous human touch and early neurological stimulation. View her playing on TikTok @elitebengalcatter.',
    badge: 'Exotic Coat',
    featured: false,
    gender: 'Female',
    dob: '10 Weeks Old',
    colorPattern: 'Seal Mink Rosetted',
    eyes: 'Aqua Blue-Green',
    healthStatus: '100% Healthy, 2-Year Congenital Guarantee, TICA Pedigree',
    images: [
      '/images/ivory-snow-mink-1.jpg',
      '/images/ivory-snow-mink-2.jpg',
      '/images/ivory-snow-mink-3.jpg',
    ],
  },
  {
    slug: 'luna-silver-charcoal-shadow-queen',
    name: 'Luna — Silver Charcoal Shadow Female',
    price: 3350,
    category: 'silver-charcoal',
    subcategory: 'charcoal-twilight',
    shortDescription: 'Rare twilight charcoal mask with inky black cape rosettes and sparkling pure pewter ground.',
    description: 'Luna represents the pinnacle of charcoal Bengal breeding. She features the authentic wild Zorro mask and dark dorsal cape while maintaining distinct silver glitter throughout her body. Vocal, smart, and loves playing fetch. Check out her playful videos on TikTok @elitebengalcatter.',
    badge: 'Exclusive',
    featured: true,
    gender: 'Female',
    dob: '12 Weeks Old',
    colorPattern: 'Silver Charcoal Rosetted',
    eyes: 'Intense Green Gooseberry',
    healthStatus: 'Full Genetic Health Panel Negative, Certified Heart-Screened Lineage',
    images: [
      '/images/luna-silver-charcoal-1.jpg',
      '/images/luna-silver-charcoal-2.jpg',
      '/images/luna-silver-charcoal-3.jpg',
    ],
  },
  {
    slug: 'sterling-metallic-silver-male',
    name: 'Sterling — Shimmering Silver Rosetted Male',
    price: 1850,
    category: 'silver-charcoal',
    subcategory: 'pure-silver',
    shortDescription: 'Zero tarnish, high-clarity diamond silver coat with sharp jet-black open rosettes.',
    description: 'Sterling is a pure silver rosetted male kitten with clear contrast, silky coat texture, and zero yellow tarnish. He possesses great muscular presence and a friendly, confident curiosity. Daily photos and clips posted on TikTok @elitebengalcatter.',
    badge: 'Diamond Silver',
    featured: false,
    gender: 'Male',
    dob: '11 Weeks Old',
    colorPattern: 'Pure Silver Rosetted',
    eyes: 'Chartreuse Gold',
    healthStatus: 'Vet Inspected, First & Second Core Vaccines, Health Contract',
    images: [
      '/images/sterling-silver-rosetted-1.jpg',
      '/images/sterling-silver-rosetted-2.jpg',
      '/images/sterling-silver-rosetted-3.jpg',
    ],
  },
  {
    slug: 'zeus-high-contrast-clouded-leopard-male',
    name: 'Zeus — High-Contrast Clouded Male',
    price: 4000,
    category: 'brown-rosetted',
    subcategory: 'caramel-clouded',
    shortDescription: 'Massive clouded leopard rosetting with intense golden sheen, athletic agility, and viral TikTok charm.',
    description: 'Zeus exhibits wild clouded leopard patterning with warm cinnamon borders and liquid amber centers. Famous for his viral TikTok swagger wearing his gold chain and dollar pendant, Zeus loves water play, stalking feather toys across the grass, and cuddling at the foot of the bed. Discover Zeus on TikTok @elitebengalcatter.',
    badge: 'TikTok Fan Favorite',
    featured: true,
    gender: 'Male',
    dob: '10 Weeks Old',
    colorPattern: 'Brown Rosetted (Caramel Clouded)',
    eyes: 'Golden Hazel',
    healthStatus: 'Negative PK-Def & PRA-b, Dewormed, Clean Bill of Health',
    images: [
      '/images/zeus-clouded-bengal-1.jpg',
      '/images/zeus-clouded-bengal-2.jpg',
      '/images/zeus-clouded-bengal-3.jpg',
    ],
  },
  {
    slug: 'duchess-show-breeding-prospect-queen',
    name: 'Duchess — Show & Breeding Prospect Queen',
    price: 3900,
    category: 'breeding-rights',
    subcategory: 'queen-prospects',
    shortDescription: 'Complete TICA breeding & show rights. Exceptional wild head type, nocturnal contrast, and championship lineage.',
    description: 'Offered exclusively to approved catteries or passionate preservation breeders. Duchess possesses perfect skull conformation, small rounded ears with nocturnal thumbprints, straight nasal profile, and impeccable tri-color doughnut rosettes. Comes with full breeding pedigree rights. Pictured alongside our Snow Bengal nursery companion. See more photos on TikTok @elitebengalcatter.',
    badge: 'Breeding Rights',
    featured: true,
    gender: 'Female',
    dob: '13 Weeks Old',
    colorPattern: 'Brown Spotted Tabby (High Contrast Tri-Color)',
    eyes: 'Golden Hazel',
    healthStatus: 'Full Genetic Health & Color DNA Sequencing Included, Microchipped, Complete TICA Blue Slip',
    images: [
      '/images/duchess-breeding-queen-1.jpg',
      '/images/duchess-breeding-queen-2.jpg',
      '/images/duchess-breeding-queen-3.jpg',
    ],
  },
];

export const POSTS = [
  {
    slug: 'bengal-cat-care-guide-temperament-diet-environment',
    title: 'The Complete Bengal Cat Care Guide: Temperament, Nutrition, and Enrichment',
    excerpt: 'Learn how to provide the ultimate home for your new Bengal kitten, from high-protein nutrition and hydration to vertical territory and harness training.',
    category: 'Cat Care',
    date: '2026-03-15',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1513360309081-38f0762daed1?auto=format&fit=crop&w=1200&q=80',
    content: `Bengal cats are legendary for their dog-like intelligence, wild beauty, and energetic devotion. When you welcome an ethically bred Bengal kitten from Elite Bengal Cattery into your home, you gain a lifelong companion that thrives on stimulation, climbing, and deep affection.\n\n### 1. Vertical Territory and Environmental Enrichment\nBengals inherit an instinctual love for height and observation from their Asian Leopard Cat ancestors. Provide sturdy cat trees, wall-mounted climbing perches, and scratching posts made of heavy sisal. Bengals also enjoy interactive teaser toys, puzzle feeders, and cat exercise running wheels.\n\n### 2. High-Protein Species-Appropriate Diet\nBengals are obligate carnivores with high metabolic rates. We recommend a diet high in animal protein and moisture, combining premium grain-free wet food with raw or freeze-dried balanced meat options to sustain their lean muscle and glittering coat sheen.\n\n### 3. Water Play and Socialization\nUnlike most domestic cats, Bengals often adore flowing water! They will happily play in running faucets, dip their paws into bowls, or even join you in the shower. Constant mental engagement ensures a happy, well-adjusted Bengal.`,
  },
  {
    slug: 'understanding-bengal-colors-brown-snow-silver-charcoal',
    title: 'Understanding Bengal Coat Colors: Brown Rosetted, Snow Lynx, Silver & Charcoal',
    excerpt: 'Discover the genetics behind the mesmerizing coats of Bengal cats, including doughnut rosettes, glacier-blue eyes, and rare charcoal masks.',
    category: 'Genetics',
    date: '2026-02-28',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80',
    content: `The Bengal cat breed is celebrated for its diverse and wild coat patterns. Each coloration carries unique genetic fascinations:\n\n### Traditional Brown Rosetted\nThe classic warm brown Bengal features a butterscotch or apricot ground color accented by multi-toned doughnut or arrowhead rosettes. The coat carries 'glitter'—a hollow hair shaft gene that refracts light with metallic golden brilliance.\n\n### Snow Bengals: Lynx, Mink, and Sepia\nSnow Bengals carry temperature-sensitive albinism genes. Seal Lynx Point kittens are born pure white and develop cocoa rosettes alongside icy blue eyes. Seal Minks carry aqua eyes with soft caramel markings.\n\n### Silver and Charcoal Elegance\nSilver Bengals possess the inhibitor gene, which strips away warm phaeomelanin, leaving a diamond-pewter background. Charcoal Bengals carry the wild ALC agouti variant, producing stunning dark masks and cape-like dorsal markings.`,
  },
  {
    slug: 'ethical-bengal-breeding-health-testing-genetic-standards',
    title: 'Ethical Bengal Breeding: Why DNA Health Screening & TICA Registration Matter',
    excerpt: 'Behind every healthy, vibrant kitten lies rigorous veterinary oversight, genetic screening (PK-Def, PRA-b), and annual cardiac echocardiograms.',
    category: 'Breeding Standards',
    date: '2026-01-20',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80',
    content: `Choosing a Bengal kitten requires absolute trust in your breeder. At Elite Bengal Cattery, ethical preservation of the breed is our foundation.\n\n### Essential Health Screenings\n- **PK-Def (Pyruvate Kinase Deficiency):** An inherited hemolytic anemia. All our breeding queens and studs are DNA-tested N/N (negative/clear).\n- **PRA-b (Progressive Retinal Atrophy):** A genetic eye condition causing blindness. We guarantee 100% PRA-b negative bloodlines.\n- **HCM (Hypertrophic Cardiomyopathy):** Regular board-certified veterinary cardiologist echocardiograms ensure parent hearts are robust and clear.\n\n### In-Home Nursery Socialization\nOur kittens are raised underfoot as family members, experiencing vacuum cleaners, playful children, and gentle handling from week two onward. This creates exceptionally confident, affectionate companions.`,
  },
];

export const PAGES = {
  about: true,
  faq: true,
  blog: true,
  wholesale: true, // Wholesale / Breeding Rights
  tracking: false,
  compare: false,
  search: true,    // Required for SearchAction schema
};

export const FAQ = [
  {
    question: 'How do I reserve an available Bengal kitten?',
    answer: 'You can reserve any available kitten directly through WhatsApp or our reservation order form. A deposit of $500 secures your chosen kitten. The remaining balance is completed upon final delivery or pick-up.',
  },
  {
    question: 'How does nationwide kitten delivery work?',
    answer: 'We provide complimentary white-glove pet nanny delivery across the continental United States. A flight nanny accompanies your kitten inside the airplane cabin, delivering directly into your arms at your airport.',
  },
  {
    question: 'What health guarantees and veterinary care do kittens receive?',
    answer: 'All kittens receive age-appropriate core vaccinations, preventive deworming, microchipping, thorough veterinary health checks, and a comprehensive 2-year congenital genetic health warranty against hereditary defects.',
  },
  {
    question: 'Are your Bengal cats registered with TICA?',
    answer: 'Yes, Elite Bengal Cattery is fully registered with TICA (The International Cat Association). Every kitten comes with official TICA registration documentation and certified multi-generation pedigree records.',
  },
  {
    question: 'What payment methods do you accept and how does the crypto discount work?',
    answer: 'We accept Zelle, Cash App, PayPal, Chime, certified bank wire, and major cryptocurrencies (Bitcoin, USDT, Ethereum). Paying with cryptocurrency automatically applies an instant 10% discount on your kitten adoption.',
  },
  {
    question: 'Are Bengal cats good with children and other domestic pets?',
    answer: 'Yes! Our kittens are raised in-home with early neurological stimulation (ENS) and active family socialization. Their energetic, dog-like curiosity makes them wonderful, playful companions for children, dogs, and friendly cats.',
  },
  {
    question: 'Do you offer breeding or show rights to other catteries?',
    answer: 'Yes, select top-tier kittens with champion structural conformation and pedigree genetics are available with full TICA breeding and show rights to approved ethical preservation breeding programs.',
  },
  {
    question: 'How can I view photos and daily updates of available kittens?',
    answer: 'We post regular photo and video updates of our kittens playing in our nursery on our official TikTok account @elitebengalcatter (www.tiktok.com/@elitebengalcatter). We also send high-resolution individual photos, coat development portraits, and veterinary records directly to you via WhatsApp.',
  },
];

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sarah & Marcus Miller',
    location: 'Austin, Texas',
    rating: 5,
    date: 'September 18, 2026',
    kittenAdopted: 'Titan',
    variety: 'Brown Rosetted Male',
    headline: 'Our boy Titan is the sweetest, most stunning cat we’ve ever seen',
    text: 'From our first message on WhatsApp to the flight nanny meeting us at Austin-Bergstrom airport, the experience was flawless. Titan arrived calm, confident, and immediately began purring in his carrier. His rosetting is even more luminous in person than in the nursery photos. Truly an ethical, world-class cattery.',
    image: '/images/review_kitten_titan.jpg',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Dr. Julian Vance',
    location: 'Denver, Colorado',
    rating: 5,
    date: 'September 12, 2026',
    kittenAdopted: 'Glacier',
    variety: 'Snow Lynx Rosetted Male',
    headline: 'Exceptional health pedigree and incredible playful intelligence',
    text: 'As a veterinary professional, finding a breeder who performs full genetic screening for PRA-b and PK-Def was my top priority. Glacier came with complete veterinary records, microchip, and clean health clearances. He plays fetch with crumpled paper balls and greets us at the front door every evening. We could not be happier.',
    image: '/images/review_kitten_snow.jpg',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Amanda & Christopher Ross',
    location: 'Scottsdale, Arizona',
    rating: 5,
    date: 'September 5, 2026',
    kittenAdopted: 'Duchess',
    variety: 'Brown Rosetted Breeding Queen',
    headline: 'Duchess took our breath away — championship type and pure affection',
    text: 'We fell in love with Duchess on TikTok and reserved her with full breeding rights for our preservation program. The cattery concierge sent us weekly photo suites and verified all DNA color and health sequencing. When the pet courier delivered her in Scottsdale, she melted into our laps within five minutes. Her rare tri-color rosettes and wild head type are breathtaking.',
    image: '/images/duchess-breeding-queen-1.jpg',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Elena Rostova',
    location: 'Charlotte, North Carolina',
    rating: 5,
    date: 'August 29, 2026',
    kittenAdopted: 'Luna',
    variety: 'Charcoal Silver Rosetted Female',
    headline: 'Luna has the wild charcoal mask and the gentlest heart',
    text: 'We visited the nursery appointment in North Carolina before adopting Luna. The cleanliness and love poured into these cats is heartwarming. Luna is endlessly affectionate with our two Golden Retrievers and follows our kids everywhere like a little shadow. Her silver glitter coat sparkles in direct sunlight!',
    image: '/images/luna-silver-charcoal-1.jpg',
    verified: true,
  },
  {
    id: 'rev-5',
    author: 'Michael & David Chen',
    location: 'Atlanta, Georgia',
    rating: 5,
    date: 'August 16, 2026',
    kittenAdopted: 'Sterling',
    variety: 'Silver Rosetted Male',
    headline: 'Smooth crypto reservation and VIP pet courier delivery right to our arms',
    text: 'We took advantage of the 10% Bitcoin discount when reserving Sterling, which was swift and secure. The communication was prompt with regular photo updates before his travel date. The flight nanny treated him like royalty inside the cabin. He is healthy, energetic, and litter-box trained from minute one.',
    image: '/images/review_kitten_silver.jpg',
    verified: true,
  },
  {
    id: 'rev-6',
    author: 'Jonathan & Claire Beaumont',
    location: 'Seattle, Washington',
    rating: 5,
    date: 'July 24, 2026',
    kittenAdopted: 'Astra',
    variety: 'Brown Rosetted Female',
    headline: 'Astra bounded into our home like royalty — healthy, bold, and loving',
    text: 'Adopting from across the country can feel daunting, but Elite Bengal Cattery made it seamless. The hand-delivery to Seattle-Tacoma airport was punctual, and Astra was relaxed and curious. She sleeps at the foot of our bed, loves water from the faucet, and has the most vivid doughnut rosetting we have ever laid eyes on.',
    image: '/images/review_kitten_astra.jpg',
    verified: true,
  },
];

export const COMPLIANCE = {
  bannedTerms: [],
  requiredFramings: [
    'TICA registered ethical cattery',
    'Certified DNA health tested parents',
    'In-cabin pet nanny delivery',
  ],
  prohibitedClaims: [],
  ageGate: false,
  ageMinimum: null,
  gdpr: true,
  disclaimer: 'Elite Bengal Cattery is an ethical hobby breeder registered with TICA. We adhere strictly to responsible breeding practices, genetic testing protocols, and humane non-declawing standards.',
};
