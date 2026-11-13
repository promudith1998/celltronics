'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Package,
  Sparkles,
  Tag,
  Settings,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  Edit2,
  Trash2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Layers,
  Flame,
  Percent,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Eye,
  Check,
  Database,
  Cloud,
  CheckCircle,
  Copy,
  ShoppingCart,
  Mail,
  Users,
  Lock,
  LogOut,
  Clock,
  Shield,
  Truck,
  FileText,
  RotateCcw,
  CreditCard,
  Bell
} from 'lucide-react';
import { useAdminProducts } from '@/context/AdminProductContext';
import { useToast } from '@/context/ToastContext';
import { Product, ProductCategory } from '@/types/product';
import { PromotionCampaign, PromoCode, AdminOrder, OrderStatus } from '@/types/admin';
import { CATEGORIES, BRANDS } from '@/data/products';
import { ProductIcon } from '@/components/product/ProductIcon';
import { ProductFormModal } from '@/components/admin/ProductFormModal';
import { CampaignFormModal } from '@/components/admin/CampaignFormModal';
import { PromoCodeModal } from '@/components/admin/PromoCodeModal';
import { AdminAuthGate } from '@/components/admin/AdminAuthGate';
import { AdminAnalyticsChart } from '@/components/admin/AdminAnalyticsChart';
import { OrderDetailsModal } from '@/components/admin/OrderDetailsModal';

export default function AdminPage() {
  const {
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
    inventoryAlertConfig,
    updateInventoryAlertConfig,
    getProductLowStockThreshold,
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
    checkDatabaseConnection,
    syncCatalogToSupabase,
    resetToDefaults,
    exportBackupJSON,
    importBackupJSON
  } = useAdminProducts();

  const { showToast } = useToast();
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [isCopiedSql, setIsCopiedSql] = useState(false);

  // PayPal Connectivity State
  const [paypalTestResult, setPaypalTestResult] = useState<any>(null);
  const [isCheckingPaypal, setIsCheckingPaypal] = useState(false);

  // Active Admin View Tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'orders' | 'products' | 'campaigns' | 'promos' | 'leads' | 'settings'
  >('dashboard');

  // Product List Table States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'low' | 'out'>('all');

  // Orders Filter & State
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<AdminOrder | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Modals States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<PromotionCampaign | null>(null);

  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);

  // Bulk Discount Tool States
  const [bulkCategory, setBulkCategory] = useState<string>('all');
  const [bulkDiscountVal, setBulkDiscountVal] = useState<number>(20);

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Inventory Low-Stock Notification State & Settings Form
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [lowThresholdInput, setLowThresholdInput] = useState<number>(
    inventoryAlertConfig.lowStockThreshold
  );
  const [criticalThresholdInput, setCriticalThresholdInput] = useState<number>(
    inventoryAlertConfig.criticalStockThreshold
  );
  const [notifyDashboardInput, setNotifyDashboardInput] = useState<boolean>(
    inventoryAlertConfig.notifyOnDashboard
  );
  const [notifyToastInput, setNotifyToastInput] = useState<boolean>(
    inventoryAlertConfig.notifyToastOnLowStock
  );
  const hasShownInitialLowStockToast = useRef(false);

  useEffect(() => {
    setLowThresholdInput(inventoryAlertConfig.lowStockThreshold);
    setCriticalThresholdInput(inventoryAlertConfig.criticalStockThreshold);
    setNotifyDashboardInput(inventoryAlertConfig.notifyOnDashboard);
    setNotifyToastInput(inventoryAlertConfig.notifyToastOnLowStock);
  }, [inventoryAlertConfig]);

  // All low-stock & out-of-stock products based on configured thresholds
  const allLowStockAlerts = useMemo(() => {
    return products
      .filter((p) => {
        const qty = p.stockCount ?? 20;
        const threshold = getProductLowStockThreshold(p);
        return qty <= threshold || !p.inStock || p.badge === 'out';
      })
      .sort((a, b) => (a.stockCount ?? 0) - (b.stockCount ?? 0));
  }, [products, getProductLowStockThreshold]);

  useEffect(() => {
    if (
      isLoaded &&
      !hasShownInitialLowStockToast.current &&
      inventoryAlertConfig.notifyToastOnLowStock &&
      allLowStockAlerts.length > 0
    ) {
      hasShownInitialLowStockToast.current = true;
      showToast(
        'Low Inventory Alert ⚠️',
        `${allLowStockAlerts.length} product(s) are at or below your stock threshold (${inventoryAlertConfig.lowStockThreshold} units).`,
        'info'
      );
    }
  }, [
    isLoaded,
    inventoryAlertConfig.notifyToastOnLowStock,
    inventoryAlertConfig.lowStockThreshold,
    allLowStockAlerts.length,
    showToast
  ]);

  const handleSaveInventoryAlertConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanLow = Math.max(1, Math.floor(Number(lowThresholdInput) || 1));
    const cleanCrit = Math.max(0, Math.min(cleanLow, Math.floor(Number(criticalThresholdInput) || 0)));

    updateInventoryAlertConfig({
      lowStockThreshold: cleanLow,
      criticalStockThreshold: cleanCrit,
      notifyOnDashboard: notifyDashboardInput,
      notifyToastOnLowStock: notifyToastInput
    });
    showToast(
      'Alert Settings Saved 🔔',
      `Admin will be notified when stock reaches ≤ ${cleanLow} units (Critical: ≤ ${cleanCrit}).`,
      'success'
    );
  };

  // Filtered Products for Catalog Table
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (stockFilter === 'instock' && (!p.inStock || p.badge === 'out')) return false;
      if (stockFilter === 'low' && ((p.stockCount ?? 20) > getProductLowStockThreshold(p) || !p.inStock)) return false;
      if (stockFilter === 'out' && p.inStock && p.badge !== 'out') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesBrand) return false;
      }
      return true;
    });
  }, [products, selectedCategory, stockFilter, searchQuery, getProductLowStockThreshold]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      if (orderStatusFilter !== 'all' && ord.status !== orderStatusFilter) return false;
      if (orderSearchQuery.trim()) {
        const q = orderSearchQuery.toLowerCase();
        const matchesNum = ord.orderNumber.toLowerCase().includes(q);
        const matchesName = ord.customerName.toLowerCase().includes(q);
        const matchesEmail = ord.customerEmail.toLowerCase().includes(q);
        if (!matchesNum && !matchesName && !matchesEmail) return false;
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearchQuery]);

  // Handle Save Product
  const handleSaveProduct = (productData: Omit<Product, 'id'>, existingId?: string) => {
    if (existingId) {
      updateProduct(existingId, productData);
      showToast('Product Updated! ✅', `${productData.name} changes were saved successfully.`, 'success');
    } else {
      const created = addProduct(productData);
      showToast('Product Created! 🎉', `${created.name} added to live catalog.`, 'success');
    }
  };

  // Handle Save Campaign
  const handleSaveCampaign = (campaignData: Omit<PromotionCampaign, 'id'>, existingId?: string) => {
    if (existingId) {
      updateCampaign(existingId, campaignData);
      showToast('Campaign Updated! 🚀', `"${campaignData.name}" has been updated.`, 'success');
    } else {
      const created = addCampaign(campaignData);
      showToast('Campaign Launched! 🔥', `"${created.name}" is now active.`, 'success');
    }
  };

  // Handle Save Promo Code
  const handleSavePromo = (promo: PromoCode) => {
    addPromoCode(promo);
    showToast('Promo Code Saved! 🏷️', `Coupon "${promo.code}" is ready for customers.`, 'success');
  };

  // Handle Bulk Discount Apply
  const handleApplyBulkDiscount = () => {
    bulkApplyCategoryDiscount(bulkCategory, bulkDiscountVal);
    const catName = bulkCategory === 'all' ? 'All Products' : (CATEGORIES.find((c) => c.id === bulkCategory)?.name || bulkCategory);
    showToast('Bulk Discount Applied! ⚡', `Applied ${bulkDiscountVal}% OFF across ${catName}.`, 'success');
  };

  // Handle Export Backup
  const handleExport = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cellcentral-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup Exported 📁', 'Catalog, orders, and promo settings saved to JSON file.', 'success');
  };

  // Handle Import Backup
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importBackupJSON(content);
      if (success) {
        showToast('Backup Restored! ✅', 'Catalog, campaigns, orders, and promo codes loaded.', 'success');
      } else {
        showToast('Import Failed ❌', 'Invalid backup JSON format.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Lock Session helper
  const handleLockSession = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cellcentral-lock-admin'));
    }
  };

  // Low Stock Items for Quick Restock Widget
  const lowStockItems = useMemo(() => {
    return allLowStockAlerts.slice(0, 6);
  }, [allLowStockAlerts]);

  return (
    <AdminAuthGate>
      <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px', fontFamily: 'var(--font-sans), sans-serif' }}>
        {/* Top Admin Executive Header Bar */}
        <header
          style={{
            background: '#0B1E3D',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 90
          }}
        >
          <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
            {/* Logo & Portal Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link href="/admin" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <Image src="/images/logo.png" alt="CellCentral" width={140} height={35} style={{ objectFit: 'contain' }} />
                <div style={{ marginLeft: '6px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    <span style={{ color: '#0B63F6' }}>CELL</span>
                    <span style={{ color: '#FF7A1A' }}>CENTRAL</span>
                  </div>
                </div>
              </Link>
              <div
                style={{
                  background: 'linear-gradient(135deg, #0B63F6 0%, #7C3AED 100%)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(11,99,246,0.4)'
                }}
              >
                OPERATIONS COMMAND CENTER
              </div>
            </div>

            {/* Quick Header Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                style={{
                  background: 'var(--grad-brand)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 4px 14px rgba(11,99,246,0.35)'
                }}
              >
                <Plus size={15} /> Add Product
              </button>

              <button
                onClick={() => {
                  setEditingCampaign(null);
                  setIsCampaignModalOpen(true);
                }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '8px 14px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={14} color="#FF7A1A" /> New Campaign
              </button>

              {/* Low-Stock Notification Bell */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setIsAlertsOpen((prev) => !prev)}
                  title="Low-Stock Inventory Notifications"
                  style={{
                    position: 'relative',
                    background: allLowStockAlerts.length > 0 ? 'rgba(255,61,90,0.16)' : 'rgba(255,255,255,0.1)',
                    border: `1px solid ${allLowStockAlerts.length > 0 ? 'rgba(255,61,90,0.45)' : 'rgba(255,255,255,0.2)'}`,
                    color: '#fff',
                    width: '36px',
                    height: '36px',
                    borderRadius: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Bell size={16} color={allLowStockAlerts.length > 0 ? '#FF8FA3' : '#fff'} />
                  {allLowStockAlerts.length > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        minWidth: '18px',
                        height: '18px',
                        borderRadius: '100px',
                        background: '#FF3D5A',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 4px',
                        border: '2px solid #0B1E3D'
                      }}
                    >
                      {allLowStockAlerts.length}
                    </span>
                  )}
                </button>

                {isAlertsOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '44px',
                      width: '360px',
                      maxHeight: '420px',
                      overflowY: 'auto',
                      background: '#fff',
                      color: '#0F172A',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 20px 45px rgba(11,30,61,0.25)',
                      zIndex: 120,
                      padding: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                          Inventory Alerts ({allLowStockAlerts.length})
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                          Threshold: ≤ {inventoryAlertConfig.lowStockThreshold} units
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAlertsOpen(false);
                          setActiveTab('settings');
                        }}
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: '#0B63F6',
                          background: '#EFF6FF',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '5px 10px',
                          cursor: 'pointer'
                        }}
                      >
                        Configure
                      </button>
                    </div>

                    {allLowStockAlerts.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', fontSize: '12.5px', color: '#1EA672', fontWeight: 700, background: '#ECFDF5', borderRadius: '10px' }}>
                        All products are above your low-stock threshold.
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {allLowStockAlerts.slice(0, 8).map((item) => {
                          const qty = item.stockCount ?? 0;
                          const isCrit = qty <= inventoryAlertConfig.criticalStockThreshold;
                          return (
                            <div
                              key={item.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px',
                                padding: '10px',
                                borderRadius: '10px',
                                background: isCrit ? '#FEF2F2' : '#FFF7ED',
                                border: `1px solid ${isCrit ? '#FECACA' : '#FED7AA'}`
                              }}
                            >
                              <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {item.name}
                                </div>
                                <div style={{ fontSize: '11px', color: isCrit ? '#DC2626' : '#EA580C', fontWeight: 700 }}>
                                  {qty} units left (Alert ≤ {getProductLowStockThreshold(item)})
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  restockProduct(item.id, 10);
                                  showToast('Restocked +10 📦', `Added 10 units to ${item.name.slice(0, 22)}...`, 'success');
                                }}
                                style={{
                                  padding: '4px 9px',
                                  borderRadius: '6px',
                                  border: '1px solid #CBD5E1',
                                  background: '#fff',
                                  fontSize: '11px',
                                  fontWeight: 800,
                                  color: '#0F172A',
                                  cursor: 'pointer',
                                  flexShrink: 0
                                }}
                              >
                                +10
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Supabase Status Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: supabaseStatus.connected
                    ? supabaseStatus.tablesExist
                      ? 'rgba(30,166,114,0.15)'
                      : 'rgba(255,122,26,0.15)'
                    : 'rgba(255,255,255,0.08)',
                  color: supabaseStatus.connected
                    ? supabaseStatus.tablesExist
                      ? '#1EA672'
                      : '#FF7A1A'
                    : 'var(--gray-400)',
                  border: `1px solid ${
                    supabaseStatus.connected
                      ? supabaseStatus.tablesExist
                        ? 'rgba(30,166,114,0.4)'
                        : 'rgba(255,122,26,0.4)'
                      : 'rgba(255,255,255,0.15)'
                  }`
                }}
                title={supabaseStatus.message}
              >
                <Database size={13} />
                <span>
                  {supabaseStatus.isChecking
                    ? 'Connecting...'
                    : supabaseStatus.connected
                    ? supabaseStatus.tablesExist
                      ? 'Supabase DB Live'
                      : 'Schema Pending'
                    : 'DB Offline'}
                </span>
              </div>

              {/* View Storefront Link */}
              <Link
                href="/"
                target="_blank"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#3FA9FF',
                  fontSize: '13px',
                  fontWeight: 700,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'rgba(63,169,255,0.1)',
                  textDecoration: 'none'
                }}
              >
                <span>Storefront</span>
                <ExternalLink size={14} />
              </Link>

              {/* 2FA Verified Admin Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#10B981',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '7px 12px',
                  borderRadius: '8px'
                }}
              >
                <ShieldCheck size={14} />
                <span>2FA Verified</span>
              </div>

              {/* Lock / Sign Out Button */}
              <button
                onClick={handleLockSession}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#FF6B8B',
                  background: 'rgba(255, 61, 90, 0.12)',
                  border: '1px solid rgba(255, 61, 90, 0.25)',
                  fontSize: '13px',
                  fontWeight: 700,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
                title="Lock admin session immediately"
              >
                <Lock size={13} />
                <span>Lock</span>
              </button>
            </div>
          </div>

          {/* Admin Navigation Tabs Bar */}
          <div style={{ background: '#0F274D', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="wrap" style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '0 24px' }}>
              {[
                { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
                { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingCart },
                { id: 'products', label: `Products (${products.length})`, icon: Package },
                { id: 'campaigns', label: `Promotions (${campaigns.length})`, icon: Sparkles },
                { id: 'promos', label: `Promo Codes (${promoCodes.length})`, icon: Tag },
                { id: 'leads', label: `Inquiries & Leads (${inquiries.length + subscribers.length})`, icon: Mail },
                { id: 'settings', label: 'Database & Security', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSel = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 18px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: isSel ? '#fff' : '#A2B4D2',
                      borderBottom: isSel ? '3px solid #3FA9FF' : '3px solid transparent',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      background: isSel ? 'rgba(255,255,255,0.06)' : 'transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={16} color={isSel ? '#3FA9FF' : '#A2B4D2'} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="wrap" style={{ paddingTop: '28px' }}>
          
          {/* ========================================================= */}
          {/* TAB 1: COMMAND CENTER & KPI OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Configurable Low-Stock Alert Banner */}
              {inventoryAlertConfig.notifyOnDashboard && allLowStockAlerts.length > 0 && (
                <div
                  style={{
                    marginBottom: '22px',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #FEF2F2 0%, #FFF7ED 100%)',
                    border: '1.5px solid #FECACA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#FEE2E2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#DC2626',
                        flexShrink: 0
                      }}
                    >
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#991B1B' }}>
                        Low Inventory Alert: {allLowStockAlerts.length} item(s) need attention
                      </div>
                      <div style={{ fontSize: '12.5px', color: '#B45309', fontWeight: 600 }}>
                        Triggered when stock reaches ≤ {inventoryAlertConfig.lowStockThreshold} units (Critical ≤ {inventoryAlertConfig.criticalStockThreshold}).
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setStockFilter('low');
                        setActiveTab('products');
                      }}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        background: '#DC2626',
                        color: '#fff',
                        border: 'none',
                        fontSize: '12.5px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      View &amp; Restock
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('settings')}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        background: '#fff',
                        color: '#0F172A',
                        border: '1px solid #E2E8F0',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Configure Threshold
                    </button>
                  </div>
                </div>
              )}

              {/* Financial & Operations KPI Cards Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '20px',
                  marginBottom: '28px'
                }}
              >
                {/* Card 1: Gross Sales & Revenue */}
                <div
                  style={{
                    background: '#fff',
                    padding: '22px',
                    borderRadius: '18px',
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-500)', textTransform: 'uppercase' }}>
                      Gross Store Revenue
                    </span>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(30,166,114,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <DollarSign size={20} color="#1EA672" />
                    </div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginTop: '10px' }}>
                    ${stats.totalRevenue.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#1EA672', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingUp size={14} /> +18.4% WoW · Canadian Sales (CAD)
                  </div>
                </div>

                {/* Card 2: Orders & Fulfillment */}
                <div
                  style={{
                    background: '#fff',
                    padding: '22px',
                    borderRadius: '18px',
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-500)', textTransform: 'uppercase' }}>
                      Orders Placed
                    </span>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(11,99,246,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <ShoppingCart size={20} color="var(--blue)" />
                    </div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginTop: '10px' }}>
                    {stats.totalOrdersCount} Orders
                  </div>
                  <div style={{ fontSize: '12.5px', color: stats.pendingOrdersCount > 0 ? '#FF7A1A' : '#1EA672', fontWeight: 700, marginTop: '4px' }}>
                    {stats.pendingOrdersCount > 0 ? `⚡ ${stats.pendingOrdersCount} pending dispatch` : '✓ All orders fulfilled'}
                  </div>
                </div>

                {/* Card 3: Live Catalog & Inventory Asset Value */}
                <div
                  style={{
                    background: '#fff',
                    padding: '22px',
                    borderRadius: '18px',
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-500)', textTransform: 'uppercase' }}>
                      Catalog Value
                    </span>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(124,58,237,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Package size={20} color="#7C3AED" />
                    </div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginTop: '10px' }}>
                    ${stats.totalInventoryValue.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--gray-600)', fontWeight: 600, marginTop: '4px' }}>
                    {stats.totalProducts} active products in warehouse
                  </div>
                </div>

                {/* Card 4: Inventory Health Alerts */}
                <div
                  style={{
                    background: '#fff',
                    padding: '22px',
                    borderRadius: '18px',
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-500)', textTransform: 'uppercase' }}>
                      Stock Alert Status
                    </span>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(255,61,90,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <AlertTriangle size={20} color="#FF3D5A" />
                    </div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: stats.lowStockCount > 0 ? '#FF3D5A' : 'var(--navy)', marginTop: '10px' }}>
                    {stats.lowStockCount} Low Stock
                  </div>
                  <div style={{ fontSize: '12.5px', color: stats.outOfStockCount > 0 ? '#FF3D5A' : 'var(--gray-600)', fontWeight: 600, marginTop: '4px' }}>
                    {stats.outOfStockCount} items currently out of stock
                  </div>
                </div>
              </div>

              {/* Visual Analytics Chart */}
              <AdminAnalyticsChart orders={orders} />

              {/* Lower Section: 2-Column Split */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
                
                {/* Column 1: Fast Restock Tool & Active Campaigns */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Low Stock Quick Restock Tool */}
                  <div
                    style={{
                      background: '#fff',
                      padding: '24px',
                      borderRadius: '20px',
                      border: '1px solid var(--gray-200)',
                      boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,61,90,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <AlertTriangle size={18} color="#FF3D5A" />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                            Low-Stock Quick Restock
                          </h3>
                          <span style={{ fontSize: '12px', color: 'var(--gray-500)' }}>1-click replenishment</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setStockFilter('low');
                          setActiveTab('products');
                        }}
                        style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        All Stock Issues <ArrowUpRight size={14} />
                      </button>
                    </div>

                    {lowStockItems.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', color: '#1EA672', fontWeight: 700, fontSize: '13.5px', background: 'rgba(30,166,114,0.08)', borderRadius: '12px' }}>
                        ✓ Healthy Inventory: All products have sufficient stock levels!
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {lowStockItems.map((prod) => (
                          <div
                            key={prod.id}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '12px',
                              background: 'var(--gray-50)',
                              border: '1px solid var(--gray-200)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                              gap: '10px'
                            }}
                          >
                            <div style={{ flex: 1, minWidth: '180px' }}>
                              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy)' }}>
                                {prod.name.slice(0, 36)}...
                              </div>
                              <div style={{ fontSize: '11.5px', color: 'var(--gray-500)', marginTop: '2px' }}>
                                SKU: {prod.sku} · Current Stock:{' '}
                                <strong style={{ color: (prod.stockCount ?? 0) <= inventoryAlertConfig.criticalStockThreshold ? '#FF3D5A' : '#FF7A1A' }}>
                                  {prod.stockCount ?? 0} units
                                </strong>
                              </div>
                            </div>

                            <div style={{ display: 'flex', gap: '6px' }}>
                              {[10, 25, 50].map((qty) => (
                                <button
                                  key={qty}
                                  onClick={() => {
                                    restockProduct(prod.id, qty);
                                    showToast('Inventory Replenished! 📦', `Added +${qty} units to ${prod.name.slice(0, 20)}...`, 'success');
                                  }}
                                  style={{
                                    padding: '5px 10px',
                                    borderRadius: '6px',
                                    border: '1px solid var(--gray-300)',
                                    background: '#fff',
                                    fontSize: '11.5px',
                                    fontWeight: 700,
                                    color: 'var(--navy)',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s'
                                  }}
                                >
                                  +{qty}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Active Promotional Campaigns Overview */}
                  <div
                    style={{
                      background: '#fff',
                      padding: '24px',
                      borderRadius: '20px',
                      border: '1px solid var(--gray-200)',
                      boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                        Active Promotional Campaigns
                      </h3>
                      <button
                        onClick={() => setActiveTab('campaigns')}
                        style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        Manage All <ArrowUpRight size={14} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {campaigns.filter((c) => c.isActive).slice(0, 3).map((camp) => (
                        <div
                          key={camp.id}
                          style={{
                            padding: '14px 18px',
                            borderRadius: '12px',
                            background: 'var(--gray-50)',
                            border: '1px solid var(--gray-200)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '10.5px', fontWeight: 800, background: '#FF7A1A', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>
                                {camp.badgeText}
                              </span>
                              <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navy)' }}>
                                {camp.name}
                              </span>
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--gray-600)', margin: '4px 0 0' }}>
                              {camp.subtitle}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setEditingCampaign(camp);
                              setIsCampaignModalOpen(true);
                            }}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: '1px solid var(--gray-300)',
                              background: '#fff',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: Activity Stream & Flash Sale Applicator */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Real-time Store Activity Feed */}
                  <div
                    style={{
                      background: '#fff',
                      padding: '24px',
                      borderRadius: '20px',
                      border: '1px solid var(--gray-200)',
                      boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={16} color="var(--blue)" />
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                          Real-Time Store Activity
                        </h3>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--gray-500)', fontWeight: 700 }}>Live Feed</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '310px', overflowY: 'auto' }}>
                      {activityEvents.slice(0, 7).map((act) => (
                        <div
                          key={act.id}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '10px',
                            background: 'var(--gray-50)',
                            borderLeft: `3.5px solid ${act.badgeColor || '#0B63F6'}`,
                            fontSize: '12px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ color: 'var(--navy)' }}>{act.title}</strong>
                            <span style={{ fontSize: '10.5px', color: 'var(--gray-500)' }}>{act.timestamp}</span>
                          </div>
                          <div style={{ color: 'var(--gray-600)', marginTop: '2px' }}>{act.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Flash Sale Applicator */}
                  <div
                    style={{
                      background: '#fff',
                      padding: '24px',
                      borderRadius: '20px',
                      border: '1px solid var(--gray-200)',
                      boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,61,90,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Flame size={20} color="#FF3D5A" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                          Category Flash Sale
                        </h3>
                        <span style={{ fontSize: '12px', color: 'var(--gray-500)' }}>Apply instant price discounts</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          Target Category
                        </label>
                        <select
                          value={bulkCategory}
                          onChange={(e) => setBulkCategory(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '10px',
                            border: '1.5px solid var(--gray-200)',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: 'var(--navy)',
                            background: '#fff'
                          }}
                        >
                          <option value="all">Entire Catalog (All Categories)</option>
                          {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          Discount Percentage (% OFF)
                        </label>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {[15, 20, 25, 30].map((pct) => (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => setBulkDiscountVal(pct)}
                              style={{
                                flex: 1,
                                padding: '6px',
                                borderRadius: '8px',
                                border: bulkDiscountVal === pct ? '1.5px solid #FF3D5A' : '1px solid var(--gray-200)',
                                background: bulkDiscountVal === pct ? 'rgba(255,61,90,0.08)' : '#fff',
                                color: bulkDiscountVal === pct ? '#FF3D5A' : 'var(--navy)',
                                fontWeight: 800,
                                fontSize: '12.5px',
                                cursor: 'pointer'
                              }}
                            >
                              -{pct}%
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleApplyBulkDiscount}
                        style={{
                          marginTop: '4px',
                          padding: '11px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #FF3D5A 0%, #FF7A1A 100%)',
                          color: '#fff',
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: 800,
                          boxShadow: '0 4px 14px rgba(255,61,90,0.3)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Flame size={15} /> Apply -{bulkDiscountVal}% Discount Now
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: ORDERS MANAGEMENT SYSTEM */}
          {/* ========================================================= */}
          {activeTab === 'orders' && (
            <div>
              {/* Filter & Search Bar */}
              <div
                style={{
                  background: '#fff',
                  padding: '18px 24px',
                  borderRadius: '18px',
                  border: '1px solid var(--gray-200)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px', flexWrap: 'wrap' }}>
                  {/* Search Bar */}
                  <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
                    <Search size={16} color="var(--gray-500)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                    <input
                      type="text"
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
                      placeholder="Search by order #, customer name, email..."
                      style={{
                        width: '100%',
                        padding: '9px 14px 9px 38px',
                        borderRadius: '100px',
                        border: '1.5px solid var(--gray-200)',
                        fontSize: '13.5px',
                        color: 'var(--navy)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Status Filter Buttons */}
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
                    {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setOrderStatusFilter(st)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '100px',
                          border: orderStatusFilter === st ? '1.5px solid var(--blue)' : '1px solid var(--gray-200)',
                          background: orderStatusFilter === st ? 'rgba(11,99,246,0.1)' : '#fff',
                          color: orderStatusFilter === st ? 'var(--blue)' : 'var(--gray-600)',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                          textTransform: 'capitalize'
                        }}
                      >
                        {st === 'all' ? `All (${orders.length})` : st}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={async () => {
                    await refreshOrders();
                    showToast('Orders Refreshed', 'Synced latest orders from database.', 'info');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '100px',
                    border: '1px solid var(--gray-300)',
                    background: '#fff',
                    color: 'var(--navy)',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <RefreshCw size={13} /> Refresh Orders
                </button>
              </div>

              {/* Orders Table */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  border: '1px solid var(--gray-200)',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(11,30,61,0.03)'
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                  <thead>
                    <tr
                      style={{
                        background: 'var(--gray-50)',
                        borderBottom: '1.5px solid var(--gray-200)',
                        color: 'var(--navy)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        fontSize: '11px',
                        letterSpacing: '0.04em'
                      }}
                    >
                      <th style={{ padding: '14px 20px' }}>Order #</th>
                      <th style={{ padding: '14px 16px' }}>Customer</th>
                      <th style={{ padding: '14px 16px' }}>Date</th>
                      <th style={{ padding: '14px 16px' }}>Items</th>
                      <th style={{ padding: '14px 16px' }}>Total (CAD)</th>
                      <th style={{ padding: '14px 16px' }}>Status</th>
                      <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: 'var(--gray-500)' }}>
                          No orders matched your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => {
                        const totalQty = ord.items.reduce((sum, i) => sum + i.quantity, 0);

                        return (
                          <tr key={ord.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                            <td style={{ padding: '16px 20px' }}>
                              <span
                                style={{
                                  fontFamily: 'var(--font-mono), monospace',
                                  fontWeight: 800,
                                  color: 'var(--blue)',
                                  background: 'rgba(11,99,246,0.08)',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '13px'
                                }}
                              >
                                #{ord.orderNumber}
                              </span>
                            </td>

                            <td style={{ padding: '16px 16px' }}>
                              <div style={{ fontWeight: 800, color: 'var(--navy)' }}>{ord.customerName}</div>
                              <div style={{ fontSize: '11.5px', color: 'var(--gray-500)' }}>{ord.customerEmail}</div>
                            </td>

                            <td style={{ padding: '16px 16px', color: 'var(--gray-600)', fontSize: '12.5px' }}>
                              {new Date(ord.createdAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>

                            <td style={{ padding: '16px 16px', fontWeight: 600, color: 'var(--navy)' }}>
                              {totalQty} {totalQty === 1 ? 'item' : 'items'}
                            </td>

                            <td style={{ padding: '16px 16px', fontWeight: 800, color: 'var(--navy)', fontSize: '14px' }}>
                              ${ord.total.toFixed(2)}
                            </td>

                            <td style={{ padding: '16px 16px' }}>
                              <select
                                value={ord.status}
                                onChange={(e) => {
                                  const newSt = e.target.value as OrderStatus;
                                  updateOrderStatus(ord.id, newSt);
                                  showToast('Status Updated', `Order #${ord.orderNumber} is now ${newSt}.`, 'success');
                                }}
                                style={{
                                  padding: '5px 10px',
                                  borderRadius: '100px',
                                  fontSize: '11.5px',
                                  fontWeight: 800,
                                  border: '1px solid var(--gray-300)',
                                  background:
                                    ord.status === 'delivered'
                                      ? 'rgba(30,166,114,0.12)'
                                      : ord.status === 'shipped'
                                      ? 'rgba(11,99,246,0.12)'
                                      : ord.status === 'processing'
                                      ? 'rgba(255,122,26,0.12)'
                                      : ord.status === 'cancelled'
                                      ? 'rgba(255,61,90,0.12)'
                                      : 'rgba(100,116,139,0.12)',
                                  color:
                                    ord.status === 'delivered'
                                      ? '#1EA672'
                                      : ord.status === 'shipped'
                                      ? '#0B63F6'
                                      : ord.status === 'processing'
                                      ? '#FF7A1A'
                                      : ord.status === 'cancelled'
                                      ? '#FF3D5A'
                                      : '#64748B',
                                  cursor: 'pointer'
                                }}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>

                            <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                              <button
                                onClick={() => {
                                  setSelectedOrderForModal(ord);
                                  setIsOrderModalOpen(true);
                                }}
                                style={{
                                  padding: '6px 14px',
                                  borderRadius: '8px',
                                  border: '1px solid var(--gray-300)',
                                  background: '#fff',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  color: 'var(--blue)',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Eye size={13} /> Inspect
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PRODUCTS CATALOG MANAGER */}
          {/* ========================================================= */}
          {activeTab === 'products' && (
            <div>
              {/* Action & Filter Bar */}
              <div
                style={{
                  background: '#fff',
                  padding: '18px 24px',
                  borderRadius: '18px',
                  border: '1px solid var(--gray-200)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px', flexWrap: 'wrap' }}>
                  {/* Search Bar */}
                  <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
                    <Search size={16} color="var(--gray-500)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, brand, SKU..."
                      style={{
                        width: '100%',
                        padding: '9px 14px 9px 38px',
                        borderRadius: '100px',
                        border: '1.5px solid var(--gray-200)',
                        fontSize: '13.5px',
                        color: 'var(--navy)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      padding: '9px 14px',
                      borderRadius: '100px',
                      border: '1.5px solid var(--gray-200)',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--navy)',
                      background: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Categories ({products.length})</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({products.filter((p) => p.category === c.id).length})
                      </option>
                    ))}
                  </select>

                  {/* Stock Filter */}
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value as any)}
                    style={{
                      padding: '9px 14px',
                      borderRadius: '100px',
                      border: '1.5px solid var(--gray-200)',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--navy)',
                      background: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Stock Statuses</option>
                    <option value="instock">In Stock Only</option>
                    <option value="low">Low Stock (&le; 25)</option>
                    <option value="out">Out of Stock</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}
                  style={{
                    background: 'var(--grad-brand)',
                    color: '#fff',
                    padding: '10px 22px',
                    borderRadius: '100px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(11,99,246,0.3)'
                  }}
                >
                  <Plus size={16} /> Add New Product
                </button>
              </div>

              {/* Products Table */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  border: '1px solid var(--gray-200)',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(11,30,61,0.03)'
                }}
              >
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                    <thead>
                      <tr
                        style={{
                          background: 'var(--gray-50)',
                          borderBottom: '1.5px solid var(--gray-200)',
                          color: 'var(--navy)',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          fontSize: '11px',
                          letterSpacing: '0.04em'
                        }}
                      >
                        <th style={{ padding: '14px 20px' }}>Product</th>
                        <th style={{ padding: '14px 16px' }}>Category</th>
                        <th style={{ padding: '14px 16px' }}>Price ($)</th>
                        <th style={{ padding: '14px 16px' }}>Was Price</th>
                        <th style={{ padding: '14px 16px' }}>Discount</th>
                        <th style={{ padding: '14px 16px' }}>Stock &amp; Restock</th>
                        <th style={{ padding: '14px 16px' }}>Badge</th>
                        <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => {
                        const discountPct = p.wasPrice && p.wasPrice > p.price ? Math.round(((p.wasPrice - p.price) / p.wasPrice) * 100) : null;
                        const isLowStock = p.inStock && (p.stockCount ?? 20) <= getProductLowStockThreshold(p);
                        const isOut = !p.inStock || p.badge === 'out';

                        return (
                          <tr key={p.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                            {/* Product Info */}
                            <td style={{ padding: '14px 20px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div
                                  style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '12px',
                                    background: 'var(--gray-100)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    overflow: 'hidden',
                                    border: '1px solid var(--gray-200)'
                                  }}
                                >
                                  {p.imageUrl ? (
                                    <Image src={p.imageUrl} alt={p.name} width={46} height={46} style={{ objectFit: 'cover' }} />
                                  ) : (
                                    <ProductIcon type={p.iconType} size={22} />
                                  )}
                                </div>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase' }}>
                                    {p.brand} · <span className="mono">{p.sku}</span>
                                  </div>
                                  <div style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '13.5px' }}>
                                    {p.name}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td style={{ padding: '14px 16px' }}>
                              <span
                                style={{
                                  fontSize: '11.5px',
                                  fontWeight: 700,
                                  background: 'var(--gray-100)',
                                  color: 'var(--navy)',
                                  padding: '3px 10px',
                                  borderRadius: '100px'
                                }}
                              >
                                {p.categoryName}
                              </span>
                            </td>

                            {/* Price */}
                            <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--navy)' }}>
                              ${p.price.toFixed(2)}
                            </td>

                            {/* Was Price */}
                            <td style={{ padding: '14px 16px', color: 'var(--gray-500)', textDecoration: p.wasPrice ? 'line-through' : 'none' }}>
                              {p.wasPrice ? `$${p.wasPrice.toFixed(2)}` : '—'}
                            </td>

                            {/* Discount */}
                            <td style={{ padding: '14px 16px' }}>
                              {discountPct ? (
                                <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#FF3D5A', background: 'rgba(255,61,90,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                  -{discountPct}%
                                </span>
                              ) : (
                                <span style={{ color: 'var(--gray-500)', fontSize: '12px' }}>Reg</span>
                              )}
                            </td>

                            {/* Stock and Quick Restock Controls */}
                            <td style={{ padding: '14px 16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span
                                  style={{
                                    fontSize: '11.5px',
                                    fontWeight: 800,
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    background: isOut ? 'rgba(255,61,90,0.15)' : isLowStock ? 'rgba(255,122,26,0.15)' : 'rgba(30,166,114,0.12)',
                                    color: isOut ? '#FF3D5A' : isLowStock ? '#FF7A1A' : '#1EA672'
                                  }}
                                >
                                  {isOut ? 'Out of Stock' : `${p.stockCount ?? 20} in stock`}
                                </span>

                                <button
                                  onClick={() => {
                                    restockProduct(p.id, 10);
                                    showToast('Restocked +10', `${p.name} updated.`, 'success');
                                  }}
                                  style={{
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    border: '1px solid var(--gray-300)',
                                    background: '#fff',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color: 'var(--navy)',
                                    cursor: 'pointer'
                                  }}
                                  title="Add 10 units"
                                >
                                  +10
                                </button>
                              </div>
                            </td>

                            {/* Badge */}
                            <td style={{ padding: '14px 16px' }}>
                              {p.badgeText ? (
                                <span style={{ fontSize: '10.5px', fontWeight: 800, background: '#0B63F6', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>
                                  {p.badgeText}
                                </span>
                              ) : (
                                <span style={{ color: 'var(--gray-500)', fontSize: '12px' }}>None</span>
                              )}
                            </td>

                            {/* Actions */}
                            <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '8px' }}>
                                <Link
                                  href={`/product/${p.id}`}
                                  target="_blank"
                                  style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--gray-200)', background: '#fff', color: 'var(--gray-600)', display: 'inline-flex' }}
                                  title="View on store"
                                >
                                  <ExternalLink size={13} />
                                </Link>

                                <button
                                  onClick={() => {
                                    setEditingProduct(p);
                                    setIsProductModalOpen(true);
                                  }}
                                  style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--gray-200)', background: '#fff', color: 'var(--blue)', cursor: 'pointer' }}
                                  title="Edit product"
                                >
                                  <Edit2 size={13} />
                                </button>

                                <button
                                  onClick={() => setDeleteConfirmId(p.id)}
                                  style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--gray-200)', background: '#fff', color: '#FF3D5A', cursor: 'pointer' }}
                                  title="Delete product"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: PROMOTIONS & CAMPAIGNS MANAGER */}
          {/* ========================================================= */}
          {activeTab === 'campaigns' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                    Promotional Hero Campaigns
                  </h2>
                  <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Manage high-visibility store banners &amp; category discounts</span>
                </div>

                <button
                  onClick={() => {
                    setEditingCampaign(null);
                    setIsCampaignModalOpen(true);
                  }}
                  style={{
                    background: 'var(--grad-brand)',
                    color: '#fff',
                    padding: '10px 22px',
                    borderRadius: '100px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(11,99,246,0.3)'
                  }}
                >
                  <Plus size={16} /> New Campaign
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
                {campaigns.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      background: '#fff',
                      borderRadius: '20px',
                      border: '1px solid var(--gray-200)',
                      padding: '24px',
                      boxShadow: '0 2px 12px rgba(11,30,61,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, background: '#FF7A1A', color: '#fff', padding: '3px 10px', borderRadius: '6px' }}>
                          {c.badgeText}
                        </span>

                        <button
                          onClick={() => toggleCampaign(c.id)}
                          style={{
                            padding: '4px 12px',
                            borderRadius: '100px',
                            fontSize: '11px',
                            fontWeight: 800,
                            background: c.isActive ? 'rgba(30,166,114,0.12)' : 'rgba(255,61,90,0.12)',
                            color: c.isActive ? '#1EA672' : '#FF3D5A',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {c.isActive ? '● Active' : '○ Inactive'}
                        </button>
                      </div>

                      <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 6px' }}>
                        {c.name}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--gray-600)', margin: '0 0 16px', lineHeight: 1.5 }}>
                        {c.subtitle}
                      </p>

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {c.discountPercent && (
                          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--blue)', background: 'rgba(11,99,246,0.1)', padding: '3px 8px', borderRadius: '4px' }}>
                            {c.discountPercent}% OFF
                          </span>
                        )}
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray-600)', background: 'var(--gray-100)', padding: '3px 8px', borderRadius: '4px' }}>
                          Duration: {c.startDate} to {c.endDate}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--gray-100)', paddingTop: '14px' }}>
                      <Link href={c.linkUrl} target="_blank" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <span>Preview Banner</span> <ExternalLink size={12} />
                      </Link>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => {
                            setEditingCampaign(c);
                            setIsCampaignModalOpen(true);
                          }}
                          style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--gray-200)', background: '#fff', fontSize: '12px', fontWeight: 700, color: 'var(--blue)', cursor: 'pointer' }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteCampaign(c.id);
                            showToast('Campaign Deleted', `Campaign "${c.name}" was removed.`, 'info');
                          }}
                          style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--gray-200)', background: '#fff', color: '#FF3D5A', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: PROMO CODES & COUPONS */}
          {/* ========================================================= */}
          {activeTab === 'promos' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                    Promotional Coupon Codes
                  </h2>
                  <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Customer checkout discounts &amp; usage limits</span>
                </div>

                <button
                  onClick={() => {
                    setEditingPromo(null);
                    setIsPromoModalOpen(true);
                  }}
                  style={{
                    background: 'var(--grad-brand)',
                    color: '#fff',
                    padding: '10px 22px',
                    borderRadius: '100px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(11,99,246,0.3)'
                  }}
                >
                  <Plus size={16} /> Add Promo Code
                </button>
              </div>

              <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--gray-200)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ background: 'var(--gray-50)', borderBottom: '1.5px solid var(--gray-200)', color: 'var(--navy)', fontWeight: 800, textTransform: 'uppercase', fontSize: '11px' }}>
                      <th style={{ padding: '14px 20px' }}>Coupon Code</th>
                      <th style={{ padding: '14px 16px' }}>Discount Value</th>
                      <th style={{ padding: '14px 16px' }}>Min Spend</th>
                      <th style={{ padding: '14px 16px' }}>Description</th>
                      <th style={{ padding: '14px 16px' }}>Times Used</th>
                      <th style={{ padding: '14px 16px' }}>Status</th>
                      <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCodes.map((p) => (
                      <tr key={p.code} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--blue)', fontSize: '14px', background: 'rgba(11,99,246,0.08)', padding: '4px 10px', borderRadius: '6px' }}>
                            {p.code}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--navy)' }}>
                          {p.discountPercent ? `${p.discountPercent}% OFF` : `$${p.discountAmount?.toFixed(2)} OFF`}
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--gray-700)' }}>
                          {p.minSpend ? `$${p.minSpend.toFixed(2)}` : 'None ($0)'}
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--gray-700)' }}>
                          {p.description}
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--navy)' }}>
                          {p.usedCount} orders
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <button
                            onClick={() => togglePromoCode(p.code)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '100px',
                              fontSize: '11px',
                              fontWeight: 800,
                              background: p.isActive ? 'rgba(30,166,114,0.1)' : 'rgba(255,61,90,0.1)',
                              color: p.isActive ? '#1EA672' : '#FF3D5A',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            {p.isActive ? '● Active' : '○ Inactive'}
                          </button>
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => {
                                setEditingPromo(p);
                                setIsPromoModalOpen(true);
                              }}
                              style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--gray-200)', background: '#fff', color: 'var(--blue)', cursor: 'pointer' }}
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => {
                                deletePromoCode(p.code);
                                showToast('Promo Code Removed', `Coupon ${p.code} was deleted.`, 'info');
                              }}
                              style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid var(--gray-200)', background: '#fff', color: '#FF3D5A', cursor: 'pointer' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: CUSTOMER INQUIRIES & NEWSLETTER LEADS */}
          {/* ========================================================= */}
          {activeTab === 'leads' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Top Summary */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                    Customer Inquiries &amp; Newsletter Leads
                  </h2>
                  <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>
                    Direct customer contact messages and marketing subscribers
                  </span>
                </div>
              </div>

              {/* Grid: Messages & Subscribers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
                {/* Contact Inquiries Box */}
                <div
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    border: '1px solid var(--gray-200)',
                    padding: '24px',
                    boxShadow: '0 2px 12px rgba(11,30,61,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                    <Mail size={18} color="var(--blue)" />
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                      Customer Messages ({inquiries.length})
                    </h3>
                  </div>

                  {inquiries.length === 0 ? (
                    <div style={{ padding: '30px', textAlign: 'center', color: 'var(--gray-500)', fontSize: '13.5px', background: 'var(--gray-50)', borderRadius: '12px' }}>
                      No contact messages received yet. New inquiries submitted from the website will appear here in real time.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          style={{
                            padding: '16px',
                            borderRadius: '14px',
                            background: 'var(--gray-50)',
                            border: '1px solid var(--gray-200)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <strong style={{ fontSize: '14px', color: 'var(--navy)' }}>{inq.subject}</strong>
                            <span style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                              {new Date(inq.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--blue)', fontWeight: 600, marginBottom: '6px' }}>
                            From: {inq.name} ({inq.email}) {inq.phone ? `· ${inq.phone}` : ''}
                          </div>
                          <p style={{ fontSize: '13px', color: 'var(--gray-700)', margin: 0, lineHeight: 1.4 }}>
                            {inq.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Newsletter Subscribers Box */}
                <div
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    border: '1px solid var(--gray-200)',
                    padding: '24px',
                    boxShadow: '0 2px 12px rgba(11,30,61,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                    <Users size={18} color="#1EA672" />
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                      Subscribers ({subscribers.length})
                    </h3>
                  </div>

                  {subscribers.length === 0 ? (
                    <div style={{ padding: '30px', textAlign: 'center', color: 'var(--gray-500)', fontSize: '13.5px', background: 'var(--gray-50)', borderRadius: '12px' }}>
                      No newsletter subscribers recorded yet.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {subscribers.map((sub) => (
                        <div
                          key={sub.id}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '10px',
                            background: 'var(--gray-50)',
                            border: '1px solid var(--gray-200)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy)' }}>{sub.email}</span>
                          <span style={{ fontSize: '11px', color: '#1EA672', fontWeight: 800 }}>● Active</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: SETTINGS, DATABASE & SECURITY */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>
                System Architecture, Cloud Database &amp; Security
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Inventory Low-Stock Notification Settings */}
                <div
                  style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '20px',
                    border: '1.5px solid #FF7A1A',
                    boxShadow: '0 8px 30px rgba(255, 122, 26, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(255, 122, 26, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FF7A1A'
                      }}
                    >
                      <Bell size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                        Inventory Low-Stock Alert Configuration
                      </h3>
                      <span style={{ fontSize: '12.5px', color: 'var(--gray-500)' }}>
                        Configure when the admin is notified as item quantities get low
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSaveInventoryAlertConfig} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
                          Low-Stock Warning Threshold (Units)
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={lowThresholdInput}
                          onChange={(e) => setLowThresholdInput(Math.max(1, parseInt(e.target.value, 10) || 1))}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid var(--gray-200)',
                            fontSize: '14px',
                            fontWeight: 700
                          }}
                        />
                        <span style={{ fontSize: '11px', color: 'var(--gray-500)', display: 'block', marginTop: '4px' }}>
                          Notify when product quantity is ≤ this number (unless overridden per product)
                        </span>
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
                          Critical / Urgent Threshold (Units)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={lowThresholdInput}
                          value={criticalThresholdInput}
                          onChange={(e) => setCriticalThresholdInput(Math.max(0, parseInt(e.target.value, 10) || 0))}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid var(--gray-200)',
                            fontSize: '14px',
                            fontWeight: 700
                          }}
                        />
                        <span style={{ fontSize: '11px', color: 'var(--gray-500)', display: 'block', marginTop: '4px' }}>
                          Highlighted in urgent red when stock drops ≤ this number
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px 14px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={notifyDashboardInput}
                          onChange={(e) => setNotifyDashboardInput(e.target.checked)}
                          style={{ width: '16px', height: '16px', accentColor: '#FF7A1A' }}
                        />
                        <span>Show Low-Stock Alert Banner on Admin Dashboard</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={notifyToastInput}
                          onChange={(e) => setNotifyToastInput(e.target.checked)}
                          style={{ width: '16px', height: '16px', accentColor: '#FF7A1A' }}
                        />
                        <span>Show Pop-Up Toast Notification when opening Admin Portal with low stock</span>
                      </label>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: allLowStockAlerts.length > 0 ? '#DC2626' : '#1EA672' }}>
                        Currently {allLowStockAlerts.length} product(s) trigger this alert.
                      </span>

                      <button
                        type="submit"
                        style={{
                          padding: '10px 20px',
                          borderRadius: '10px',
                          background: '#FF7A1A',
                          color: '#fff',
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        Save Alert Settings
                      </button>
                    </div>
                  </form>
                </div>

                {/* Security Passcode Settings */}
                <div
                  style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '20px',
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(255, 61, 90, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FF3D5A'
                      }}
                    >
                      <Lock size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                        Admin Gate Security (Server-Verified)
                      </h3>
                      <span style={{ fontSize: '12.5px', color: 'var(--gray-500)' }}>
                        Authentication is enforced server-side via HttpOnly signed sessions
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      fontSize: '13px',
                      color: '#334155',
                      lineHeight: 1.6
                    }}
                  >
                    <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#0F172A' }}>
                      Server-Side Credential Protection Active
                    </p>
                    <p style={{ margin: 0 }}>
                      Admin credentials are stored as salted scrypt hashes in server-only environment variables
                      (<code style={{ background: '#E2E8F0', padding: '1px 6px', borderRadius: '4px' }}>ADMIN_USERNAME</code> and{' '}
                      <code style={{ background: '#E2E8F0', padding: '1px 6px', borderRadius: '4px' }}>ADMIN_PASSWORD_HASH</code>)
                      and cannot be viewed or modified from browser storage or DevTools. To rotate the admin password,
                      update <code style={{ background: '#E2E8F0', padding: '1px 6px', borderRadius: '4px' }}>.env.local</code> on the server and restart.
                    </p>
                  </div>
                </div>

                {/* Supabase Database Card */}
                <div
                  style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '20px',
                    border: '1.5px solid #0B63F6',
                    boxShadow: '0 8px 30px rgba(11,99,246,0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, rgba(11,99,246,0.15) 0%, rgba(63,169,255,0.15) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--blue)'
                        }}
                      >
                        <Database size={22} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                            Supabase Cloud Database
                          </h3>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 800,
                              padding: '3px 8px',
                              borderRadius: '100px',
                              background: supabaseStatus.connected
                                ? supabaseStatus.tablesExist
                                  ? 'rgba(30,166,114,0.15)'
                                  : 'rgba(255,122,26,0.15)'
                                : 'rgba(255,61,90,0.15)',
                              color: supabaseStatus.connected
                                ? supabaseStatus.tablesExist
                                  ? '#1EA672'
                                  : '#FF7A1A'
                                : '#FF3D5A'
                            }}
                          >
                            {supabaseStatus.isChecking
                              ? 'Connecting...'
                              : supabaseStatus.connected
                              ? supabaseStatus.tablesExist
                                ? 'LIVE & SYNCED'
                                : 'SCHEMA PENDING'
                              : 'OFFLINE'}
                          </span>
                        </div>
                        <span className="mono" style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                          https://argkashxfnbqjoqonyfh.supabase.co
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        const res = await checkDatabaseConnection();
                        if (res.connected) {
                          showToast('Database Connected! 🟢', res.message, 'success');
                        } else {
                          showToast('Connection Failed 🔴', res.message, 'error');
                        }
                      }}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--gray-300)',
                        background: '#fff',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: 'var(--navy)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RefreshCw size={13} /> Test Connection
                    </button>
                  </div>

                  <div
                    style={{
                      background: 'var(--gray-50)',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      marginBottom: '18px',
                      fontSize: '13px',
                      color: 'var(--navy)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                      <Cloud size={16} color="var(--blue)" />
                      <span>Status: {supabaseStatus.message}</span>
                    </div>
                    {supabaseStatus.lastChecked && (
                      <span style={{ fontSize: '11px', color: 'var(--gray-500)', marginLeft: '24px' }}>
                        Last checked at: {supabaseStatus.lastChecked}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <button
                      disabled={isSyncingDb}
                      onClick={async () => {
                        setIsSyncingDb(true);
                        showToast('Syncing...', 'Uploading catalog data to Supabase...', 'info');
                        try {
                          const result = await syncCatalogToSupabase();
                          if (result.success) {
                            showToast('Sync Completed! 🚀', result.message, 'success');
                          } else {
                            showToast('Sync Warning', result.message, 'warning');
                          }
                        } catch (err: any) {
                          showToast('Sync Error', err?.message || 'Failed to sync with Supabase', 'error');
                        } finally {
                          setIsSyncingDb(false);
                        }
                      }}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #0B63F6 0%, #7C3AED 100%)',
                        color: '#fff',
                        border: 'none',
                        fontSize: '13.5px',
                        fontWeight: 800,
                        cursor: isSyncingDb ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(11,99,246,0.3)'
                      }}
                    >
                      <Upload size={16} />
                      <span>{isSyncingDb ? 'Syncing...' : 'Sync Catalog to Supabase Cloud'}</span>
                    </button>
                  </div>
                </div>

                {/* PayPal & Apple Pay Payment Gateway Connectivity Card */}
                <div
                  style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '20px',
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'rgba(0, 121, 193, 0.12)',
                          color: '#0079C1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <CreditCard size={22} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                            PayPal &amp; Apple Pay Payment Gateway
                          </h3>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 800,
                              padding: '3px 8px',
                              borderRadius: '100px',
                              background: paypalTestResult?.authenticated
                                ? 'rgba(30,166,114,0.15)'
                                : paypalTestResult?.credentialsConfigured
                                ? 'rgba(255,61,90,0.15)'
                                : 'rgba(255,122,26,0.15)',
                              color: paypalTestResult?.authenticated
                                ? '#1EA672'
                                : paypalTestResult?.credentialsConfigured
                                ? '#FF3D5A'
                                : '#FF7A1A'
                            }}
                          >
                            {isCheckingPaypal
                              ? 'Checking...'
                              : paypalTestResult?.authenticated
                              ? 'CONNECTED & ACTIVE'
                              : paypalTestResult?.credentialsConfigured
                              ? 'AUTH FAILED'
                              : 'KEYS NEEDED'}
                          </span>
                        </div>
                        <span style={{ fontSize: '12.5px', color: 'var(--gray-600)' }}>
                          Referencing <code>getting-started-guide-buy-button-nextjs</code> · Canadian Dollar (CAD) Payments
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        setIsCheckingPaypal(true);
                        try {
                          const response = await fetch('/api/paypal/test-connection');
                          const res = await response.json();
                          setPaypalTestResult(res);
                          if (res.authenticated) {
                            showToast('PayPal API Connected! 🟢', res.message, 'success');
                          } else if (res.credentialsConfigured) {
                            showToast('PayPal Auth Failed 🔴', res.message, 'error');
                          } else {
                            showToast('PayPal Keys Missing ⚠️', res.message, 'warning');
                          }
                        } catch (err: any) {
                          showToast('Connectivity Check Failed', err.message, 'error');
                        } finally {
                          setIsCheckingPaypal(false);
                        }
                      }}
                      disabled={isCheckingPaypal}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--gray-300)',
                        background: '#fff',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: 'var(--navy)',
                        cursor: isCheckingPaypal ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RefreshCw size={13} className={isCheckingPaypal ? 'spin' : ''} />
                      <span>{isCheckingPaypal ? 'Testing API...' : 'Test PayPal Connectivity'}</span>
                    </button>
                  </div>

                  {paypalTestResult ? (
                    <div
                      style={{
                        padding: '14px 16px',
                        borderRadius: '12px',
                        background: paypalTestResult.authenticated ? '#F0FDF4' : '#FEF2F2',
                        border: `1px solid ${paypalTestResult.authenticated ? '#BBF7D0' : '#FECACA'}`,
                        fontSize: '13px',
                        color: paypalTestResult.authenticated ? '#166534' : '#991B1B',
                        lineHeight: 1.5
                      }}
                    >
                      <strong>Diagnostic Result:</strong> {paypalTestResult.message}
                      {paypalTestResult.clientIdMasked && (
                        <div style={{ marginTop: '6px', fontSize: '12px' }}>
                          Client ID: <code>{paypalTestResult.clientIdMasked}</code> · Environment: <strong>{paypalTestResult.environment}</strong>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        background: 'var(--gray-50)',
                        border: '1px solid var(--gray-200)',
                        fontSize: '12.5px',
                        color: 'var(--gray-700)',
                        lineHeight: 1.5
                      }}
                    >
                      Click <strong>&quot;Test PayPal Connectivity&quot;</strong> to verify live connection to PayPal servers and validate your API credentials from <code>.env.local</code>.
                    </div>
                  )}
                </div>

                {/* Local JSON Backup & Recovery */}
                <div
                  style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '20px',
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
                  }}
                >
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 8px' }}>
                    Local Data Backup &amp; Disaster Recovery
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--gray-600)', margin: '0 0 16px' }}>
                    Export a standalone JSON file containing your entire product catalog, promotional campaigns, orders, and promo codes.
                  </p>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleExport}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '10px',
                        border: '1px solid var(--gray-300)',
                        background: '#fff',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--navy)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Download size={15} /> Export JSON Snapshot
                    </button>

                    <label
                      style={{
                        padding: '10px 18px',
                        borderRadius: '10px',
                        border: '1px solid var(--gray-300)',
                        background: '#fff',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--navy)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Upload size={15} /> Import Backup File
                      <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
                    </label>

                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset the store catalog and promotions back to factory defaults?')) {
                          resetToDefaults();
                          showToast('Catalog Reset', 'Products and promotions restored to original defaults.', 'info');
                        }
                      }}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,61,90,0.3)',
                        background: 'rgba(255,61,90,0.08)',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#FF3D5A',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RotateCcw size={14} /> Factory Reset
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>

        {/* ========================================================= */}
        {/* GLOBAL MODALS */}
        {/* ========================================================= */}

        {/* Product Create / Edit Modal */}
        <ProductFormModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          onSave={handleSaveProduct}
          productToEdit={editingProduct}
        />

        {/* Campaign Create / Edit Modal */}
        <CampaignFormModal
          isOpen={isCampaignModalOpen}
          onClose={() => setIsCampaignModalOpen(false)}
          onSave={handleSaveCampaign}
          campaignToEdit={editingCampaign}
        />

        {/* Promo Code Create / Edit Modal */}
        <PromoCodeModal
          isOpen={isPromoModalOpen}
          onClose={() => setIsPromoModalOpen(false)}
          onSave={handleSavePromo}
          promoToEdit={editingPromo}
        />

        {/* Order Details Breakdown Modal */}
        <OrderDetailsModal
          isOpen={isOrderModalOpen}
          order={selectedOrderForModal}
          onClose={() => setIsOrderModalOpen(false)}
          onUpdateStatus={(orderId, st) => {
            updateOrderStatus(orderId, st);
            if (selectedOrderForModal && selectedOrderForModal.id === orderId) {
              setSelectedOrderForModal({ ...selectedOrderForModal, status: st });
            }
            showToast('Order Status Updated', `Order status changed to ${st}.`, 'success');
          }}
        />

        {/* Delete Product Confirmation Modal */}
        {deleteConfirmId && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(11,30,61,0.7)',
              backdropFilter: 'blur(6px)',
              zIndex: 250,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setDeleteConfirmId(null)}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '28px',
                maxWidth: '440px',
                width: '100%',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                textAlign: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,61,90,0.1)', color: '#FF3D5A', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Trash2 size={24} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 8px' }}>
                Delete this product?
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--gray-700)', margin: '0 0 20px', lineHeight: 1.4 }}>
                This will permanently remove the item from the live shop catalog and search results.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  style={{ padding: '10px 20px', borderRadius: '10px', border: '1.5px solid var(--gray-300)', background: '#fff', fontSize: '13.5px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteProduct(deleteConfirmId);
                    setDeleteConfirmId(null);
                    showToast('Product Deleted', 'Item removed from catalog.', 'info');
                  }}
                  style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', background: '#FF3D5A', color: '#fff', fontSize: '13.5px', fontWeight: 800, cursor: 'pointer' }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminAuthGate>
  );
}
