export type ProductCategory = 
  | 'phone-cases'
  | 'screen-protectors'
  | 'chargers'
  | 'cables'
  | 'power-banks'
  | 'audio'
  | 'more-accessories'
  | 'car-accessories';

export type ProductBadge = 'sale' | 'new' | 'best' | 'limited' | 'out';

export interface ProductVariant {
  name: string;
  colorHex?: string;
  sku?: string;
  inStock?: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  location?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  wasPrice?: number | null;
  rating: number;
  reviewCount: number;
  badge?: ProductBadge | null;
  badgeText?: string;
  sku: string;
  inStock: boolean;
  stockCount?: number;
  iconType: 'case' | 'charger' | 'cable' | 'power' | 'audio' | 'screen' | 'mount';
  imageUrl?: string;
  galleryImages?: string[];
  description: string;
  longDescription?: string;
  features: string[];
  specs: { [key: string]: string };
  compatibleDevices: string[];
  colors: ProductVariant[];
  models: string[];
  tags: string[];
  warranty: string;
  reviews?: ProductReview[];
}

export interface DeviceFamily {
  id: string;
  name: string;
  shortName: string;
  brand: string;
  tagline: string;
  description: string;
  color: string;
  accentColor: string;
  models: string[];
}

export interface WarrantyRegistrationPayload {
  fullName: string;
  email: string;
  phone: string;
  postalCode: string;
  purchaseChannel: 'online' | 'retail_partner' | 'amazon' | 'other';
  retailerName?: string;
  storeLocation?: string;
  productCategory: string;
  productName: string;
  modelSku?: string;
  purchaseDate: string;
  orderOrReceiptNumber: string;
  serialNumber?: string;
}
