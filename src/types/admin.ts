export type GradientTheme = 
  | 'blue-purple'
  | 'orange-pink'
  | 'emerald-teal'
  | 'cyber-dark'
  | 'violet-magsafe'
  | 'crimson-fire';

export interface PromotionCampaign {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  badgeText: string;
  discountPercent?: number;
  discountAmount?: number;
  gradientTheme: GradientTheme;
  startDate: string;
  endDate: string;
  isActive: boolean;
  targetCategory?: string;
  linkUrl: string;
  bannerImageUrl?: string;
  featuredProductIds?: string[];
}

export interface PromoCode {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend?: number;
  description: string;
  isActive: boolean;
  usedCount: number;
  maxUses?: number;
  expiryDate?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  model?: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  promoCode?: string;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
}

export interface CustomerInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

export interface StoreActivityEvent {
  id: string;
  type: 'order' | 'stock' | 'campaign' | 'promo' | 'system';
  title: string;
  description: string;
  timestamp: string;
  badgeColor?: string;
}

export interface AdminStats {
  totalProducts: number;
  totalInventoryValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  activeCampaignsCount: number;
  activePromoCodesCount: number;
  avgDiscountPercent: number;
  totalRevenue: number;
  totalOrdersCount: number;
  pendingOrdersCount: number;
}
