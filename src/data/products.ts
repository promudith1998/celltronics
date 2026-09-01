import { Product, DeviceFamily } from '@/types/product';

export const PRODUCTS: Product[] = [
  // ========================================================
  // SCREEN PROTECTORS (4 items)
  // ========================================================
  {
    id: 'torras-ultraglass-screen-protector',
    name: 'UltraGlass 9H+ Tempered Glass (2-Pack)',
    brand: 'TORRAS',
    category: 'screen-protectors',
    categoryName: 'Screen Protectors',
    price: 19.99,
    wasPrice: 26.99,
    rating: 4.9,
    reviewCount: 2210,
    badge: 'best',
    badgeText: 'BEST SELLER',
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
      { name: 'Matte Anti-Glare', colorHex: '#94A3B8' }
    ],
    models: ['iPhone 17 Pro', 'iPhone 17', 'Galaxy S26', 'Pixel 10'],
    tags: ['screen-protector', 'tempered-glass', '9h', 'anti-scratch', '2-pack'],
    warranty: 'Lifetime Replacement Warranty',
    reviews: [
      {
        id: 'rev-sp-1',
        author: 'Liam C.',
        rating: 5,
        date: '2 days ago',
        title: 'Easiest install ever',
        comment: 'The alignment tray made installation 100% dust and bubble-free on first try!',
        verified: true,
        location: 'Ottawa, ON'
      }
    ]
  },
  {
    id: 'spigen-glastr-ezfit-privacy-glass',
    name: 'GlasTR EZ FIT 28° Privacy Glass (2-Pack)',
    brand: 'Spigen',
    category: 'screen-protectors',
    categoryName: 'Screen Protectors',
    price: 24.99,
    wasPrice: 29.99,
    rating: 4.8,
    reviewCount: 1450,
    badge: 'sale',
    badgeText: '-17%',
    sku: 'SPG-PRIV-EZ-17P',
    inStock: true,
    stockCount: 95,
    iconType: 'screen',
    description: '28-degree narrow field two-way privacy filter prevents shoulder-surfing on public transit while maintaining HD clarity from straight-on.',
    longDescription: 'Engineered with micro-louver technology to shield your confidential chats and banking info from onlookers. Treated with reinforced shock-dispersion edges to resist chips and corner drops.',
    features: [
      '28° Privacy filter blocks viewing angles from both sides',
      'EZ Fit auto-alignment tray included for foolproof installation',
      'Case-friendly cutouts compatible with Spigen & third-party cases',
      'Extreme 9H surface scratch resistance',
      'Hydrophobic and oleophobic oil-repellent coating'
    ],
    specs: {
      'Hardness': '9H Tempered Glass',
      'Privacy Angle': '28 Degrees Left & Right',
      'Thickness': '0.35mm',
      'Package': '2x Privacy Protectors + 1x EZ Fit Alignment Tray'
    },
    compatibleDevices: ['iPhone 17 Pro', 'iPhone 17', 'iPhone 16 Pro Max', 'Galaxy S26 Ultra'],
    colors: [
      { name: 'Privacy Dark Shield', colorHex: '#1E293B' }
    ],
    models: ['iPhone 17 Pro', 'iPhone 17', 'Galaxy S26 Ultra'],
    tags: ['privacy', 'screen-protector', 'spigen', 'ez-fit', 'anti-spy'],
    warranty: '1-Year Limited Warranty'
  },
  {
    id: 'esr-armorite-shatterproof-screen-protector',
    name: 'Armorite Ultra-Tough Shatterproof Glass',
    brand: 'ESR',
    category: 'screen-protectors',
    categoryName: 'Screen Protectors',
    price: 21.99,
    wasPrice: null,
    rating: 4.7,
    reviewCount: 980,
    badge: 'new',
    badgeText: 'NEW',
    sku: 'ESR-ARM-9H-SHAT',
    inStock: true,
    stockCount: 140,
    iconType: 'screen',
    description: 'Military-grade 110-lb force impact resistance. Edge-to-edge reinforcement prevents chipped borders.',
    longDescription: 'Tested with steel-ball drop tests from 1.8m height. Armorite offers 3x the impact resistance of standard tempered glass. Micro-curved 2.5D polished edges provide buttery-smooth swipe gestures.',
    features: [
      'Withstands up to 110 lbs (50kg) of direct edge impact force',
      'Ultra-responsive touch sensitivity with zero latency',
      'Anti-static adhesive prevents dust attraction during installation',
      'Full cover micro-curved edges fit seamless in any case'
    ],
    specs: {
      'Hardness': '9H+ Military Reinforced',
      'Impact Rating': '110 lbs / 50kg force tested',
      'Thickness': '0.33mm',
      'Contents': '2x Armorite Glasses, 1x Quick-Fit Frame'
    },
    compatibleDevices: ['iPhone 17 Pro', 'iPhone 17', 'Galaxy S26', 'Pixel 10 Pro'],
    colors: [
      { name: 'Ultra-Clear Crystal', colorHex: '#F1F5F9' }
    ],
    models: ['iPhone 17 Pro', 'iPhone 17', 'Galaxy S26'],
    tags: ['armorite', 'screen-protector', 'military-grade', 'shatterproof'],
    warranty: '2-Year Replacement Warranty'
  },
  {
    id: 'belkin-ultraglass-2-antimicrobial',
    name: 'UltraGlass 2 Treated Anti-Microbial Shield',
    brand: 'Belkin',
    category: 'screen-protectors',
    categoryName: 'Screen Protectors',
    price: 34.99,
    wasPrice: 39.99,
    rating: 4.9,
    reviewCount: 712,
    badge: 'limited',
    badgeText: 'PREMIUM',
    sku: 'BEL-UG2-ANT-17P',
    inStock: true,
    stockCount: 45,
    iconType: 'screen',
    description: 'Engineered with lithium aluminosilicate (LAS) glass for 2.7x greater strength than standard tempered glass.',
    longDescription: 'Developed by Belkin with Schott glass technology. Contains an anti-microbial agent to inhibit 99.99% of bacterial growth on your screen surface without degrading over time.',
    features: [
      'Lithium Aluminosilicate (LAS) glass engineered for Apple & Samsung',
      '2.7x stronger than traditional soda-lime tempered glass',
      'Anti-microbial coating reduces 99.99% surface bacteria',
      'Ultra-thin 0.29mm profile preserves native screen feel',
      'Easy Align tray included for precision application'
    ],
    specs: {
      'Material': 'Lithium Aluminosilicate (LAS) Glass',
      'Thickness': '0.29mm Ultra-Slim',
      'Anti-Microbial': 'EPA-registered anti-microbial treatment',
      'Package': '1x LAS Screen Protector + 1x Easy Align Tray'
    },
    compatibleDevices: ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 16 Pro Max', 'Galaxy S26 Ultra'],
    colors: [
      { name: 'Pure Diamond Clear', colorHex: '#FFFFFF' }
    ],
    models: ['iPhone 17 Pro', 'Galaxy S26 Ultra'],
    tags: ['belkin', 'ultraglass', 'antimicrobial', 'las-glass', 'premium'],
    warranty: 'Limited Lifetime Warranty'
  },

  // ========================================================
  // PHONE CASES (4 items)
  // ========================================================
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
    description: 'Ultra-clear, yellowing-resistant case with a built-in magnetic array for perfect MagSafe alignment. Tested for Canadian winters.',
    longDescription: 'The MagGo Clear Case pairs a scratch-resistant polycarbonate shell with a soft TPU bumper, plus a reinforced magnetic ring calibrated for precise MagSafe snap. Includes raised bezels to protect camera and screen.',
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
      'Warranty': '1-Year Manufacturer Warranty'
    },
    compatibleDevices: ['iPhone 17 Pro', 'iPhone 17', 'iPhone 16 Pro Max', 'Galaxy S26', 'Pixel 10'],
    colors: [
      { name: 'Midnight Clear', colorHex: '#0B1E3D' },
      { name: 'Electric Blue', colorHex: '#0B63F6' },
      { name: 'Vivid Pink', colorHex: '#FF2E93' },
      { name: 'Crystal Frost', colorHex: '#F6F8FB' }
    ],
    models: ['iPhone 17 Pro', 'iPhone 17', 'Galaxy S26', 'Pixel 10'],
    tags: ['magsafe', 'clear', 'protection', 'drop-tested', 'best-seller'],
    warranty: '1-Year Limited Warranty'
  },
  {
    id: 'esr-halolock-kickstand-case',
    name: 'HaloLock Camera Guard Kickstand Case',
    brand: 'ESR',
    category: 'phone-cases',
    categoryName: 'Phone Cases',
    price: 36.99,
    wasPrice: 42.99,
    rating: 4.8,
    reviewCount: 890,
    badge: 'best',
    badgeText: 'TOP RATED',
    sku: 'ESR-HL-KCK-17',
    inStock: true,
    stockCount: 65,
    iconType: 'case',
    description: 'Heavy duty hybrid case with patented zinc alloy camera guard kickstand and military-grade drop defense.',
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
    compatibleDevices: ['iPhone 17 Pro', 'iPhone 17', 'Galaxy S26'],
    colors: [
      { name: 'Frosted Black', colorHex: '#1F2937' },
      { name: 'Clear Titanium', colorHex: '#E5E7EB' }
    ],
    models: ['iPhone 17 Pro', 'iPhone 17'],
    tags: ['kickstand', 'magsafe', 'rugged'],
    warranty: '1-Year Limited Warranty'
  },
  {
    id: 'spigen-ultra-hybrid-matte-magsafe',
    name: 'Ultra Hybrid Matte MagSafe Case',
    brand: 'Spigen',
    category: 'phone-cases',
    categoryName: 'Phone Cases',
    price: 32.99,
    wasPrice: null,
    rating: 4.7,
    reviewCount: 1530,
    badge: null,
    badgeText: '',
    sku: 'SPG-UH-MAT-17',
    inStock: true,
    stockCount: 88,
    iconType: 'case',
    description: 'Frosted matte translucent backplate that resists fingerprints and smudges while showing off your phone logo.',
    longDescription: 'Crafted with Air Cushion Technology in all corners for military-grade drop protection. Matte frosted back feels soft to the touch with zero oily smudges.',
    features: [
      'Air Cushion Technology corner air bags',
      'Integrated magnetic ring for seamless MagSafe charging',
      'Matte frosted anti-fingerprint back finish',
      'Pronounced tactile button covers'
    ],
    specs: {
      'Material': 'TPU Bumper + Polycarbonate Matte Back',
      'Weight': '32g',
      'Drop Standard': 'MIL-STD 810G-516.6'
    },
    compatibleDevices: ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'Galaxy S26 Ultra'],
    colors: [
      { name: 'Matte Frost Black', colorHex: '#111827' },
      { name: 'Zero One Edition', colorHex: '#374151' }
    ],
    models: ['iPhone 17 Pro', 'Galaxy S26 Ultra'],
    tags: ['spigen', 'matte', 'magsafe', 'case'],
    warranty: '1-Year Limited Warranty'
  },
  {
    id: 'torras-guardian-slim-magnetic-case',
    name: 'Guardian Military Slim MagSafe Case',
    brand: 'TORRAS',
    category: 'phone-cases',
    categoryName: 'Phone Cases',
    price: 38.99,
    wasPrice: 48.99,
    rating: 4.9,
    reviewCount: 2040,
    badge: 'sale',
    badgeText: '-20%',
    sku: 'TOR-GD-SLM-17',
    inStock: true,
    stockCount: 110,
    iconType: 'case',
    description: '12ft military drop protection in an ultra-slim 0.04-inch profile with interchangeable DIY colored buttons.',
    longDescription: 'Equipped with X-SHOCK 3.0 airbags in all 4 corners. Comes with 3 sets of interchangeable accent buttons in vibrant colors.',
    features: [
      'X-SHOCK 3.0 patented corner shock absorption',
      'Strong 18N Halbach magnetic array',
      'Includes 3 sets of customizable colorful buttons',
      'Skin-friendly nano oleophobic velvet coating'
    ],
    specs: {
      'Material': 'Bayer PC + German TPU',
      'Thickness': '0.04 in / 1.1mm',
      'Drop Rating': '12ft / 3.6m Tested'
    },
    compatibleDevices: ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'Galaxy S26 Ultra', 'Pixel 10 Pro'],
    colors: [
      { name: 'Translucent Smoke Black', colorHex: '#1F2937' },
      { name: 'Navy Blue', colorHex: '#0B1E3D' },
      { name: 'Deep Purple', colorHex: '#7C3AED' }
    ],
    models: ['iPhone 17 Pro', 'Galaxy S26 Ultra'],
    tags: ['torras', 'slim', 'military-drop', 'custom-buttons'],
    warranty: '1-Year Limited Warranty'
  },

  // ========================================================
  // CHARGERS (4 items)
  // ========================================================
  {
    id: 'ugreen-65w-gan-fast-charger',
    name: 'Nexode 65W GaN III Fast Charger 3-Port',
    brand: 'UGREEN',
    category: 'chargers',
    categoryName: 'Chargers',
    price: 39.99,
    wasPrice: 49.99,
    rating: 4.8,
    reviewCount: 892,
    badge: 'best',
    badgeText: 'BEST SELLER',
    sku: 'UGR-65W-GAN3P',
    inStock: true,
    stockCount: 88,
    iconType: 'charger',
    description: 'Ultra-compact 65W GaN III fast charger with 2x USB-C and 1x USB-A ports. Charge MacBook and phone simultaneously.',
    longDescription: 'Powered by the latest GaNFast III technology, this 65W wall charger delivers maximum charging efficiency with 50% smaller footprint and significantly lower heat generation.',
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
      'Weight': '130g'
    },
    compatibleDevices: ['MacBook Air / Pro', 'iPhone 17 / 16 / 15', 'Galaxy S26 / S25', 'iPad Pro', 'Steam Deck'],
    colors: [
      { name: 'Space Gray', colorHex: '#1E293B' },
      { name: 'Arctic White', colorHex: '#FFFFFF' }
    ],
    models: ['Universal 65W (Foldable US/CA Plug)'],
    tags: ['gan', 'fast-charging', 'usb-c', 'laptop', 'multi-port'],
    warranty: '2-Year Manufacturer Warranty'
  },
  {
    id: 'anker-prime-100w-gan-charger',
    name: 'Prime 100W GaN Wall Charger (3-Port)',
    brand: 'Anker',
    category: 'chargers',
    categoryName: 'Chargers',
    price: 69.99,
    wasPrice: 84.99,
    rating: 4.9,
    reviewCount: 1620,
    badge: 'sale',
    badgeText: '-18%',
    sku: 'ANK-PRM-100W-3P',
    inStock: true,
    stockCount: 52,
    iconType: 'charger',
    description: '100W total output in a design 43% smaller than standard 96W Apple chargers. ActiveShield 2.0 temperature monitoring.',
    longDescription: 'Powers 2 laptops simultaneously at high speed with intelligent dynamic power distribution. GaNPrime technology ensures maximum energy efficiency.',
    features: [
      '100W Max Single Port Output for MacBook Pro 16"',
      'ActiveShield 2.0 monitors temperature 3,000,000 times per day',
      'Compact interlocking architectural design',
      'Foldable plug pins for effortless travel packing'
    ],
    specs: {
      'Total Wattage': '100W Max',
      'Ports': '2x USB-C + 1x USB-A',
      'Weight': '183g',
      'Efficiency': 'GaNPrime 93% efficiency'
    },
    compatibleDevices: ['MacBook Pro', 'Dell XPS', 'iPhone 17 / 16', 'iPad Pro', 'Galaxy S26'],
    colors: [
      { name: 'Matte Charcoal Black', colorHex: '#0B1E3D' },
      { name: 'Glacier Silver', colorHex: '#E2E8F0' }
    ],
    models: ['100W GaNPrime Edition'],
    tags: ['anker', '100w', 'ganprime', 'fast-charger', 'macbook'],
    warranty: '2-Year Limited Warranty'
  },
  {
    id: 'baseus-140w-pd31-gan-charger',
    name: '140W PD 3.1 Multi-Port Fast GaN Charger',
    brand: 'Baseus',
    category: 'chargers',
    categoryName: 'Chargers',
    price: 79.99,
    wasPrice: null,
    rating: 4.6,
    reviewCount: 420,
    badge: 'new',
    badgeText: 'NEW PD 3.1',
    sku: 'BAS-140W-PD31',
    inStock: true,
    stockCount: 38,
    iconType: 'charger',
    description: 'Next-gen PD 3.1 protocol delivering up to 140W single-port charging for demanding workstations.',
    longDescription: 'Charges MacBook Pro 16" to 50% in just 28 minutes. Includes a complimentary 240W 1.5m PD 3.1 fast charging cable in the box.',
    features: [
      'PD 3.1 140W maximum single port power delivery',
      '3 Ports (2x USB-C + 1x USB-A) with BPS II smart power split',
      'Includes 240W USB-C fast charging cable',
      'Built-in surge and short-circuit protection'
    ],
    specs: {
      'Max Power': '140W (28V/5A)',
      'Protocol': 'PD 3.1, QC 4+, PPS, AFC',
      'Dimensions': '90 x 59 x 30 mm'
    },
    compatibleDevices: ['MacBook Pro 16', 'Lenovo Legion', 'Surface Pro', 'Galaxy S26', 'iPhone 17'],
    colors: [
      { name: 'Stealth Black', colorHex: '#111827' }
    ],
    models: ['140W Station Block'],
    tags: ['140w', 'pd31', 'laptop', 'baseus'],
    warranty: '1-Year Warranty'
  },
  {
    id: 'belkin-boostcharge-pro-3in1-magsafe',
    name: 'BoostCharge Pro 3-in-1 MagSafe Charging Stand',
    brand: 'Belkin',
    category: 'chargers',
    categoryName: 'Chargers',
    price: 139.99,
    wasPrice: 169.99,
    rating: 4.9,
    reviewCount: 880,
    badge: 'limited',
    badgeText: 'PREMIUM DOCK',
    sku: 'BEL-BCP-3IN1-STND',
    inStock: true,
    stockCount: 22,
    iconType: 'charger',
    description: 'Official Apple Made for MagSafe 15W wireless dock for iPhone, Apple Watch Fast Charger, and AirPods wireless case.',
    longDescription: 'Modern stainless steel architecture floats your iPhone in portrait or StandBy mode. Charges Apple Watch Series 7/8/9/Ultra from 0 to 80% in about 45 minutes.',
    features: [
      'Official Apple Made for MagSafe 15W wireless charging',
      'Apple Watch Fast Charging magnetic puck',
      'Dedicated 5W wireless pad for AirPods / earbuds',
      'Premium stainless steel branch design'
    ],
    specs: {
      'Wireless Output': '15W (Phone) + 5W (Watch) + 5W (AirPods)',
      'Power Supply': '40W AC Adapter included',
      'Weight': '480g solid base'
    },
    compatibleDevices: ['iPhone 12-17 Series', 'Apple Watch Ultra / Series', 'AirPods Pro / 3'],
    colors: [
      { name: 'Matte White', colorHex: '#FFFFFF' },
      { name: 'Matte Black', colorHex: '#1E293B' }
    ],
    models: ['3-in-1 MagSafe Stand'],
    tags: ['belkin', 'magsafe', '3in1', 'apple-watch', 'dock'],
    warranty: '2-Year Connected Equipment Warranty ($2,500 CEW)'
  },

  // ========================================================
  // CABLES (4 items)
  // ========================================================
  {
    id: 'baseus-usb-c-braided-cable-2m',
    name: 'USB-C to USB-C 100W Braided Cable (2m)',
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
    description: 'High-durability 100W Power Delivery braided cable with E-Marker smart chip and reinforced zinc alloy connectors.',
    longDescription: 'Built with double-nylon high density braiding and aluminum alloy housing, this 2-meter cable supports 100W PD charging (20V/5A) and 480Mbps data sync.',
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
    compatibleDevices: ['MacBook', 'iPad Pro / Air', 'iPhone 15 / 16 / 17', 'Galaxy S Series', 'Pixel Devices'],
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
    id: 'anker-bio-braided-240w-cable',
    name: 'Bio-Braided 240W Silicone USB-C Cable (1.8m)',
    brand: 'Anker',
    category: 'cables',
    categoryName: 'Cables',
    price: 22.99,
    wasPrice: 27.99,
    rating: 4.8,
    reviewCount: 920,
    badge: 'best',
    badgeText: 'BEST SELLER',
    sku: 'ANK-BIO-240W-6FT',
    inStock: true,
    stockCount: 110,
    iconType: 'cable',
    description: 'Eco-friendly bio-based plant material braided nylon supporting 240W ultra-high power delivery.',
    longDescription: 'Engineered with plant-based materials to reduce petroleum consumption. Capable of powering high-demand 140W-240W gaming laptops and mobile devices.',
    features: [
      '240W Ultra-Fast PD 3.1 Power Delivery support',
      'Eco-friendly bio-based outer braid exterior',
      'Tangle-free soft silicone core with 30,000 bend lifespan',
      'Supports high-speed charging for all USB-C devices'
    ],
    specs: {
      'Max Wattage': '240W (48V / 5A)',
      'Length': '1.8m (6 ft)',
      'Material': 'Bio-based nylon + Soft touch silicone'
    },
    compatibleDevices: ['MacBook Pro 16', 'Gaming Laptops', 'iPhone 17', 'iPad Pro', 'Galaxy S26'],
    colors: [
      { name: 'Natural Sand Frost', colorHex: '#E2E8F0' },
      { name: 'Phantom Black', colorHex: '#0F172A' },
      { name: 'Mint Green', colorHex: '#10B981' }
    ],
    models: ['1.8m (6ft)'],
    tags: ['anker', '240w', 'eco-friendly', 'silicone', 'cable'],
    warranty: 'Lifetime Warranty'
  },
  {
    id: 'ugreen-right-angle-gaming-cable',
    name: '90° Right Angle Fast Charge Gaming Cable',
    brand: 'UGREEN',
    category: 'cables',
    categoryName: 'Cables',
    price: 13.99,
    wasPrice: null,
    rating: 4.7,
    reviewCount: 512,
    badge: null,
    badgeText: '',
    sku: 'UGR-90DEG-60W',
    inStock: true,
    stockCount: 75,
    iconType: 'cable',
    description: 'L-shaped 90-degree connector allows comfortable phone grip during landscape gaming and video streaming.',
    longDescription: 'No more bent connectors poking into your palms while playing mobile games. Aluminum alloy casing and nylon braided exterior guarantee endurance.',
    features: [
      'Ergonomic 90-degree right angle connector for comfortable grip',
      '60W Power Delivery fast charging support',
      'Reinforced strain relief collar resists 15,000+ bends',
      'Seamless fit even with thick phone cases installed'
    ],
    specs: {
      'Max Power': '60W (20V/3A)',
      'Angle': '90-degree L-Shape',
      'Length': '2 Meters (6.6ft)'
    },
    compatibleDevices: ['iPhone 17 / 16 / 15', 'Galaxy S26 / S25', 'Nintendo Switch', 'iPad Mini'],
    colors: [
      { name: 'Space Gray Braided', colorHex: '#334155' }
    ],
    models: ['2.0m Right Angle'],
    tags: ['gaming', '90-degree', 'cable', 'ugreen'],
    warranty: '1-Year Warranty'
  },
  {
    id: 'esr-magsafe-2in1-travel-cable',
    name: 'MagSafe Magnetic 2-in-1 Foldable Travel Cord',
    brand: 'ESR',
    category: 'cables',
    categoryName: 'Cables',
    price: 26.99,
    wasPrice: 32.99,
    rating: 4.6,
    reviewCount: 340,
    badge: 'sale',
    badgeText: '-18%',
    sku: 'ESR-MAG-2IN1-TRV',
    inStock: true,
    stockCount: 40,
    iconType: 'cable',
    description: 'Magnetic snap-and-charge cable with integrated Apple Watch puck and USB-C phone charger in one.',
    longDescription: 'The ultimate minimalist travel solution. Charge your smartwatch and phone with just one outlet cable.',
    features: [
      'Dual output: MagSafe watch module + USB-C fast charging lead',
      'Braided tangle-free cord with self-organizing magnetic coil',
      'Fast charges Apple Watch Series & Ultra'
    ],
    specs: {
      'Length': '1.5 Meters',
      'Output': 'USB-C (30W) + Watch Pad (5W)'
    },
    compatibleDevices: ['Apple Watch', 'iPhone 15-17', 'Galaxy S Series'],
    colors: [
      { name: 'Arctic Silver', colorHex: '#F1F5F9' },
      { name: 'Midnight Black', colorHex: '#1E293B' }
    ],
    models: ['1.5m Travel Cable'],
    tags: ['travel', 'magsafe', 'apple-watch', 'cable'],
    warranty: '1-Year Limited Warranty'
  },

  // ========================================================
  // POWER BANKS (4 items)
  // ========================================================
  {
    id: 'esr-10000mah-magsafe-power-bank',
    name: '10,000mAh MagSafe Power Bank with Stand',
    brand: 'ESR',
    category: 'power-banks',
    categoryName: 'Power Banks',
    price: 49.99,
    wasPrice: 59.99,
    rating: 4.7,
    reviewCount: 1033,
    badge: 'limited',
    badgeText: 'LIMITED',
    sku: 'ESR-PB-10K-MAG',
    inStock: true,
    stockCount: 19,
    iconType: 'power',
    description: 'Compact 10,000mAh magnetic wireless power bank with built-in folding kickstand and 20W PD two-way fast charging.',
    longDescription: 'Never run out of power on the go. Strong 1,000g magnetic hold locks securely onto your phone. The integrated zinc alloy kickstand lets you watch videos in portrait or landscape while charging.',
    features: [
      '10,000mAh high capacity charges iPhone up to 2.2 times',
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
    id: 'anker-prime-20000mah-200w-powerbank',
    name: 'Prime 20,000mAh 200W Power Bank with Smart Display',
    brand: 'Anker',
    category: 'power-banks',
    categoryName: 'Power Banks',
    price: 119.99,
    wasPrice: 139.99,
    rating: 4.9,
    reviewCount: 1420,
    badge: 'best',
    badgeText: 'FLAGSHIP',
    sku: 'ANK-PRM-20K-200W',
    inStock: true,
    stockCount: 34,
    iconType: 'power',
    description: '200W total dynamic power output with full-color smart digital display showing live wattage, battery health, and charge time.',
    longDescription: 'Equipped with 2x 100W USB-C ports and 1x 65W USB-A port. Fast recharges itself from 0 to 100% in just 1 hour 15 minutes using a 100W wall adapter.',
    features: [
      '200W total output charges 2 high-power laptops at 100W each simultaneously',
      'Interactive smart digital display with real-time stats',
      'Airline flight-approved 72Wh battery capacity',
      'Anker App Bluetooth smart battery diagnostics'
    ],
    specs: {
      'Capacity': '20,000mAh (72Wh)',
      'Total Output': '200W Max',
      'Ports': '2x USB-C + 1x USB-A',
      'Dimensions': '126 x 54 x 49 mm',
      'Weight': '540g'
    },
    compatibleDevices: ['MacBook Pro', 'Dell XPS', 'iPhone 17 Pro', 'iPad Pro', 'Steam Deck', 'Galaxy S26'],
    colors: [
      { name: 'Dark Titanium', colorHex: '#0B1E3D' }
    ],
    models: ['20,000mAh 200W Prime'],
    tags: ['anker-prime', '200w', 'power-bank', 'laptop-battery', 'smart-display'],
    warranty: '2-Year Limited Warranty'
  },
  {
    id: 'baseus-blade-100w-ultra-thin-powerbank',
    name: 'Blade 100W 20,000mAh Ultra-Thin Power Bank',
    brand: 'Baseus',
    category: 'power-banks',
    categoryName: 'Power Banks',
    price: 89.99,
    wasPrice: 109.99,
    rating: 4.7,
    reviewCount: 650,
    badge: 'sale',
    badgeText: '-18%',
    sku: 'BAS-BLD-100W-20K',
    inStock: true,
    stockCount: 28,
    iconType: 'power',
    description: 'Ultra-slim 0.7-inch book-style flat profile designed to slide effortlessly into laptop sleeves and backpacks.',
    longDescription: 'Features 4 ports (2x USB-C + 2x USB-A) and an LED status panel indicating remaining battery percentage and charging speed.',
    features: [
      '100W PD fast output powers laptops at full speed',
      'Ultra-thin 18mm flat design fits beside your laptop in any bag',
      'Dual USB-C 100W + Dual USB-A 30W ports',
      '65W fast input recharge in 90 minutes'
    ],
    specs: {
      'Capacity': '20,000mAh',
      'Thickness': '18mm (0.7 in)',
      'Total Ports': '4 Ports'
    },
    compatibleDevices: ['Laptops, Tablets, Smartphones, Drones'],
    colors: [
      { name: 'Matte Jet Black', colorHex: '#111827' }
    ],
    models: ['Blade 100W Edition'],
    tags: ['ultra-thin', 'baseus', '100w', 'power-bank'],
    warranty: '1-Year Warranty'
  },
  {
    id: 'torras-minimag-5000mah-slim-battery',
    name: 'MiniMag 5,000mAh Ultra-Slim Snap-On Magnetic Battery',
    brand: 'TORRAS',
    category: 'power-banks',
    categoryName: 'Power Banks',
    price: 39.99,
    wasPrice: null,
    rating: 4.8,
    reviewCount: 780,
    badge: 'new',
    badgeText: 'NEW SLIM',
    sku: 'TOR-MM-5K-MAG',
    inStock: true,
    stockCount: 60,
    iconType: 'power',
    description: 'Ultra-featherweight 0.35-inch thin magnetic pack that snaps onto the back of your phone without blocking camera lenses.',
    longDescription: 'Feels like part of your phone. Provides an emergency 100% full charge for all-day peace of mind while fitting into your front pocket.',
    features: [
      'Ultra-thin 9mm profile — does not block phone camera lenses',
      'Strong 12N N52 magnetic grip',
      'Silky smooth liquid silicone finish feels great in the palm',
      'Smart temperature control prevents phone overheating'
    ],
    specs: {
      'Capacity': '5,000mAh',
      'Thickness': '9mm (0.35 in)',
      'Weight': '115g'
    },
    compatibleDevices: ['iPhone 12 through 17 Series', 'MagSafe Cases'],
    colors: [
      { name: 'Titanium Slate', colorHex: '#334155' },
      { name: 'Sakura Pink', colorHex: '#FF2E93' },
      { name: 'Chalk White', colorHex: '#F8FAFC' }
    ],
    models: ['MiniMag 5K Snap'],
    tags: ['torras', 'slim-battery', 'magsafe', 'pocket-size'],
    warranty: '1-Year Limited Warranty'
  },

  // ========================================================
  // AUDIO (3 items)
  // ========================================================
  {
    id: 'spigen-arcfield-wireless-earbuds-pro',
    name: 'ArcField Wireless ANC Earbuds Pro',
    brand: 'Spigen',
    category: 'audio',
    categoryName: 'Audio',
    price: 59.99,
    wasPrice: 79.99,
    rating: 4.6,
    reviewCount: 341,
    badge: 'sale',
    badgeText: '-25%',
    sku: 'SPG-AF-TWS-PRO',
    inStock: true,
    stockCount: 35,
    iconType: 'audio',
    description: 'Active Noise Cancelling true wireless earbuds with 11mm bio-cellulose drivers, 36h total battery life, and IPX5 resistance.',
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
    id: 'anker-soundcore-space-q45-headphones',
    name: 'Soundcore Space Q45 Wireless ANC Headphones',
    brand: 'Anker',
    category: 'audio',
    categoryName: 'Audio',
    price: 129.99,
    wasPrice: 159.99,
    rating: 4.8,
    reviewCount: 1850,
    badge: 'best',
    badgeText: 'BEST SELLER',
    sku: 'ANK-SC-Q45-ANC',
    inStock: true,
    stockCount: 42,
    iconType: 'audio',
    description: 'Adaptive active noise cancellation reduces noise by up to 98%. 50-hour ultra-long battery life with Hi-Res Wireless LDAC audio.',
    longDescription: 'Engineered for seamless travel and focused work. Memory foam earcups cushion your ears in cloud-like comfort all day long.',
    features: [
      'Adaptive active noise canceling automatically tunes to environment',
      '50-hour battery life with ANC on (65 hours with ANC off)',
      '40mm silk & ceramic dynamic drivers with LDAC Hi-Res Audio',
      '5-minute quick charge delivers 4 hours of listening'
    ],
    specs: {
      'Battery': '50h (ANC on) / 65h (ANC off)',
      'Drivers': '40mm Double-Layer Diaphragm',
      'Bluetooth': '5.3 Multipoint connection'
    },
    compatibleDevices: ['Universal Bluetooth (Phones, Laptops, TV, Consoles)'],
    colors: [
      { name: 'Midnight Black', colorHex: '#0B1E3D' },
      { name: 'All-White', colorHex: '#FFFFFF' },
      { name: 'Navy Blue', colorHex: '#1E3A8A' }
    ],
    models: ['Space Q45 Over-Ear'],
    tags: ['anker', 'soundcore', 'headphones', 'anc', 'hi-res'],
    warranty: '18-Month Limited Warranty'
  },
  {
    id: 'belkin-soundform-flow-noise-cancelling',
    name: 'SoundForm Flow True Wireless ANC Earbuds',
    brand: 'Belkin',
    category: 'audio',
    categoryName: 'Audio',
    price: 49.99,
    wasPrice: 69.99,
    rating: 4.5,
    reviewCount: 290,
    badge: 'sale',
    badgeText: '-28%',
    sku: 'BEL-SFF-ANC-TWS',
    inStock: true,
    stockCount: 30,
    iconType: 'audio',
    description: 'Feedforward ANC with Hear-Thru mode, 12mm neodymium drivers, and Qi wireless charging case.',
    longDescription: 'Crystal-clear call quality powered by Dual Beamforming microphone technology in each earbud. IPX5 sweat and splash resistance.',
    features: [
      'Feedforward Active Noise Cancellation',
      'Hear-Thru ambient sound mode',
      '31 hours total playtime (7h buds + 24h case)',
      'Qi wireless charging case'
    ],
    specs: {
      'Drivers': '12mm Neodymium',
      'Waterproof': 'IPX5',
      'Playtime': '31h Total'
    },
    compatibleDevices: ['iOS, Android, Bluetooth audio'],
    colors: [
      { name: 'Charcoal Black', colorHex: '#1E293B' },
      { name: 'Snow White', colorHex: '#F8FAFC' }
    ],
    models: ['SoundForm Flow ANC'],
    tags: ['belkin', 'earbuds', 'anc', 'wireless-audio'],
    warranty: '1-Year Warranty'
  },

  // ========================================================
  // CAR ACCESSORIES (3 items)
  // ========================================================
  {
    id: 'samsung-wireless-car-mount-charger-15w',
    name: 'Wireless Car Mount Charger 15W Auto-Clamp',
    brand: 'Samsung',
    category: 'car-accessories',
    categoryName: 'Car Accessories',
    price: 44.99,
    wasPrice: 54.99,
    rating: 4.6,
    reviewCount: 198,
    badge: 'sale',
    badgeText: '-18%',
    sku: 'SAM-CAR-15W-MNT',
    inStock: true,
    stockCount: 54,
    iconType: 'mount',
    description: 'Auto-clamping fast wireless car charger with 360-degree ball joint rotation and secure air vent & dashboard mounting clips.',
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
    id: 'esr-halolock-cryoboost-car-charger',
    name: 'HaloLock MagSafe Car Mount with CryoBoost Fan',
    brand: 'ESR',
    category: 'car-accessories',
    categoryName: 'Car Accessories',
    price: 49.99,
    wasPrice: null,
    rating: 4.9,
    reviewCount: 680,
    badge: 'best',
    badgeText: 'TOP PICK',
    sku: 'ESR-CRYO-MAG-CAR',
    inStock: true,
    stockCount: 46,
    iconType: 'mount',
    description: 'CryoBoost active phone-cooling fan keeps iPhone cool while charging at maximum MagSafe speed during GPS navigation in hot sunlight.',
    longDescription: 'Standard wireless chargers throttle speed when phones heat up. The CryoBoost built-in fan prevents phone overheating and charges over 4.5 hours faster.',
    features: [
      'Active CryoBoost cooling fan prevents thermal throttling',
      '1,400g powerful magnetic hold stays locked over speed bumps',
      'Secure vent hook design locks onto horizontal & vertical vents',
      'Adjustable ball joint for optimal viewing angle'
    ],
    specs: {
      'Cooling': 'High-efficiency whisper fan',
      'Magnetic Force': '1,400g hold',
      'Fast Charging': '15W MagSafe Fast Charge'
    },
    compatibleDevices: ['iPhone 12-17 with MagSafe', 'MagSafe Phone Cases'],
    colors: [
      { name: 'Cryo Frost Arctic Black', colorHex: '#0B1E3D' }
    ],
    models: ['CryoBoost Vent Mount'],
    tags: ['esr', 'cryoboost', 'car-mount', 'magsafe', 'cooling-fan'],
    warranty: '1-Year Limited Warranty'
  },
  {
    id: 'baseus-65w-dual-metal-car-charger',
    name: '65W Dual USB-C Metal Fast Car Charger',
    brand: 'Baseus',
    category: 'car-accessories',
    categoryName: 'Car Accessories',
    price: 19.99,
    wasPrice: 24.99,
    rating: 4.8,
    reviewCount: 410,
    badge: 'sale',
    badgeText: '-20%',
    sku: 'BAS-65W-MET-CAR',
    inStock: true,
    stockCount: 80,
    iconType: 'charger',
    description: 'Anodized aluminum alloy 12V/24V cigarette lighter adapter with 45W USB-C + 20W USB-A dual fast charging.',
    longDescription: 'Charge your laptop and phone simultaneously on the road. Soft ambient circular LED ring helps locate ports in dark night driving.',
    features: [
      '65W maximum output across dual ports',
      'Premium fireproof anodized aluminum body',
      'Multi-voltage 12V-24V compatible with cars, SUVs, and trucks',
      'Soft ice-blue LED indicator ring'
    ],
    specs: {
      'Outputs': 'USB-C (45W PD) + USB-A (20W QC)',
      'Input': 'DC 12V-24V',
      'Material': 'Aluminum Alloy'
    },
    compatibleDevices: ['Universal (Laptops, Tablets, iPhones, Androids)'],
    colors: [
      { name: 'Space Gray Metallic', colorHex: '#334155' }
    ],
    models: ['65W Dual Port Car Adapter'],
    tags: ['baseus', 'car-charger', '65w', 'usb-c'],
    warranty: '1-Year Warranty'
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

export const DEVICE_FAMILIES: DeviceFamily[] = [
  {
    id: 'iphone',
    name: 'Apple iPhone',
    shortName: 'iPhone',
    brand: 'Apple',
    tagline: 'MagSafe cases, ultra-tough screen glass & fast charging',
    description: 'Precision-engineered accessories for Apple iPhone. Featuring ultra-fast MagSafe wireless compatibility, 9H tempered glass, and military drop-tested shock protection.',
    color: '#0B63F6',
    accentColor: '#EBF3FF',
    models: [
      'iPhone 16 Pro Max',
      'iPhone 16 Pro',
      'iPhone 16 Plus',
      'iPhone 16',
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 15',
      'iPhone 14 Pro Max',
      'iPhone 14',
      'iPhone 13'
    ]
  },
  {
    id: 'samsung-galaxy',
    name: 'Samsung Galaxy',
    shortName: 'Galaxy',
    brand: 'Samsung',
    tagline: 'Super Fast Charging 2.0, curved glass & rugged armor',
    description: 'High performance accessories built for Samsung Galaxy flagships. Featuring 45W PPS Super Fast Charging blocks, edge-to-edge screen shields, and S-Pen compatible rugged cases.',
    color: '#2563EB',
    accentColor: '#EFF6FF',
    models: [
      'Galaxy S25 Ultra',
      'Galaxy S25+',
      'Galaxy S25',
      'Galaxy S24 Ultra',
      'Galaxy S24+',
      'Galaxy S24',
      'Galaxy Z Fold6',
      'Galaxy Z Flip6',
      'Galaxy S23 Ultra',
      'Galaxy S23'
    ]
  },
  {
    id: 'google-pixel',
    name: 'Google Pixel',
    shortName: 'Pixel',
    brand: 'Google',
    tagline: 'Camera bar protection, 30W PD fast charge & matte shields',
    description: 'Designed specifically for Google Pixel devices. Featuring camera visor impact armor, non-yellowing crystal clear cases, and high-speed Power Delivery fast chargers.',
    color: '#EA4335',
    accentColor: '#FEF2F2',
    models: [
      'Pixel 9 Pro XL',
      'Pixel 9 Pro',
      'Pixel 9',
      'Pixel 8 Pro',
      'Pixel 8',
      'Pixel 8a',
      'Pixel 7 Pro',
      'Pixel 7'
    ]
  }
];

export const DEVICE_MODELS = [
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'iPhone 16',
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15',
  'Galaxy S25 Ultra',
  'Galaxy S25',
  'Galaxy S24 Ultra',
  'Galaxy S24',
  'Galaxy Z Fold6',
  'Pixel 9 Pro XL',
  'Pixel 9 Pro',
  'Pixel 9',
  'Pixel 8 Pro'
];

export const PROMO_CODES = [
  { code: 'SAVE10', discountAmount: 10.00, description: '$10 OFF on orders over $40' },
  { code: 'WELCOME15', discountPercent: 15, description: '15% OFF for new VIP customers' },
  { code: 'FREESHIP', discountAmount: 6.99, description: 'Free Express Shipping discount' }
];
