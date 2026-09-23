-- ==============================================================================
-- CELLCENTRAL / CELTRONICS E-COMMERCE SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this SQL in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  category_name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  was_price NUMERIC(10, 2),
  rating NUMERIC(3, 2) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  badge TEXT,
  badge_text TEXT,
  sku TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  stock_count INTEGER DEFAULT 20,
  icon_type TEXT DEFAULT 'case',
  image_url TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  description TEXT NOT NULL,
  long_description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  specs JSONB DEFAULT '{}'::jsonb,
  compatible_devices JSONB DEFAULT '[]'::jsonb,
  colors JSONB DEFAULT '[]'::jsonb,
  models JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  warranty TEXT DEFAULT '1 Year Limited Warranty',
  reviews JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROMOTION CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS public.promotion_campaigns (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  badge_text TEXT NOT NULL,
  discount_percent INTEGER,
  discount_amount NUMERIC(10, 2),
  gradient_theme TEXT DEFAULT 'blue-purple',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  target_category TEXT,
  link_url TEXT NOT NULL,
  banner_image_url TEXT,
  featured_product_ids JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROMO CODES TABLE
CREATE TABLE IF NOT EXISTS public.promo_codes (
  code TEXT PRIMARY KEY,
  discount_percent INTEGER,
  discount_amount NUMERIC(10, 2),
  min_spend NUMERIC(10, 2) DEFAULT 0,
  description TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  used_count INTEGER DEFAULT 0,
  max_uses INTEGER,
  expiry_date DATE,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0,
  shipping NUMERIC(10, 2) DEFAULT 0,
  tax NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  promo_code TEXT,
  payment_method TEXT DEFAULT 'credit_card',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- 6. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & SET PERMISSIVE POLICIES FOR STORE DEMO
-- ==============================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public reads and writes for e-commerce demo
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Insert Products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Public Delete Products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Public Read Campaigns" ON public.promotion_campaigns FOR SELECT USING (true);
CREATE POLICY "Public Insert Campaigns" ON public.promotion_campaigns FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Campaigns" ON public.promotion_campaigns FOR UPDATE USING (true);
CREATE POLICY "Public Delete Campaigns" ON public.promotion_campaigns FOR DELETE USING (true);

CREATE POLICY "Public Read PromoCodes" ON public.promo_codes FOR SELECT USING (true);
CREATE POLICY "Public Insert PromoCodes" ON public.promo_codes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update PromoCodes" ON public.promo_codes FOR UPDATE USING (true);
CREATE POLICY "Public Delete PromoCodes" ON public.promo_codes FOR DELETE USING (true);

CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Orders" ON public.orders FOR SELECT USING (true);

CREATE POLICY "Public Insert Newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Newsletter" ON public.newsletter_subscribers FOR SELECT USING (true);

CREATE POLICY "Public Insert Contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Contact" ON public.contact_messages FOR SELECT USING (true);

-- ==============================================================================
-- 7. SUPABASE STORAGE BUCKET FOR PRODUCT & CATEGORY PHOTOS
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies for public uploads, updates, reads, and deletes
CREATE POLICY "Public Storage Read" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Public Storage Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Public Storage Update" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images');
CREATE POLICY "Public Storage Delete" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');

