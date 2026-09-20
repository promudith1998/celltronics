'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Product, ProductCategory, ProductBadge } from '@/types/product';
import {
  PromotionCampaign,
  PromoCode,
  AdminStats,
  AdminOrder,
  OrderItem,
  OrderStatus,
  CustomerInquiry,
  NewsletterSubscriber,
  StoreActivityEvent
} from '@/types/admin';
import { PRODUCTS, PROMO_CODES as DEFAULT_PROMO_CODES } from '@/data/products';
import {
  checkSupabaseConnection,
  fetchProductsFromDb,
  upsertProductInDb,
  deleteProductFromDb,
  seedProductsToDb,
  fetchCampaignsFromDb,
  upsertCampaignInDb,
  deleteCampaignFromDb,
  fetchPromoCodesFromDb,
  upsertPromoCodeInDb,
  deletePromoCodeFromDb,
  fetchOrdersFromDb,
  updateOrderStatusInDb,
  deleteOrderFromDb,
  fetchNewsletterSubscribersFromDb,
  fetchContactMessagesFromDb
} from '@/lib/supabaseService';

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

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'CC-948210',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@techtoronto.ca',
    customerPhone: '(416) 555-0192',
    shippingAddress: {
      address: '180 University Ave, Suite 1400',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5H 0A2'
    },
    items: [
      { id: 'prod-1', name: 'GaN III 100W 4-Port Desktop Fast Charger Station', price: 89.99, quantity: 1, color: 'Midnight Black' },
      { id: 'prod-8', name: 'UltraFlex Braided 240W USB-C to USB-C Fast Charge Cable (2m)', price: 29.99, quantity: 2, color: 'Titanium Grey' }
    ],
    subtotal: 149.97,
    discount: 15.00,
    shipping: 0,
    tax: 17.55,
    total: 152.52,
    promoCode: 'SAVE10',
    paymentMethod: 'credit_card',
    status: 'delivered',
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString()
  },
  {
    id: 'ord-102',
    orderNumber: 'CC-948211',
    customerName: 'Sophie Bouchard',
    customerEmail: 'sophie.bouchard@montreal.qc.ca',
    customerPhone: '(514) 555-0843',
    shippingAddress: {
      address: '742 Boulevard Saint-Laurent',
      city: 'Montreal',
      province: 'QC',
      postalCode: 'H2X 2R6'
    },
    items: [
      { id: 'prod-5', name: 'MagSafe Armor Pro Titanium Shockproof Case for iPhone 16 Pro Max', price: 49.99, quantity: 1, color: 'Natural Titanium', model: 'iPhone 16 Pro Max' }
    ],
    subtotal: 49.99,
    discount: 0,
    shipping: 4.99,
    tax: 8.24,
    total: 63.22,
    paymentMethod: 'apple_pay',
    status: 'shipped',
    createdAt: new Date(Date.now() - 3600 * 1000 * 20).toISOString()
  },
  {
    id: 'ord-103',
    orderNumber: 'CC-948212',
    customerName: 'Liam O\'Connor',
    customerEmail: 'liam.oc@vancouvercreative.io',
    customerPhone: '(604) 555-0371',
    shippingAddress: {
      address: '1055 West Georgia St',
      city: 'Vancouver',
      province: 'BC',
      postalCode: 'V6E 3P3'
    },
    items: [
      { id: 'prod-15', name: 'MagSafe 15W Auto-Clamping Qi2 Wireless Fast Car Charger Mount', price: 54.99, quantity: 1, color: 'Matte Black' },
      { id: 'prod-2', name: 'GaN 65W Dual USB-C Ultra Compact Travel Wall Adapter', price: 49.99, quantity: 1, color: 'Arctic White' }
    ],
    subtotal: 104.98,
    discount: 10.50,
    shipping: 0,
    tax: 11.34,
    total: 105.82,
    promoCode: 'WELCOME10',
    paymentMethod: 'credit_card',
    status: 'processing',
    createdAt: new Date(Date.now() - 3600 * 1000 * 6).toISOString()
  },
  {
    id: 'ord-104',
    orderNumber: 'CC-948213',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@calgarytech.ca',
    shippingAddress: {
      address: '420 8th Ave SW',
      city: 'Calgary',
      province: 'AB',
      postalCode: 'T2P 1G2'
    },
    items: [
      { id: 'prod-10', name: 'ANC Pro Hybrid Active Noise Cancelling Wireless Over-Ear Headphones', price: 129.99, quantity: 1, color: 'Space Black' }
    ],
    subtotal: 129.99,
    discount: 20.00,
    shipping: 0,
    tax: 5.50,
    total: 115.49,
    paymentMethod: 'interac',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600 * 1000 * 1.5).toISOString()
  },
  {
    id: 'ord-105',
    orderNumber: 'CC-948214',
    customerName: 'David Chen',
    customerEmail: 'david.chen@ottawadev.org',
    shippingAddress: {
      address: '150 Elgin Street, Floor 8',
      city: 'Ottawa',
      province: 'ON',
      postalCode: 'K2P 1L4'
    },
    items: [
      { id: 'prod-1', name: 'GaN III 100W 4-Port Desktop Fast Charger Station', price: 89.99, quantity: 2, color: 'Midnight Black' }
    ],
    subtotal: 179.98,
    discount: 0,
    shipping: 0,
    tax: 23.40,
    total: 203.38,
    paymentMethod: 'credit_card',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600 * 1000 * 0.4).toISOString()
  }
];

const INITIAL_ACTIVITIES: StoreActivityEvent[] = [
  {
    id: 'act-1',
    type: 'order',
    title: 'New Online Order #CC-948214',
    description: 'David Chen placed an order for 2x GaN III 100W Chargers ($203.38)',
    timestamp: '24 mins ago',
    badgeColor: '#0B63F6'
  },
  {
    id: 'act-2',
    type: 'stock',
    title: 'Low Stock Alert Triggered',
    description: 'MagSafe Armor Pro Case (Titanium) dropped to 8 units in warehouse',
    timestamp: '1 hour ago',
    badgeColor: '#FF3D5A'
  },
  {
    id: 'act-3',
    type: 'campaign',
    title: 'Campaign Live: GaN Fast Charging Essentials',
    description: 'Automated 30% discount applied across all power adapters',
    timestamp: '3 hours ago',
    badgeColor: '#FF7A1A'
  },
  {
    id: 'act-4',
    type: 'order',
    title: 'Order Delivered #CC-948210',
    description: 'Canada Post confirmed delivery to Marcus Vance in Toronto, ON',
    timestamp: 'Yesterday',
    badgeColor: '#1EA672'
  },
  {
    id: 'act-5',
    type: 'promo',
    title: 'Coupon Redeemed: WELCOME10',
    description: 'Coupon code used by customer Liam O\'Connor for $10.50 savings',
    timestamp: 'Yesterday',
    badgeColor: '#7C3AED'
  }
];

export interface SupabaseStatus {
  connected: boolean;
  tablesExist: boolean;
  message: string;
  isChecking: boolean;
  lastChecked?: string;
}

interface AdminProductContextType {
  products: Product[];
  campaigns: PromotionCampaign[];
  promoCodes: PromoCode[];
  orders: AdminOrder[];
  inquiries: CustomerInquiry[];
  subscribers: NewsletterSubscriber[];
  activityEvents: StoreActivityEvent[];
  stats: AdminStats;
  isLoaded: boolean;
  supabaseStatus: SupabaseStatus;
  adminPasscode: string;

  // Product Operations
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  bulkApplyCategoryDiscount: (category: string, discountPercent: number) => void;
  restockProduct: (productId: string, quantityToAdd: number) => void;

  // Order Operations
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  refreshOrders: () => Promise<void>;

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

  // Activity & Security
  addActivityEvent: (event: Omit<StoreActivityEvent, 'id' | 'timestamp'>) => void;
  setAdminPasscode: (passcode: string) => void;

  // Supabase Database Sync Operations
  checkDatabaseConnection: () => Promise<SupabaseStatus>;
  syncCatalogToSupabase: () => Promise<{ success: boolean; count: number; message: string }>;
  refreshFromSupabase: () => Promise<boolean>;

  // Data Backup & Recovery
  resetToDefaults: () => void;
  exportBackupJSON: () => string;
  importBackupJSON: (jsonStr: string) => boolean;
}

const AdminProductContext = createContext<AdminProductContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'cellcentral_products_v2',
  CAMPAIGNS: 'cellcentral_campaigns_v2',
  PROMOS: 'cellcentral_promocodes_v2',
  ORDERS: 'cellcentral_orders_v2',
  PASSCODE: 'cellcentral_admin_passcode_v1',
  ACTIVITIES: 'cellcentral_admin_activities_v1'
};

export const AdminProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [campaigns, setCampaigns] = useState<PromotionCampaign[]>(INITIAL_CAMPAIGNS);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(INITIAL_PROMO_CODES);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [activityEvents, setActivityEvents] = useState<StoreActivityEvent[]>(INITIAL_ACTIVITIES);
  const [adminPasscode, setAdminPasscodeState] = useState<string>('admin123');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseStatus>({
    connected: false,
    tablesExist: false,
    message: 'Checking Supabase connection...',
    isChecking: true
  });

  // Check Supabase connection and optionally load from DB
  const checkDb = useCallback(async () => {
    setSupabaseStatus((prev) => ({ ...prev, isChecking: true }));
    const status = await checkSupabaseConnection();
    const fullStatus: SupabaseStatus = {
      ...status,
      isChecking: false,
      lastChecked: new Date().toLocaleTimeString()
    };
    setSupabaseStatus(fullStatus);

    if (status.connected && status.tablesExist) {
      try {
        const [dbProducts, dbCampaigns, dbPromos, dbOrders, dbInquiries, dbSubscribers] = await Promise.all([
          fetchProductsFromDb(),
          fetchCampaignsFromDb(),
          fetchPromoCodesFromDb(),
          fetchOrdersFromDb(),
          fetchContactMessagesFromDb(),
          fetchNewsletterSubscribersFromDb()
        ]);

        if (dbProducts && dbProducts.length > 0) {
          setProducts(dbProducts);
        }
        if (dbCampaigns && dbCampaigns.length > 0) {
          setCampaigns(dbCampaigns);
        }
        if (dbPromos && dbPromos.length > 0) {
          setPromoCodes(dbPromos);
        }
        if (dbOrders && dbOrders.success && dbOrders.data.length > 0) {
          setOrders(dbOrders.data);
        }
        if (dbInquiries && dbInquiries.length > 0) {
          setInquiries(dbInquiries);
        }
        if (dbSubscribers && dbSubscribers.length > 0) {
          setSubscribers(dbSubscribers);
        }
      } catch (err) {
        console.warn('Failed to load initial Supabase data:', err);
      }
    }
    return fullStatus;
  }, []);

  // Hydrate from localStorage on client mount, then verify Supabase
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      const storedCampaigns = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
      if (storedCampaigns) setCampaigns(JSON.parse(storedCampaigns));

      const storedPromos = localStorage.getItem(STORAGE_KEYS.PROMOS);
      if (storedPromos) setPromoCodes(JSON.parse(storedPromos));

      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedPasscode = localStorage.getItem(STORAGE_KEYS.PASSCODE);
      if (storedPasscode) setAdminPasscodeState(storedPasscode);

      const storedActivities = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      if (storedActivities) setActivityEvents(JSON.parse(storedActivities));
    } catch (e) {
      console.error('Failed to load admin stored data:', e);
    } finally {
      setIsLoaded(true);
      checkDb();
    }
  }, [checkDb]);

  // Save changes to localStorage cache
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

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activityEvents));
    }
  }, [activityEvents, isLoaded]);

  // Compute live admin statistics
  const stats: AdminStats = useMemo(() => {
    const totalProducts = products.length;
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * (p.stockCount || 20)), 0);
    const lowStockCount = products.filter((p) => p.inStock && (p.stockCount ?? 20) <= 25).length;
    const outOfStockCount = products.filter((p) => !p.inStock || p.badge === 'out').length;
    const activeCampaignsCount = campaigns.filter((c) => c.isActive).length;
    const activePromoCodesCount = promoCodes.filter((p) => p.isActive).length;

    const discountedProducts = products.filter((p) => p.wasPrice && p.wasPrice > p.price);
    const avgDiscountPercent = discountedProducts.length
      ? Math.round(
          discountedProducts.reduce((acc, p) => acc + (((p.wasPrice! - p.price) / p.wasPrice!) * 100), 0) /
            discountedProducts.length
        )
      : 0;

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalOrdersCount = orders.length;
    const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

    return {
      totalProducts,
      totalInventoryValue,
      lowStockCount,
      outOfStockCount,
      activeCampaignsCount,
      activePromoCodesCount,
      avgDiscountPercent,
      totalRevenue,
      totalOrdersCount,
      pendingOrdersCount
    };
  }, [products, campaigns, promoCodes, orders]);

  // Activity logger helper
  const addActivityEvent = (event: Omit<StoreActivityEvent, 'id' | 'timestamp'>) => {
    const newEvent: StoreActivityEvent = {
      ...event,
      id: `act-${Date.now()}`,
      timestamp: 'Just now'
    };
    setActivityEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
  };

  // Product Operations
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const slugId =
      productData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || `prod-${Date.now()}`;

    const newProduct: Product = {
      ...productData,
      id: `${slugId}-${Date.now().toString().slice(-4)}`
    };

    setProducts((prev) => [newProduct, ...prev]);
    upsertProductInDb(newProduct).catch((e) => console.warn('Supabase sync error:', e));

    addActivityEvent({
      type: 'stock',
      title: `Added Product: ${newProduct.name.slice(0, 30)}...`,
      description: `New SKU ${newProduct.sku} added to ${newProduct.categoryName}`,
      badgeColor: '#0B63F6'
    });

    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const existing = products.find((p) => p.id === id);
    if (!existing) return;

    const updatedProduct: Product = { ...existing, ...updates };

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updatedProduct : p))
    );

    upsertProductInDb(updatedProduct).catch((e) => console.warn('Supabase sync error:', e));
    addActivityEvent({
      type: 'stock',
      title: `Updated Product: ${updatedProduct.name.slice(0, 30)}...`,
      description: `Price: $${updatedProduct.price.toFixed(2)} | Stock: ${updatedProduct.stockCount ?? 20}`,
      badgeColor: '#7C3AED'
    });
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    deleteProductFromDb(id).catch((e) => console.warn('Supabase sync error:', e));

    if (prod) {
      addActivityEvent({
        type: 'stock',
        title: `Removed Product: ${prod.name.slice(0, 30)}...`,
        description: `SKU ${prod.sku} deleted from catalog`,
        badgeColor: '#FF3D5A'
      });
    }
  };

  const restockProduct = (productId: string, quantityToAdd: number) => {
    let targetName = '';
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          targetName = p.name;
          const currentStock = p.stockCount ?? 0;
          const newStock = Math.max(0, currentStock + quantityToAdd);
          const updated: Product = {
            ...p,
            stockCount: newStock,
            inStock: newStock > 0,
            badge: newStock > 0 && p.badge === 'out' ? undefined : p.badge
          };
          upsertProductInDb(updated).catch((e) => console.warn('Supabase sync error:', e));
          return updated;
        }
        return p;
      })
    );

    addActivityEvent({
      type: 'stock',
      title: `Restocked Product (+${quantityToAdd} units)`,
      description: `${targetName.slice(0, 35)}... now has inventory replenishments.`,
      badgeColor: '#1EA672'
    });
  };

  const bulkApplyCategoryDiscount = (category: string, discountPercent: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (category === 'all' || p.category === category) {
          const originalPrice = p.wasPrice || p.price;
          const factor = (100 - discountPercent) / 100;
          const newPrice = Math.round(originalPrice * factor * 100) / 100;
          const updated: Product = {
            ...p,
            wasPrice: originalPrice,
            price: newPrice,
            badge: (discountPercent >= 20 ? 'sale' : p.badge) as ProductBadge | undefined,
            badgeText: `${discountPercent}% OFF`
          };
          upsertProductInDb(updated).catch((e) => console.warn('Supabase sync error:', e));
          return updated;
        }
        return p;
      })
    );

    addActivityEvent({
      type: 'promo',
      title: `Flash Sale Applied: ${discountPercent}% OFF`,
      description: `Category "${category.toUpperCase()}" discounted store-wide`,
      badgeColor: '#FF7A1A'
    });
  };

  // Order Operations
  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    await updateOrderStatusInDb(orderId, status);

    addActivityEvent({
      type: 'order',
      title: `Order Status: ${status.toUpperCase()}`,
      description: `Order #${orderId.slice(-6)} updated to ${status}`,
      badgeColor: status === 'delivered' ? '#1EA672' : status === 'shipped' ? '#0B63F6' : '#FF7A1A'
    });
  };

  const deleteOrder = async (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
    await deleteOrderFromDb(orderId);
  };

  const refreshOrders = async () => {
    const res = await fetchOrdersFromDb();
    if (res.success && res.data.length > 0) {
      setOrders(res.data);
    }
  };

  // Campaign Operations
  const addCampaign = (campaignData: Omit<PromotionCampaign, 'id'>): PromotionCampaign => {
    const id = `camp-${Date.now().toString().slice(-6)}`;
    const newCamp: PromotionCampaign = { ...campaignData, id };
    setCampaigns((prev) => [newCamp, ...prev]);
    upsertCampaignInDb(newCamp).catch((e) => console.warn('Supabase sync error:', e));

    addActivityEvent({
      type: 'campaign',
      title: `Campaign Created: ${newCamp.name.slice(0, 30)}...`,
      description: `Discount: ${newCamp.discountPercent ? `${newCamp.discountPercent}% OFF` : 'Active'}`,
      badgeColor: '#FF7A1A'
    });

    return newCamp;
  };

  const updateCampaign = (id: string, updates: Partial<PromotionCampaign>) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updated = { ...c, ...updates };
          upsertCampaignInDb(updated).catch((e) => console.warn('Supabase sync error:', e));
          return updated;
        }
        return c;
      })
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    deleteCampaignFromDb(id).catch((e) => console.warn('Supabase sync error:', e));
  };

  const toggleCampaign = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updated = { ...c, isActive: !c.isActive };
          upsertCampaignInDb(updated).catch((e) => console.warn('Supabase sync error:', e));
          return updated;
        }
        return c;
      })
    );
  };

  // Promo Code Operations
  const addPromoCode = (promo: PromoCode) => {
    const upperCode = promo.code.trim().toUpperCase();
    const cleanPromo = { ...promo, code: upperCode };
    setPromoCodes((prev) => {
      const filtered = prev.filter((p) => p.code !== upperCode);
      return [cleanPromo, ...filtered];
    });
    upsertPromoCodeInDb(cleanPromo).catch((e) => console.warn('Supabase sync error:', e));

    addActivityEvent({
      type: 'promo',
      title: `Coupon Added: ${cleanPromo.code}`,
      description: cleanPromo.description || 'Active discount coupon',
      badgeColor: '#7C3AED'
    });
  };

  const updatePromoCode = (code: string, updates: Partial<PromoCode>) => {
    setPromoCodes((prev) =>
      prev.map((p) => {
        if (p.code === code) {
          const updated = { ...p, ...updates };
          upsertPromoCodeInDb(updated).catch((e) => console.warn('Supabase sync error:', e));
          return updated;
        }
        return p;
      })
    );
  };

  const deletePromoCode = (code: string) => {
    setPromoCodes((prev) => prev.filter((p) => p.code !== code));
    deletePromoCodeFromDb(code).catch((e) => console.warn('Supabase sync error:', e));
  };

  const togglePromoCode = (code: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => {
        if (p.code === code) {
          const updated = { ...p, isActive: !p.isActive };
          upsertPromoCodeInDb(updated).catch((e) => console.warn('Supabase sync error:', e));
          return updated;
        }
        return p;
      })
    );
  };

  const validatePromoCode = (
    code: string,
    subtotal: number
  ): { valid: boolean; discountAmount: number; message: string; promo?: PromoCode } => {
    const normalized = code.trim().toUpperCase();
    const promo = promoCodes.find((p) => p.code.toUpperCase() === normalized);

    if (!promo) {
      return { valid: false, discountAmount: 0, message: `Promo code "${code}" is not valid.` };
    }
    if (!promo.isActive) {
      return { valid: false, discountAmount: 0, message: `Promo code "${code}" is no longer active.` };
    }
    if (promo.minSpend && subtotal < promo.minSpend) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Order must be at least $${promo.minSpend.toFixed(2)} to use "${code}".`
      };
    }

    let discount = 0;
    if (promo.discountPercent) {
      discount = Math.round(((subtotal * promo.discountPercent) / 100) * 100) / 100;
    } else if (promo.discountAmount) {
      discount = Math.min(promo.discountAmount, subtotal);
    }

    return {
      valid: true,
      discountAmount: discount,
      message: `${promo.code} applied! Saved $${discount.toFixed(2)}`,
      promo
    };
  };

  // Passcode operations
  const setAdminPasscode = (newPass: string) => {
    setAdminPasscodeState(newPass);
    localStorage.setItem(STORAGE_KEYS.PASSCODE, newPass);
    addActivityEvent({
      type: 'system',
      title: 'Admin Security Passcode Updated',
      description: 'Master access code successfully changed in settings',
      badgeColor: '#FF7A1A'
    });
  };

  // Database sync
  const syncCatalogToSupabase = async (): Promise<{ success: boolean; count: number; message: string }> => {
    const res = await seedProductsToDb(products);
    if (!res.success) {
      return {
        success: false,
        count: 0,
        message: 'Failed to push catalog to Supabase. Check if tables are created in Supabase SQL editor.'
      };
    }

    for (const c of campaigns) {
      await upsertCampaignInDb(c);
    }
    for (const p of promoCodes) {
      await upsertPromoCodeInDb(p);
    }

    await checkDb();
    return {
      success: true,
      count: res.count,
      message: `Successfully synchronized ${res.count} products, ${campaigns.length} campaigns, and ${promoCodes.length} promo codes to Supabase!`
    };
  };

  const refreshFromSupabase = async (): Promise<boolean> => {
    const dbProducts = await fetchProductsFromDb();
    if (dbProducts && dbProducts.length > 0) {
      setProducts(dbProducts);
      return true;
    }
    return false;
  };

  // Backup & Reset Operations
  const resetToDefaults = () => {
    setProducts(PRODUCTS);
    setCampaigns(INITIAL_CAMPAIGNS);
    setPromoCodes(INITIAL_PROMO_CODES);
    setOrders(INITIAL_ORDERS);
    setActivityEvents(INITIAL_ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CAMPAIGNS);
    localStorage.removeItem(STORAGE_KEYS.PROMOS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.PASSCODE);
  };

  const exportBackupJSON = (): string => {
    return JSON.stringify(
      {
        version: '2.0',
        exportedAt: new Date().toISOString(),
        products,
        campaigns,
        promoCodes,
        orders
      },
      null,
      2
    );
  };

  const importBackupJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data.products)) setProducts(data.products);
      if (Array.isArray(data.campaigns)) setCampaigns(data.campaigns);
      if (Array.isArray(data.promoCodes)) setPromoCodes(data.promoCodes);
      if (Array.isArray(data.orders)) setOrders(data.orders);
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
        orders,
        inquiries,
        subscribers,
        activityEvents,
        stats,
        isLoaded,
        supabaseStatus,
        adminPasscode,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkApplyCategoryDiscount,
        restockProduct,
        updateOrderStatus,
        deleteOrder,
        refreshOrders,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        toggleCampaign,
        addPromoCode,
        updatePromoCode,
        deletePromoCode,
        togglePromoCode,
        validatePromoCode,
        addActivityEvent,
        setAdminPasscode,
        checkDatabaseConnection: checkDb,
        syncCatalogToSupabase,
        refreshFromSupabase,
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
