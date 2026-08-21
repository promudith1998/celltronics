import { Product, ProductVariant } from './product';

export interface CartItem {
  id: string; // Unique cart item ID (productId + selectedModel + selectedColor)
  product: Product;
  quantity: number;
  selectedColor?: ProductVariant;
  selectedModel?: string;
}

export interface CouponDiscount {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  description: string;
}
