const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  'https://argkashxfnbqjoqonyfh.supabase.co',
  'sb_publishable_vPWE81CyLXQQNqqJRRP_wQ_Ps7r17ee'
);

// Read products.ts and extract the raw array or objects
const content = fs.readFileSync(path.join(__dirname, '../src/data/products.ts'), 'utf8');

// We can compile products.ts with typescript module
const ts = require('typescript');
const jsCode = ts.transpile(content, {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.CommonJS
});

const sandboxModule = { exports: {} };
const fn = new Function('module', 'exports', 'require', jsCode);
fn(sandboxModule, sandboxModule.exports, require);

const { PRODUCTS, PROMO_CODES } = sandboxModule.exports;

async function runSeed() {
  console.log(`Starting Supabase seed with ${PRODUCTS.length} products...`);

  const productRows = PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    category_name: p.categoryName,
    price: p.price,
    was_price: p.wasPrice || null,
    rating: p.rating || 5.0,
    review_count: p.reviewCount || 0,
    badge: p.badge || null,
    badge_text: p.badgeText || null,
    sku: p.sku,
    in_stock: p.inStock,
    stock_count: p.stockCount || 20,
    icon_type: p.iconType || 'case',
    image_url: p.imageUrl || null,
    gallery_images: p.galleryImages || [],
    description: p.description || '',
    long_description: p.longDescription || null,
    features: p.features || [],
    specs: p.specs || {},
    compatible_devices: p.compatibleDevices || [],
    colors: p.colors || [],
    models: p.models || [],
    tags: p.tags || [],
    warranty: p.warranty || '1 Year Limited Warranty',
    reviews: p.reviews || []
  }));

  const { data: pData, error: pErr } = await supabase
    .from('products')
    .upsert(productRows, { onConflict: 'id' });

  if (pErr) {
    console.error('Products seed error:', pErr);
  } else {
    console.log(`✓ Seeded ${productRows.length} products successfully into Supabase!`);
  }

  const promoRows = (PROMO_CODES || []).map((p) => ({
    code: p.code,
    discount_percent: p.discountPercent || null,
    discount_amount: p.discountAmount || null,
    min_spend: p.code === 'SAVE10' ? 40 : 0,
    description: p.description || '',
    is_active: true,
    used_count: 32
  }));

  const { error: prErr } = await supabase
    .from('promo_codes')
    .upsert(promoRows, { onConflict: 'code' });

  if (prErr) {
    console.error('Promo codes seed error:', prErr);
  } else {
    console.log(`✓ Seeded ${promoRows.length} promo codes successfully!`);
  }

  const campaigns = [
    {
      id: 'camp-spring-fast-charge',
      name: 'GaN Fast Charging Essentials Sale',
      title: 'SUPERCHARGE YOUR WORKFLOW',
      subtitle: 'Save up to 30% on flagship GaN III wall chargers, braided 240W cables, and MagSafe power stations.',
      badge_text: 'FLASH DEAL · 30% OFF',
      discount_percent: 30,
      gradient_theme: 'blue-purple',
      start_date: '2026-03-01',
      end_date: '2026-04-15',
      is_active: true,
      target_category: 'chargers',
      link_url: '/shop/chargers'
    },
    {
      id: 'camp-magsafe-titanium',
      name: 'MagSafe Titanium Armor Showcase',
      title: 'SNAP ON. LOCK IN. STAND OUT.',
      subtitle: 'Military-grade drop defense paired with magnetic versatility. Built exclusively for iPhone 16 & 17 Series.',
      badge_text: 'HOT COLLECTION',
      discount_percent: 20,
      gradient_theme: 'violet-magsafe',
      start_date: '2026-03-10',
      end_date: '2026-05-01',
      is_active: true,
      target_category: 'phone-cases',
      link_url: '/shop/phone-cases'
    },
    {
      id: 'camp-clearance-weekend',
      name: 'Canadian Spring Roadtrip Tech',
      title: 'CONNECT ANYWHERE ACROSS CANADA',
      subtitle: 'Auto-clamping fast wireless car mounts, heavy-duty metal adapters, and road-ready accessories.',
      badge_text: 'ROAD TRIP READY',
      discount_percent: 18,
      gradient_theme: 'orange-pink',
      start_date: '2026-03-15',
      end_date: '2026-04-30',
      is_active: true,
      target_category: 'car-accessories',
      link_url: '/shop/car-accessories'
    }
  ];

  const { error: cErr } = await supabase
    .from('promotion_campaigns')
    .upsert(campaigns, { onConflict: 'id' });

  if (cErr) {
    console.error('Campaigns seed error:', cErr);
  } else {
    console.log(`✓ Seeded ${campaigns.length} promotion campaigns successfully!`);
  }
}

runSeed();
