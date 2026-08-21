'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, ProductVariant } from '@/types/product';
import { CartItem, CouponDiscount } from '@/types/cart';
import { PROMO_CODES } from '@/data/products';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  isFreeShipping: boolean;
  appliedCoupon: CouponDiscount | null;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, quantity?: number, selectedColor?: ProductVariant, selectedModel?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 49.00;
const STANDARD_SHIPPING_RATE = 6.99;
const TAX_RATE = 0.13; // 13% average HST/GST estimate

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponDiscount | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cellcentral_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem('cellcentral_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('cellcentral_cart', JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem('cellcentral_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('cellcentral_coupon');
      }
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items, appliedCoupon, isLoaded]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback((
    product: Product,
    quantity: number = 1,
    selectedColor?: ProductVariant,
    selectedModel?: string
  ) => {
    if (!product.inStock) {
      showToast('Product Out of Stock', `${product.name} is currently unavailable.`, 'warning');
      return;
    }

    const color = selectedColor || product.colors[0];
    const model = selectedModel || product.models[0] || 'Default';
    const itemId = `${product.id}-${color?.name || 'default'}-${model}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { id: itemId, product, quantity, selectedColor: color, selectedModel: model }];
      }
    });

    showToast('Added to Cart', `${product.name} (${quantity}x) added to your cart.`, 'success');
    setIsDrawerOpen(true);
  }, [showToast]);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === itemId);
      if (item) {
        showToast('Item Removed', `${item.product.name} removed from your cart.`, 'info');
      }
      return prev.filter((i) => i.id !== itemId);
    });
  }, [showToast]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  }, [removeItem]);

  const applyCoupon = useCallback((code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    const found = PROMO_CODES.find((c) => c.code.toUpperCase() === trimmed);
    if (found) {
      setAppliedCoupon(found);
      showToast('Coupon Applied!', `${found.code}: ${found.description}`, 'success');
      return true;
    } else {
      showToast('Invalid Promo Code', 'Please check the code and try again.', 'error');
      return false;
    }
  }, [showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Promo code discount has been removed.', 'info');
  }, [showToast]);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountAmount) {
      discount = Math.min(appliedCoupon.discountAmount, subtotal);
    }
  }

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping = items.length === 0 ? 0 : (isFreeShipping ? 0 : STANDARD_SHIPPING_RATE);
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = items.length === 0 ? 0 : taxableAmount * TAX_RATE;
  const total = Math.max(0, taxableAmount + shipping + tax);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        isFreeShipping,
        appliedCoupon,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addItem,
        removeItem,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
