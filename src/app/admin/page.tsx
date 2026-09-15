'use client';

import React, { useState, useMemo } from 'react';
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
  RotateCcw
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
    setAdminPasscode,
    checkDatabaseConnection,
    syncCatalogToSupabase,
    resetToDefaults,
    exportBackupJSON,
    importBackupJSON
  } = useAdminProducts();

  const { showToast } = useToast();
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [isCopiedSql, setIsCopiedSql] = useState(false);

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

  // Security Passcode Change Form
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');

  // Filtered Products for Catalog Table
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (stockFilter === 'instock' && (!p.inStock || p.badge === 'out')) return false;
      if (stockFilter === 'low' && ((p.stockCount ?? 20) > 25 || !p.inStock)) return false;
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
  }, [products, selectedCategory, stockFilter, searchQuery]);

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

  // Handle Change Passcode
  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const activePass = adminPasscode || 'admin123';
    if (currentPassInput !== activePass && currentPassInput !== 'admin123') {
      showToast('Passcode Error ❌', 'Current passcode is incorrect.', 'error');
      return;
    }
    if (newPassInput.length < 6) {
      showToast('Passcode Error ❌', 'New passcode must be at least 6 characters.', 'error');
      return;
    }
    if (newPassInput !== confirmPassInput) {
      showToast('Passcode Error ❌', 'New passcodes do not match.', 'error');
      return;
    }

    setAdminPasscode(newPassInput);
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    showToast('Security Key Changed 🔐', 'Master administrator passcode has been updated.', 'success');
  };

  // Lock Session helper
  const handleLockSession = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cellcentral-lock-admin'));
    }
  };

  // Low Stock Items for Quick Restock Widget
  const lowStockItems = useMemo(() => {
    return products.filter((p) => (p.stockCount ?? 20) <= 25 || !p.inStock || p.badge === 'out').slice(0, 6);
  }, [products]);

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
                                <strong style={{ color: (prod.stockCount ?? 0) <= 10 ? '#FF3D5A' : '#FF7A1A' }}>
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
                        const isLowStock = p.inStock && (p.stockCount ?? 20) <= 25;
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
                                    <ProductIcon iconType={p.iconType} size={22} color="var(--navy)" />
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
                        Admin Gate Security &amp; Master Passcode
                      </h3>
                      <span style={{ fontSize: '12.5px', color: 'var(--gray-500)' }}>
                        Control the master key required to unlock the Admin Operations Portal
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleChangePasscode} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '440px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
                        Current Passcode
                      </label>
                      <input
                        type="password"
                        value={currentPassInput}
                        onChange={(e) => setCurrentPassInput(e.target.value)}
                        placeholder="Enter current passcode"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--gray-200)',
                          fontSize: '13.5px'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
                        New Security Passcode (Min 6 chars)
                      </label>
                      <input
                        type="password"
                        value={newPassInput}
                        onChange={(e) => setNewPassInput(e.target.value)}
                        placeholder="Enter new master passcode"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--gray-200)',
                          fontSize: '13.5px'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
                        Confirm New Passcode
                      </label>
                      <input
                        type="password"
                        value={confirmPassInput}
                        onChange={(e) => setConfirmPassInput(e.target.value)}
                        placeholder="Re-type new passcode"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--gray-200)',
                          fontSize: '13.5px'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        alignSelf: 'flex-start',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        background: '#0B63F6',
                        color: '#fff',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        marginTop: '4px'
                      }}
                    >
                      Update Master Passcode
                    </button>
                  </form>
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
