import { supabase } from './supabase';
import { Product } from '@/types/product';
import { PromotionCampaign, PromoCode } from '@/types/admin';
import { PRODUCTS, PROMO_CODES as DEFAULT_PROMO_CODES } from '@/data/products';

// Mapping from DB row to Product object
export function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    categoryName: row.category_name,
    price: Number(row.price),
    wasPrice: row.was_price ? Number(row.was_price) : undefined,
    rating: Number(row.rating || 5.0),
    reviewCount: Number(row.review_count || 0),
    badge: row.badge || undefined,
    badgeText: row.badge_text || undefined,
    sku: row.sku,
    inStock: Boolean(row.in_stock),
    stockCount: row.stock_count !== null ? Number(row.stock_count) : 20,
    iconType: row.icon_type || 'case',
    imageUrl: row.image_url || undefined,
    galleryImages: Array.isArray(row.gallery_images) ? row.gallery_images : [],
    description: row.description || '',
    longDescription: row.long_description || undefined,
    features: Array.isArray(row.features) ? row.features : [],
    specs: typeof row.specs === 'object' && row.specs !== null ? row.specs : {},
    compatibleDevices: Array.isArray(row.compatible_devices) ? row.compatible_devices : [],
    colors: Array.isArray(row.colors) ? row.colors : [],
    models: Array.isArray(row.models) ? row.models : [],
    tags: Array.isArray(row.tags) ? row.tags : [],
    warranty: row.warranty || '1 Year Limited Warranty',
    reviews: Array.isArray(row.reviews) ? row.reviews : []
  };
}

// Mapping from Product object to DB row
export function mapProductToRow(product: Product): any {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    category_name: product.categoryName,
    price: product.price,
    was_price: product.wasPrice ?? null,
    rating: product.rating,
    review_count: product.reviewCount,
    badge: product.badge ?? null,
    badge_text: product.badgeText ?? null,
    sku: product.sku,
    in_stock: product.inStock,
    stock_count: product.stockCount ?? 20,
    icon_type: product.iconType,
    image_url: product.imageUrl ?? null,
    gallery_images: product.galleryImages ?? [],
    description: product.description,
    long_description: product.longDescription ?? null,
    features: product.features ?? [],
    specs: product.specs ?? {},
    compatible_devices: product.compatibleDevices ?? [],
    colors: product.colors ?? [],
    models: product.models ?? [],
    tags: product.tags ?? [],
    warranty: product.warranty ?? '1 Year Limited Warranty',
    reviews: product.reviews ?? [],
    updated_at: new Date().toISOString()
  };
}

// Mapping from DB row to PromotionCampaign object
export function mapRowToCampaign(row: any): PromotionCampaign {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    subtitle: row.subtitle,
    badgeText: row.badge_text,
    discountPercent: row.discount_percent ? Number(row.discount_percent) : undefined,
    discountAmount: row.discount_amount ? Number(row.discount_amount) : undefined,
    gradientTheme: row.gradient_theme || 'blue-purple',
    startDate: row.start_date,
    endDate: row.end_date,
    isActive: Boolean(row.is_active),
    targetCategory: row.target_category || undefined,
    linkUrl: row.link_url,
    bannerImageUrl: row.banner_image_url || undefined,
    featuredProductIds: Array.isArray(row.featured_product_ids) ? row.featured_product_ids : []
  };
}

// Mapping from PromotionCampaign object to DB row
export function mapCampaignToRow(c: PromotionCampaign): any {
  return {
    id: c.id,
    name: c.name,
    title: c.title,
    subtitle: c.subtitle,
    badge_text: c.badgeText,
    discount_percent: c.discountPercent ?? null,
    discount_amount: c.discountAmount ?? null,
    gradient_theme: c.gradientTheme,
    start_date: c.startDate,
    end_date: c.endDate,
    is_active: c.isActive,
    target_category: c.targetCategory ?? null,
    link_url: c.linkUrl,
    banner_image_url: c.bannerImageUrl ?? null,
    featured_product_ids: c.featuredProductIds ?? [],
    updated_at: new Date().toISOString()
  };
}

// Mapping from DB row to PromoCode object
export function mapRowToPromoCode(row: any): PromoCode {
  return {
    code: row.code,
    discountPercent: row.discount_percent ? Number(row.discount_percent) : undefined,
    discountAmount: row.discount_amount ? Number(row.discount_amount) : undefined,
    minSpend: row.min_spend ? Number(row.min_spend) : 0,
    description: row.description || '',
    isActive: Boolean(row.is_active),
    usedCount: Number(row.used_count || 0),
    maxUses: row.max_uses ? Number(row.max_uses) : undefined,
    expiryDate: row.expiry_date || undefined
  };
}

// Mapping from PromoCode object to DB row
export function mapPromoCodeToRow(p: PromoCode): any {
  return {
    code: p.code,
    discount_percent: p.discountPercent ?? null,
    discount_amount: p.discountAmount ?? null,
    min_spend: p.minSpend ?? 0,
    description: p.description,
    is_active: p.isActive,
    used_count: p.usedCount ?? 0,
    max_uses: p.maxUses ?? null,
    expiry_date: p.expiryDate ?? null,
    updated_at: new Date().toISOString()
  };
}

// ----------------------------------------------------
// DATABASE SERVICES
// ----------------------------------------------------

export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  tablesExist: boolean;
  message: string;
}> {
  try {
    const { data, error } = await supabase.from('products').select('id').limit(1);
    if (error) {
      if (error.code === 'PGRST205' || error.message.includes('Could not find the table')) {
        return {
          connected: true,
          tablesExist: false,
          message: 'Connected to Supabase! Tables need to be created (run supabase/schema.sql).'
        };
      }
      return {
        connected: false,
        tablesExist: false,
        message: `Supabase Error: ${error.message}`
      };
    }
    return {
      connected: true,
      tablesExist: true,
      message: 'Connected to Supabase and tables are ready.'
    };
  } catch (err: any) {
    return {
      connected: false,
      tablesExist: false,
      message: err?.message || 'Failed to reach Supabase'
    };
  }
}

// Products
export async function fetchProductsFromDb(): Promise<Product[] | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;
    return data.map(mapRowToProduct);
  } catch {
    return null;
  }
}

export async function upsertProductInDb(product: Product): Promise<boolean> {
  try {
    const row = mapProductToRow(product);
    const { error } = await supabase.from('products').upsert(row, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
}

export async function deleteProductFromDb(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

export async function seedProductsToDb(productsList: Product[]): Promise<{ success: boolean; count: number }> {
  try {
    const rows = productsList.map(mapProductToRow);
    const { error } = await supabase.from('products').upsert(rows, { onConflict: 'id' });
    if (error) {
      console.error('Failed to seed products:', error);
      return { success: false, count: 0 };
    }
    return { success: true, count: rows.length };
  } catch (err) {
    console.error('Error seeding products:', err);
    return { success: false, count: 0 };
  }
}

// Campaigns
export async function fetchCampaignsFromDb(): Promise<PromotionCampaign[] | null> {
  try {
    const { data, error } = await supabase
      .from('promotion_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;
    return data.map(mapRowToCampaign);
  } catch {
    return null;
  }
}

export async function upsertCampaignInDb(campaign: PromotionCampaign): Promise<boolean> {
  try {
    const row = mapCampaignToRow(campaign);
    const { error } = await supabase.from('promotion_campaigns').upsert(row, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
}

export async function deleteCampaignFromDb(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('promotion_campaigns').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

// Promo Codes
export async function fetchPromoCodesFromDb(): Promise<PromoCode[] | null> {
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;
    return data.map(mapRowToPromoCode);
  } catch {
    return null;
  }
}

export async function upsertPromoCodeInDb(promo: PromoCode): Promise<boolean> {
  try {
    const row = mapPromoCodeToRow(promo);
    const { error } = await supabase.from('promo_codes').upsert(row, { onConflict: 'code' });
    return !error;
  } catch {
    return false;
  }
}

export async function deletePromoCodeFromDb(code: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('promo_codes').delete().eq('code', code);
    return !error;
  } catch {
    return false;
  }
}

// Orders
export async function createOrderInDb(orderData: {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress: any;
  items: any[];
  subtotal: number;
  discount?: number;
  shipping?: number;
  tax?: number;
  total: number;
  promoCode?: string;
  paymentMethod?: string;
}): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const row = {
      order_number: orderData.orderNumber,
      customer_email: orderData.customerEmail,
      customer_name: orderData.customerName,
      customer_phone: orderData.customerPhone || null,
      shipping_address: orderData.shippingAddress,
      items: orderData.items,
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      shipping: orderData.shipping || 0,
      tax: orderData.tax || 0,
      total: orderData.total,
      promo_code: orderData.promoCode || null,
      payment_method: orderData.paymentMethod || 'credit_card',
      status: 'pending'
    };

    const { data, error } = await supabase.from('orders').insert([row]).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

// Newsletter
export async function subscribeNewsletterInDb(email: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, subscribed_at: new Date().toISOString() }, { onConflict: 'email' });
    return !error;
  } catch {
    return false;
  }
}

// Contact Messages
export async function sendContactMessageInDb(message: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  try {
    const { error } = await supabase.from('contact_messages').insert([message]);
    return !error;
  } catch {
    return false;
  }
}
