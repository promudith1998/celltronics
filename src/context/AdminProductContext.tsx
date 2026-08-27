'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, ProductCategory } from '@/types/product';
import { PromotionCampaign, PromoCode, AdminStats } from '@/types/admin';
import { PRODUCTS, PROMO_CODES as DEFAULT_PROMO_CODES } from '@/data/products';

const INITIAL_CAMPAIGNS: PromotionCampaign[] = [
  {
    id: 'camp-spring-fast-charge',
    name: 'GaN Fast Charging Essentials Sale',
    title: 'SUPERCHARGE YOUR WORKFLOW',
    subtitle: 'Save up to 30% on flagship GaN III wall chargers, braided 240W cables, and MagSafe power stations.',
    badgeText: 'FLASH DEAL · 30% OFF',
    discountPercent: 30,
    gradientTheme: 'blue-purple',
    startDate: '2026-03-01',
    endDate: '2026-04-15',
    isActive: true,
    targetCategory: 'chargers',
    linkUrl: '/shop/chargers'
  },
  {
    id: 'camp-magsafe-titanium',
    name: 'MagSafe Titanium Armor Showcase',
    title: 'SNAP ON. LOCK IN. STAND OUT.',
    subtitle: 'Military-grade drop defense paired with magnetic versatility. Built exclusively for iPhone 16 & 17 Series.',
    badgeText: 'HOT COLLECTION',
    discountPercent: 20,
    gradientTheme: 'violet-magsafe',
    startDate: '2026-03-10',
    endDate: '2026-05-01',
    isActive: true,
    targetCategory: 'phone-cases',
    linkUrl: '/shop/phone-cases'
  },
  {
    id: 'camp-clearance-weekend',
    name: 'Canadian Spring Roadtrip Tech',
    title: 'CONNECT ANYWHERE ACROSS CANADA',
    subtitle: 'Auto-clamping fast wireless car mounts, heavy-duty metal adapters, and road-ready accessories.',
    badgeText: 'ROAD TRIP READY',
    discountPercent: 18,
    gradientTheme: 'orange-pink',
    startDate: '2026-03-15',
    endDate: '2026-04-30',
    isActive: true,
    targetCategory: 'car-accessories',
    linkUrl: '/shop/car-accessories'
  }
];

const INITIAL_PROMO_CODES: PromoCode[] = DEFAULT_PROMO_CODES.map((p) => ({
  code: p.code,
  discountPercent: p.discountPercent,
  discountAmount: p.discountAmount,
  minSpend: p.code === 'SAVE10' ? 40 : 0,
  description: p.description,
  isActive: true,
  usedCount: Math.floor(Math.random() * 85) + 12
}));

interface AdminProductContextType {
  products: Product[];
  campaigns: PromotionCampaign[];
  promoCodes: PromoCode[];
  stats: AdminStats;
  isLoaded: boolean;
  
  // Product Operations
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  bulkApplyCategoryDiscount: (category: string, discountPercent: number) => void;
  
  // Campaign Operations
  addCampaign: (campaign: Omit<PromotionCampaign, 'id'>) => PromotionCampaign;
  updateCampaign: (id: string, updates: Partial<PromotionCampaign>) => void;
  deleteCampaign: (id: string) => void;
  toggleCampaign: (id: string) => void;
  
  // Promo Code Operations
  addPromoCode: (promo: PromoCode) => void;
  updatePromoCode: (code: string, updates: Partial<PromoCode>) => void;
  deletePromoCode: (code: string) => void;
  togglePromoCode: (code: string) => void;
  validatePromoCode: (code: string, subtotal: number) => { valid: boolean; discountAmount: number; message: string; promo?: PromoCode };
  
  // Data Backup & Recovery
  resetToDefaults: () => void;
  exportBackupJSON: () => string;
  importBackupJSON: (jsonStr: string) => boolean;
}

const AdminProductContext = createContext<AdminProductContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'cellcentral_products_v2',
  CAMPAIGNS: 'cellcentral_campaigns_v2',
  PROMOS: 'cellcentral_promocodes_v2'
};

export const AdminProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [campaigns, setCampaigns] = useState<PromotionCampaign[]>(INITIAL_CAMPAIGNS);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(INITIAL_PROMO_CODES);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }

      const storedCampaigns = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
      if (storedCampaigns) {
        setCampaigns(JSON.parse(storedCampaigns));
      }

      const storedPromos = localStorage.getItem(STORAGE_KEYS.PROMOS);
      if (storedPromos) {
        setPromoCodes(JSON.parse(storedPromos));
      }
    } catch (e) {
      console.error('Failed to load admin stored data:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }
  }, [products, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    }
  }, [campaigns, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promoCodes));
    }
  }, [promoCodes, isLoaded]);

  // Compute live admin statistics
  const stats: AdminStats = useMemo(() => {
    const totalProducts = products.length;
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * (p.stockCount || 20)), 0);
    const lowStockCount = products.filter((p) => p.inStock && (p.stockCount ?? 20) <= 25).length;
    const outOfStockCount = products.filter((p) => !p.inStock || p.badge === 'out').length;
    const activeCampaignsCount = campaigns.filter((c) => c.isActive).length;
    const activePromoCodesCount = promoCodes.filter((p) => p.isActive).length;

    // Discount percentage average
    const discountedProducts = products.filter((p) => p.wasPrice && p.wasPrice > p.price);
    const avgDiscountPercent = discountedProducts.length
      ? Math.round(
          discountedProducts.reduce((acc, p) => acc + (((p.wasPrice! - p.price) / p.wasPrice!) * 100), 0) /
            discountedProducts.length
        )
      : 0;

    return {
      totalProducts,
      totalInventoryValue,
      lowStockCount,
      outOfStockCount,
      activeCampaignsCount,
      activePromoCodesCount,
      avgDiscountPercent
    };
  }, [products, campaigns, promoCodes]);

  // ----------------------------------------------------
  // Product Operations
  // ----------------------------------------------------
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const slugId = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `prod-${Date.now()}`;

    const newProduct: Product = {
      ...productData,
      id: `${slugId}-${Date.now().toString().slice(-4)}`
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, ...updates };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const bulkApplyCategoryDiscount = (category: string, discountPercent: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (category === 'all' || p.category === category) {
          const originalPrice = p.wasPrice || p.price;
          const newPrice = Math.max(1, Number((originalPrice * (1 - discountPercent / 100)).toFixed(2)));
          return {
            ...p,
            wasPrice: originalPrice,
            price: newPrice,
            badge: discountPercent > 0 ? 'sale' : p.badge,
            badgeText: discountPercent > 0 ? `-${discountPercent}%` : p.badgeText
          };
        }
        return p;
      })
    );
  };

  // ----------------------------------------------------
  // Campaign Operations
  // ----------------------------------------------------
  const addCampaign = (campaignData: Omit<PromotionCampaign, 'id'>): PromotionCampaign => {
    const newCamp: PromotionCampaign = {
      ...campaignData,
      id: `camp-${Date.now().toString()}`
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    return newCamp;
  };

  const updateCampaign = (id: string, updates: Partial<PromotionCampaign>) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleCampaign = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // ----------------------------------------------------
  // Promo Code Operations
  // ----------------------------------------------------
  const addPromoCode = (promo: PromoCode) => {
    const normalizedCode = promo.code.toUpperCase().trim();
    setPromoCodes((prev) => {
      const filtered = prev.filter((p) => p.code.toUpperCase() !== normalizedCode);
      return [{ ...promo, code: normalizedCode }, ...filtered];
    });
  };

  const updatePromoCode = (code: string, updates: Partial<PromoCode>) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.code.toUpperCase() === code.toUpperCase() ? { ...p, ...updates } : p))
    );
  };

  const deletePromoCode = (code: string) => {
    setPromoCodes((prev) => prev.filter((p) => p.code.toUpperCase() !== code.toUpperCase()));
  };

  const togglePromoCode = (code: string) => {
    setPromoCodes((prev) =>
      prev.map((p) =>
        p.code.toUpperCase() === code.toUpperCase() ? { ...p, isActive: !p.isActive } : p
      )
    );
  };

  const validatePromoCode = (
    code: string,
    subtotal: number
  ): { valid: boolean; discountAmount: number; message: string; promo?: PromoCode } => {
    const cleanCode = code.toUpperCase().trim();
    const found = promoCodes.find((p) => p.code.toUpperCase() === cleanCode);

    if (!found) {
      return { valid: false, discountAmount: 0, message: 'Invalid promo code' };
    }

    if (!found.isActive) {
      return { valid: false, discountAmount: 0, message: 'This promo code is no longer active' };
    }

    if (found.minSpend && subtotal < found.minSpend) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Order must be at least $${found.minSpend.toFixed(2)} to use this code`
      };
    }

    let discount = 0;
    if (found.discountPercent) {
      discount = Number(((subtotal * found.discountPercent) / 100).toFixed(2));
    } else if (found.discountAmount) {
      discount = Math.min(subtotal, found.discountAmount);
    }

    return {
      valid: true,
      discountAmount: discount,
      message: `Promo code applied! Saved $${discount.toFixed(2)}`,
      promo: found
    };
  };

  // ----------------------------------------------------
  // Backup & Reset Operations
  // ----------------------------------------------------
  const resetToDefaults = () => {
    setProducts(PRODUCTS);
    setCampaigns(INITIAL_CAMPAIGNS);
    setPromoCodes(INITIAL_PROMO_CODES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CAMPAIGNS);
    localStorage.removeItem(STORAGE_KEYS.PROMOS);
  };

  const exportBackupJSON = (): string => {
    return JSON.stringify(
      {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        products,
        campaigns,
        promoCodes
      },
      null,
      2
    );
  };

  const importBackupJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data.products)) {
        setProducts(data.products);
      }
      if (Array.isArray(data.campaigns)) {
        setCampaigns(data.campaigns);
      }
      if (Array.isArray(data.promoCodes)) {
        setPromoCodes(data.promoCodes);
      }
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  };

  return (
    <AdminProductContext.Provider
      value={{
        products,
        campaigns,
        promoCodes,
        stats,
        isLoaded,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkApplyCategoryDiscount,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        toggleCampaign,
        addPromoCode,
        updatePromoCode,
        deletePromoCode,
        togglePromoCode,
        validatePromoCode,
        resetToDefaults,
        exportBackupJSON,
        importBackupJSON
      }}
    >
      {children}
    </AdminProductContext.Provider>
  );
};

export const useAdminProducts = () => {
  const context = useContext(AdminProductContext);
  if (!context) {
    throw new Error('useAdminProducts must be used within an AdminProductProvider');
  }
  return context;
};
