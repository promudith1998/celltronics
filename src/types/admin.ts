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

export interface AdminStats {
  totalProducts: number;
  totalInventoryValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  activeCampaignsCount: number;
  activePromoCodesCount: number;
  avgDiscountPercent: number;
}
