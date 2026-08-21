import { Product } from '@/types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'anker-maggo-clear-case',
    name: 'MagGo Clear Case with MagSafe',
    brand: 'Anker',
    category: 'phone-cases',
    categoryName: 'Phone Cases',
    price: 34.99,
    wasPrice: 44.99,
    rating: 4.6,
    reviewCount: 1204,
    badge: 'sale',
    badgeText: '-22%',
    sku: 'ANK-MG-CLR-17P',
    inStock: true,
    stockCount: 42,
    iconType: 'case',
    description: 'Ultra-clear, yellowing-resistant case with a built-in magnetic array for perfect MagSafe alignment. Reinforced corners absorb drops up to 3m — tested for Canadian winters.',
    longDescription: 'The MagGo Clear Case pairs a scratch-resistant polycarbonate shell with a soft TPU bumper, plus a reinforced magnetic ring calibrated for precise MagSafe snap. Includes raised bezels to protect camera and screen on flat surfaces. Engineered with anti-yellowing UV inhibitors to stay crystal-clear month after month.',
    features: [
      'Built-in N52 powerful magnet array for strong MagSafe attachment',
      'Tested to withstand drops up to 3 meters (10ft Military Grade)',
      'Anti-yellowing coating with 99.9% UV resistance',
      '0.8mm raised camera bezel and 1.2mm screen bumper',
      'Wireless charging and MagSafe wallet compatible'
    ],
    specs: {
      'Material': 'Polycarbonate + Shock-absorbing TPU',
      'MagSafe Compatibility': 'Yes, built-in 15N magnetic array',
      'Drop Protection': 'Up to 3m / 10ft (MIL-STD-810G)',
      'Weight': '34g (1.2 oz)',
      'Warranty': '1-Year Manufacturer Warranty',
      'Package Contents': '1x Anker MagGo Clear Case'
    },
    compatibleDevices: ['iPhone 17 Pro', 'iPhone 17', 'iPhone 16 Pro Max', 'Samsung Galaxy S26', 'Google Pixel 10'],
    colors: [
      { name: 'Midnight Clear', colorHex: '#0B1E3D' },
      { name: 'Electric Blue', colorHex: '#0B63F6' },
      { name: 'Vivid Pink', colorHex: '#FF2E93' },
      { name: 'Crystal Frost', colorHex: '#F6F8FB' }
    ],
    models: ['iPhone 17 Pro', 'iPhone 17', 'Galaxy S26', 'Pixel 10'],
    tags: ['magsafe', 'clear', 'protection', 'drop-tested', 'best-seller'],
    warranty: '1-Year Limited Warranty',
    reviews: [
      {
        id: 'rev-1',
        author: 'Marc B.',
        rating: 5,
        date: '3 days ago',
        title: 'Perfect fit & strong magnet',
        comment: 'Magnets are even stronger than original Apple cases. Survived a drop on icy pavement in Toronto with zero scratches!',
        verified: true,
        location: 'Toronto, ON'
      },
      {
        id: 'rev-2',
        author: 'Sarah K.',
        rating: 5,
        date: '1 week ago',
        title: 'Crystal clear and looks sleek',
        comment: 'Buttons are super clicky and responsive. The anti-yellowing claim holds up after months of daily use.',
        verified: true,
        location: 'Vancouver, BC'
      },
      {
        id: 'rev-3',
        author: 'David L.',
        rating: 4,
        date: '2 weeks ago',
        title: 'Great value for money',
        comment: 'High build quality, lightweight, and grips nicely in the hand.',
        verified: true,
        location: 'Calgary, AB'
      }
    ]
  },
  {
    id: 'ugreen-65w-gan-fast-charger',
    name: '65W GaN Fast Charger, 3-Port',
    brand: 'UGREEN',
    category: 'chargers',
    categoryName: 'Chargers',
    price: 39.99,
    wasPrice: null,
    rating: 4.8,
    reviewCount: 892,
    badge: 'best',
    badgeText: 'BEST SELLER',
    sku: 'UGR-65W-GAN3P',
    inStock: true,
    stockCount: 88,
    iconType: 'charger',
    description: 'Ultra-compact 65W GaN III fast charger with 2x USB-C and 1x USB-A ports. Charge MacBook, iPhone, and Galaxy simultaneously at top speed.',
    longDescription: 'Powered by the latest GaNFast III technology, this 65W wall charger delivers maximum charging efficiency with 50% smaller footprint and significantly lower heat generation. Dynamic power allocation intelligently routes optimal wattage to connected devices.',
    features: [
      '65W max output powers laptops, tablets, and phones',
      '3-Port simultaneous fast charging (2x USB-C + 1x USB-A)',
      'GaN III technology runs cooler and uses 30% less space',
      'Comprehensive Thermal Guard 2.0 temperature monitoring',
      'Foldable prongs for easy travel'
    ],
    specs: {
      'Total Output': '65W Max',
      'Port Configuration': '2x USB-C (PD 3.0 / PPS) + 1x USB-A (QC 4.0)',
      'Input Voltage': '100-240V ~ 50/60Hz',
      'Dimensions': '65 x 39 x 32 mm',
      'Weight': '130g',
      'Warranty': '2-Year Replacement Warranty'
    },
    compatibleDevices: ['MacBook Air / Pro', 'iPhone 17 / 16 / 15', 'Samsung Galaxy S26 / S25', 'iPad Pro', 'Steam Deck', 'Dell XPS'],
    colors: [
      { name: 'Space Gray', colorHex: '#1E293B' },
      { name: 'Arctic White', colorHex: '#FFFFFF' }
    ],
    models: ['Universal 65W (Foldable US/CA Plug)'],
    tags: ['gan', 'fast-charging', 'usb-c', 'laptop', 'multi-port'],
    warranty: '2-Year Manufacturer Warranty',
    reviews: [
      {
        id: 'rev-4',
        author: 'Alexandre P.',
        rating: 5,
        date: '5 days ago',
        title: 'Replaced all my travel chargers',
        comment: 'Charges my work laptop and phone at the same time. Never gets uncomfortably hot.',
        verified: true,
        location: 'Montreal, QC'
      }
    ]
  },
  {
    id: 'baseus-usb-c-braided-cable-2m',
    name: 'USB-C to USB-C Braided Cable, 2m',
    brand: 'Baseus',
    category: 'cables',
    categoryName: 'Cables',
    price: 15.99,
    wasPrice: 19.99,
    rating: 4.5,
    reviewCount: 657,
    badge: 'new',
    badgeText: 'NEW',
    sku: 'BAS-USBC-2M-100W',
    inStock: true,
    stockCount: 150,
    iconType: 'cable',
    description: 'High-durability 100W Power Delivery braided cable with E-Marker smart chip and reinforced zinc alloy connectors. Bend-tested 25,000+ times.',
    longDescription: 'Built with double-nylon high density braiding and aluminum alloy housing, this 2-meter cable supports 100W PD charging (20V/5A) and 480Mbps data sync. Ideal for high-power laptops, tablets, and smartphones.',
    features: [
      '100W Power Delivery (20V/5A) ultra-fast charging',
      'High-grade double nylon braided jacket resists fraying and kinks',
      'Built-in E-Marker chip protects against voltage spikes',
      '25,000+ bend lifespan rating',
      'Includes premium silicone cable tie'
    ],
    specs: {
      'Max Power': '100W (20V / 5A)',
      'Data Transfer Rate': '480 Mbps (USB 2.0)',
      'Length': '2 Meters (6.6 ft)',
      'Material': 'Zinc Alloy + Double Braided Nylon',
      'Connector Type': 'USB-C to USB-C'
    },
    compatibleDevices: ['MacBook', 'iPad Pro / Air', 'iPhone 15 / 16 / 17', 'Galaxy S Series', 'Pixel Devices', 'Nintendo Switch'],
    colors: [
      { name: 'Stealth Black', colorHex: '#111827' },
      { name: 'Cobalt Blue', colorHex: '#0B63F6' },
      { name: 'Neon Orange', colorHex: '#FF7A1A' }
    ],
    models: ['2.0m (6.6ft)', '1.0m (3.3ft)'],
    tags: ['cable', '100w', 'braided', 'usb-c', 'durable'],
    warranty: '1-Year Limited Warranty'
  },
  {
    id: 'esr-10000mah-magsafe-power-bank',
    name: '10,000mAh MagSafe Power Bank',
    brand: 'ESR',
    category: 'power-banks',
    categoryName: 'Power Banks',
    price: 49.99,
    wasPrice: null,
    rating: 4.7,
    reviewCount: 1033,
    badge: 'limited',
    badgeText: 'LIMITED',
    sku: 'ESR-PB-10K-MAG',
    inStock: true,
    stockCount: 19,
    iconType: 'power',
    description: 'Compact 10,000mAh magnetic wireless power bank with built-in folding kickstand and 20W PD two-way fast charging USB-C port.',
    longDescription: 'Never run out of power on the go. Strong 1,000g magnetic hold locks securely onto your phone. The integrated zinc alloy kickstand lets you watch videos in portrait or landscape while charging.',
    features: [
      '10,000mAh high capacity charges iPhone 16/17 up to 2.2 times',
      '15W fast wireless charging + 20W wired USB-C output',
      'Strong 1000g magnetic lock prevents accidental detachment',
      'Foldable multi-angle zinc alloy kickstand',
      'Pass-through charging enables charging bank and phone at once'
    ],
    specs: {
      'Capacity': '10,000 mAh / 38.5 Wh',
      'Wireless Output': '5W / 7.5W / 10W / 15W Max',
      'USB-C Input/Output': 'PD 20W Max (5V/3A, 9V/2.22A, 12V/1.67A)',
      'Dimensions': '105 x 69 x 19 mm',
      'Weight': '210g'
    },
    compatibleDevices: ['iPhone 12 through 17 Series', 'MagSafe Cases', 'Qi-enabled Wireless Devices'],
    colors: [
      { name: 'Obsidian Black', colorHex: '#0B1E3D' },
      { name: 'Titanium White', colorHex: '#F3F4F6' },
      { name: 'Sunset Coral', colorHex: '#FF7A1A' }
    ],
    models: ['10,000mAh Kickstand Edition'],
    tags: ['magsafe', 'powerbank', 'wireless', 'kickstand', 'travel'],
    warranty: '1-Year Limited Warranty'
  },
  {
    id: 'spigen-arcfield-wireless-earbuds-pro',
    name: 'ArcField Wireless Earbuds Pro',
    brand: 'Spigen',
    category: 'audio',
    categoryName: 'Audio',
    price: 59.99,
    wasPrice: 79.99,
    rating: 4.4,
    reviewCount: 341,
    badge: 'sale',
    badgeText: '-25%',
    sku: 'SPG-AF-TWS-PRO',
    inStock: true,
    stockCount: 35,
    iconType: 'audio',
    description: 'Active Noise Cancelling true wireless earbuds with 11mm bio-cellulose drivers, 36h total battery life, and IPX5 sweat resistance.',
    longDescription: 'Immerse yourself in crystal-clear acoustics and deep dynamic bass. Hybrid ANC suppresses background noise up to 38dB, while Transparency Mode lets you hear your surroundings with a single tap.',
    features: [
      'Hybrid Active Noise Cancellation (up to -38dB)',
      'Custom tuned 11mm dynamic drivers with rich bass',
      '36-hour total battery life with wireless charging case',
      'Quad-mic environmental noise cancellation for crisp phone calls',
      'IPX5 water and sweat resistant'
    ],
    specs: {
      'Bluetooth Version': '5.3 (AAC / SBC / aptX)',
      'Battery Life': '8h earbuds + 28h case (36h total)',
      'Charging Time': '1.5h wired / 2h Qi wireless',
      'Waterproof Rating': 'IPX5',
      'Weight': '4.5g per earbud'
    },
    compatibleDevices: ['iOS, Android, Windows, macOS, smartwatches'],
    colors: [
      { name: 'Matte Black', colorHex: '#1F2937' },
      { name: 'Glacier White', colorHex: '#F9FAFB' }
    ],
    models: ['Standard ANC Edition'],
    tags: ['audio', 'wireless', 'anc', 'earbuds', 'spigen'],
    warranty: '1-Year Limited Warranty'
  },
  {
    id: 'torras-ultraglass-screen-protector',
    name: 'UltraGlass Tempered Screen Protector',
    brand: 'TORRAS',
    category: 'screen-protectors',
    categoryName: 'Screen Protectors',
    price: 19.99,
    wasPrice: null,
    rating: 4.9,
    reviewCount: 2210,
    badge: null,
    badgeText: '',
    sku: 'TOR-UG-9H-2PK',
    inStock: true,
    stockCount: 210,
    iconType: 'screen',
    description: '9H+ hardness aerospace-grade tempered glass with 1-second dust-free alignment installation frame. Includes 2-pack.',
    longDescription: 'The pinnacle of screen defense. Made from dual-ion exchange tempered glass that withstands 120kg edge pressure. Oleophobic electroplated coating ensures effortless finger gliding and smudge resistance.',
    features: [
      'Aerospace-grade 9H+ shatterproof tempered glass',
      'Zero-bubble auto-alignment frame makes install foolproof in 5 seconds',
      'Electroplated oleophobic coating resists fingerprints',
      'True 99.99% HD optical transparency',
      'Includes 2x Screen Protectors + 1x Installation Tray'
    ],
    specs: {
      'Hardness': '9H+ Dual-Ion Exchange Tempered Glass',
      'Thickness': '0.33mm ultra-thin',
      'Coverage': 'Full Edge-to-Edge with 2.5D curved borders',
      'Package': '2x Glass Protectors, 1x Auto-Alignment Frame, Cleaning Kits'
    },
    compatibleDevices: ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'Galaxy S26 Ultra', 'Pixel 10 Pro'],
    colors: [
      { name: 'HD Clear', colorHex: '#E5E7EB' },
      { name: 'Privacy Anti-Spy', colorHex: '#374151' }
    ],
    models: ['iPhone 17 Pro', 'iPhone 17', 'Galaxy S26', 'Pixel 10'],
    tags: ['screen-protector', 'tempered-glass', '9h', 'anti-scratch', '2-pack'],
    warranty: 'Lifetime Replacement Warranty'
  },
  {
    id: 'samsung-wireless-car-mount-charger-15w',
    name: 'Wireless Car Mount Charger 15W',
    brand: 'Samsung',
    category: 'car-accessories',
    categoryName: 'Car Accessories',
    price: 44.99,
    wasPrice: 54.99,
    rating: 4.3,
    reviewCount: 198,
    badge: 'sale',
    badgeText: '-18%',
    sku: 'SAM-CAR-15W-MNT',
    inStock: true,
    stockCount: 54,
    iconType: 'mount',
    description: 'Auto-clamping fast wireless car charger with 360-degree ball joint rotation and secure air vent / dashboard mounting clips.',
    longDescription: 'Smart infrared proximity sensors automatically open the clamps when your phone approaches and close securely for a bump-proof grip. Built-in supercapacitor lets you release your phone even after turning off the engine.',
    features: [
      '15W Fast Qi wireless charging',
      'Smart sensor auto-clamp & touch release mechanism',
      '360° pivot ball head for horizontal GPS or vertical calling',
      'Dual mount kit: Air vent hook + suction dashboard arm included',
      'Built-in safety capacitor for engine-off phone retrieval'
    ],
    specs: {
      'Wireless Output': '15W / 10W / 7.5W / 5W',
      'Clamp Width': '62mm to 89mm (Fits 4.7" to 6.9" screens)',
      'Input': '9V/2A, 12V/1.5A via USB-C',
      'Mount Type': 'Air Vent Clip + Dashboard Suction Arm'
    },
    compatibleDevices: ['Universal Qi-compatible (iPhone, Galaxy, Pixel, OnePlus)'],
    colors: [
      { name: 'Classic Black', colorHex: '#111827' }
    ],
    models: ['Universal Vent & Dash Mount Kit'],
    tags: ['car-mount', 'auto-clamp', 'wireless-charger', 'gps'],
    warranty: '1-Year Limited Warranty'
  },
  {
    id: 'esr-halolock-kickstand-case',
    name: 'HaloLock Kickstand Case',
    brand: 'ESR',
    category: 'phone-cases',
    categoryName: 'Phone Cases',
    price: 36.99,
    wasPrice: 36.99,
    rating: 4.2,
    reviewCount: 76,
    badge: 'out',
    badgeText: 'OUT OF STOCK',
    sku: 'ESR-HL-KCK-17',
    inStock: false,
    stockCount: 0,
    iconType: 'case',
    description: 'Heavy duty hybrid case with built-in camera guard kickstand and military-grade drop protection. Supports all MagSafe accessories.',
    longDescription: 'The patented adjustable camera-ring kickstand allows hands-free viewing from 0 to 85 degrees while keeping camera lenses fully protected. Engineered with Air-Guard shock corners.',
    features: [
      'Adjustable 0-85° zinc alloy camera-guard kickstand',
      '1,500g magnetic hold for MagSafe ecosystem',
      'Air-Guard shock absorbent corners',
      'Polycarbonate backplate resists yellowing and scratches'
    ],
    specs: {
      'Material': 'Zinc Alloy Kickstand + Acrylic + TPU',
      'Drop Standard': 'MIL-STD-810H 516.8',
      'Weight': '42g'
    },
    compatibleDevices: ['iPhone 17 Pro', 'iPhone 17 Pro Max', 'Galaxy S26'],
    colors: [
      { name: 'Frosted Black', colorHex: '#1F2937' },
      { name: 'Clear Titanium', colorHex: '#E5E7EB' }
    ],
    models: ['iPhone 17 Pro', 'iPhone 17'],
    tags: ['kickstand', 'magsafe', 'rugged'],
    warranty: '1-Year Limited Warranty'
  }
];

export const CATEGORIES = [
  { id: 'phone-cases', name: 'Phone Cases', ringColor: '#8B3FE0', count: 128, description: 'Slim, rugged, and MagSafe-compatible cases.' },
  { id: 'screen-protectors', name: 'Screen Protectors', ringColor: '#FF3D9A', count: 64, description: '9H tempered glass and privacy shields.' },
  { id: 'chargers', name: 'Chargers', ringColor: '#22B14C', count: 85, description: 'GaN fast wall blocks, multi-port hubs, and desktop docks.' },
  { id: 'cables', name: 'Cables', ringColor: '#2F6FED', count: 96, description: '100W PD braided, USB4, and ultra-durable cords.' },
  { id: 'power-banks', name: 'Power Banks', ringColor: '#16345E', count: 42, description: 'High-capacity MagSafe and PD portable batteries.' },
  { id: 'audio', name: 'Audio', ringColor: '#FF7A1A', count: 38, description: 'Wireless earbuds, noise-canceling headphones, and speakers.' },
  { id: 'car-accessories', name: 'Car Accessories', ringColor: '#12B5B0', count: 51, description: 'Wireless auto-clamping mounts, car chargers, and cables.' }
];

export const BRANDS = [
  'Anker', 'UGREEN', 'Baseus', 'ESR', 'Spigen', 'TORRAS', 'Samsung', 'Belkin'
];

export const DEVICE_MODELS = [
  'iPhone 17 Pro',
  'iPhone 17',
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'Galaxy S26',
  'Galaxy S26 Ultra',
  'Pixel 10',
  'Pixel 10 Pro'
];

export const PROMO_CODES = [
  { code: 'SAVE10', discountAmount: 10.00, description: '$10 OFF on orders over $40' },
  { code: 'WELCOME15', discountPercent: 15, description: '15% OFF for new VIP customers' },
  { code: 'FREESHIP', discountAmount: 6.99, description: 'Free Express Shipping discount' }
];
