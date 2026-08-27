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
  Check
} from 'lucide-react';
import { useAdminProducts } from '@/context/AdminProductContext';
import { useToast } from '@/context/ToastContext';
import { Product, ProductCategory } from '@/types/product';
import { PromotionCampaign, PromoCode } from '@/types/admin';
import { CATEGORIES, BRANDS } from '@/data/products';
import { ProductIcon } from '@/components/product/ProductIcon';
import { ProductFormModal } from '@/components/admin/ProductFormModal';
import { CampaignFormModal } from '@/components/admin/CampaignFormModal';
import { PromoCodeModal } from '@/components/admin/PromoCodeModal';

export default function AdminPage() {
  const {
    products,
    campaigns,
    promoCodes,
    stats,
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
    resetToDefaults,
    exportBackupJSON,
    importBackupJSON
  } = useAdminProducts();

  const { showToast } = useToast();

  // Active Admin View Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'campaigns' | 'promos' | 'settings'>('dashboard');

  // Product List Table States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'low' | 'out'>('all');

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
    showToast('Backup Exported 📁', 'Catalog and promo settings saved to JSON file.', 'success');
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
        showToast('Backup Restored! ✅', 'Catalog, campaigns, and promo codes loaded.', 'success');
      } else {
        showToast('Import Failed ❌', 'Invalid backup JSON format.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Top Admin Navigation Bar */}
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
                textTransform: 'uppercase'
              }}
            >
              ADMIN PORTAL
            </div>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              <span>View Storefront</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{ background: '#0F274D', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="wrap" style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '0 24px' }}>
            {[
              { id: 'dashboard', label: 'Dashboard & Metrics', icon: LayoutDashboard },
              { id: 'products', label: `Products (${products.length})`, icon: Package },
              { id: 'campaigns', label: `Promotions & Campaigns (${campaigns.length})`, icon: Sparkles },
              { id: 'promos', label: `Promo Codes (${promoCodes.length})`, icon: Tag },
              { id: 'settings', label: 'Settings & Data Backup', icon: Settings }
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
                    padding: '14px 20px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: isSel ? '#fff' : '#A2B4D2',
                    borderBottom: isSel ? '3px solid #3FA9FF' : '3px solid transparent',
                    background: isSel ? 'rgba(255,255,255,0.05)' : 'transparent',
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

      {/* Main Content Area */}
      <main className="wrap" style={{ paddingTop: '28px' }}>
        
        {/* ========================================================= */}
        {/* TAB 1: DASHBOARD & KPI METRICS */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div>
            {/* KPI Summary Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              
              {/* Card 1: Total Catalog Value */}
              <div style={{ background: '#fff', padding: '22px', borderRadius: '18px', border: '1px solid var(--gray-200)', boxShadow: '0 2px 10px rgba(11,30,61,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-700)', textTransform: 'uppercase' }}>Catalog Value</span>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(30,166,114,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign size={20} color="#1EA672" />
                  </div>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginTop: '10px' }}>
                  ${stats.totalInventoryValue.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '12.5px', color: '#1EA672', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={14} /> Total warehouse stock estimated
                </div>
              </div>

              {/* Card 2: Active Products */}
              <div style={{ background: '#fff', padding: '22px', borderRadius: '18px', border: '1px solid var(--gray-200)', boxShadow: '0 2px 10px rgba(11,30,61,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-700)', textTransform: 'uppercase' }}>Live SKUs</span>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(11,99,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={20} color="var(--blue)" />
                  </div>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginTop: '10px' }}>
                  {stats.totalProducts} Products
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--gray-700)', fontWeight: 600, marginTop: '4px' }}>
                  Across {CATEGORIES.length} official categories
                </div>
              </div>

              {/* Card 3: Active Campaigns */}
              <div style={{ background: '#fff', padding: '22px', borderRadius: '18px', border: '1px solid var(--gray-200)', boxShadow: '0 2px 10px rgba(11,30,61,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-700)', textTransform: 'uppercase' }}>Active Promotions</span>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,122,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={20} color="#FF7A1A" />
                  </div>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#FF7A1A', marginTop: '10px' }}>
                  {stats.activeCampaignsCount} Live
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--gray-700)', fontWeight: 600, marginTop: '4px' }}>
                  Avg discount: {stats.avgDiscountPercent}% OFF
                </div>
              </div>

              {/* Card 4: Inventory Alerts */}
              <div style={{ background: '#fff', padding: '22px', borderRadius: '18px', border: '1px solid var(--gray-200)', boxShadow: '0 2px 10px rgba(11,30,61,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-700)', textTransform: 'uppercase' }}>Inventory Status</span>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,61,90,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle size={20} color="#FF3D5A" />
                  </div>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: stats.lowStockCount > 0 ? '#FF3D5A' : 'var(--navy)', marginTop: '10px' }}>
                  {stats.lowStockCount} Low Stock
                </div>
                <div style={{ fontSize: '12.5px', color: stats.outOfStockCount > 0 ? '#FF3D5A' : 'var(--gray-700)', fontWeight: 600, marginTop: '4px' }}>
                  {stats.outOfStockCount} out-of-stock items
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Inventory Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px' }}>
              
              {/* Left Box: Active Campaigns Showcase */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid var(--gray-200)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)' }}>
                    Active Promotional Campaigns
                  </h3>
                  <button
                    onClick={() => setActiveTab('campaigns')}
                    style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    View All <ArrowUpRight size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {campaigns.filter((c) => c.isActive).slice(0, 3).map((camp) => (
                    <div
                      key={camp.id}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '14px',
                        background: 'var(--gray-50)',
                        border: '1px solid var(--gray-200)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 800, background: '#FF7A1A', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>
                            {camp.badgeText}
                          </span>
                          <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--navy)' }}>
                            {camp.name}
                          </span>
                        </div>
                        <p style={{ fontSize: '12.5px', color: 'var(--gray-700)', margin: '4px 0 0' }}>
                          {camp.subtitle}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setEditingCampaign(camp);
                          setIsCampaignModalOpen(true);
                        }}
                        style={{
                          padding: '6px 14px',
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

              {/* Right Box: Quick Discount Flash Sale Applicator */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid var(--gray-200)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,61,90,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Flame size={20} color="#FF3D5A" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                      Category Flash Sale Tool
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--gray-700)' }}>Apply instant price discounts</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Target Category
                    </label>
                    <select
                      value={bulkCategory}
                      onChange={(e) => setBulkCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--gray-200)',
                        fontSize: '13.5px',
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
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Discount Percentage (% OFF)
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[15, 20, 25, 30].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setBulkDiscountVal(pct)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '8px',
                            border: bulkDiscountVal === pct ? '1.5px solid #FF3D5A' : '1px solid var(--gray-200)',
                            background: bulkDiscountVal === pct ? 'rgba(255,61,90,0.08)' : '#fff',
                            color: bulkDiscountVal === pct ? '#FF3D5A' : 'var(--navy)',
                            fontWeight: 800,
                            fontSize: '13px',
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
                      marginTop: '6px',
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #FF3D5A 0%, #FF7A1A 100%)',
                      color: '#fff',
                      border: 'none',
                      fontSize: '13.5px',
                      fontWeight: 800,
                      boxShadow: '0 4px 14px rgba(255,61,90,0.3)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Flame size={16} /> Apply -{bulkDiscountVal}% Discount Now
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PRODUCTS CATALOG MANAGER */}
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
                  <Search size={16} color="var(--gray-700)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
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
                    <tr style={{ background: 'var(--gray-50)', borderBottom: '1.5px solid var(--gray-200)', color: 'var(--navy)', fontWeight: 800, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '14px 20px' }}>Product</th>
                      <th style={{ padding: '14px 16px' }}>Category</th>
                      <th style={{ padding: '14px 16px' }}>Price ($)</th>
                      <th style={{ padding: '14px 16px' }}>Was Price</th>
                      <th style={{ padding: '14px 16px' }}>Discount</th>
                      <th style={{ padding: '14px 16px' }}>Stock</th>
                      <th style={{ padding: '14px 16px' }}>Badge</th>
                      <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => {
                      const discount = p.wasPrice && p.wasPrice > p.price
                        ? Math.round(((p.wasPrice - p.price) / p.wasPrice) * 100)
                        : 0;
                      return (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background 0.1s ease' }}>
                          {/* Product Info & Thumbnail */}
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <div
                                style={{
                                  width: '46px',
                                  height: '46px',
                                  borderRadius: '10px',
                                  background: 'var(--gray-50)',
                                  border: '1px solid var(--gray-200)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flex: 'none',
                                  overflow: 'hidden',
                                  padding: '4px'
                                }}
                              >
                                {p.imageUrl ? (
                                  <img src={p.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                  <ProductIcon type={p.iconType} size="80%" />
                                )}
                              </div>
                              <div>
                                <div style={{ fontWeight: 800, color: 'var(--navy)', lineHeight: 1.3, maxWidth: '280px' }}>
                                  {p.name}
                                </div>
                                <div style={{ fontSize: '11.5px', color: 'var(--gray-700)', marginTop: '2px', display: 'flex', gap: '8px' }}>
                                  <span style={{ fontWeight: 700, color: 'var(--blue)' }}>{p.brand}</span>
                                  <span style={{ fontFamily: 'monospace' }}>SKU: {p.sku}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td style={{ padding: '14px 16px', color: 'var(--gray-700)', fontWeight: 600 }}>
                            {p.categoryName}
                          </td>

                          {/* Selling Price */}
                          <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--navy)', fontSize: '14.5px' }}>
                            ${p.price.toFixed(2)}
                          </td>

                          {/* Was Price */}
                          <td style={{ padding: '14px 16px', color: 'var(--gray-700)', textDecoration: p.wasPrice ? 'line-through' : 'none' }}>
                            {p.wasPrice ? `$${p.wasPrice.toFixed(2)}` : '—'}
                          </td>

                          {/* Discount % */}
                          <td style={{ padding: '14px 16px' }}>
                            {discount > 0 ? (
                              <span style={{ background: 'rgba(255,61,90,0.1)', color: '#FF3D5A', fontWeight: 800, fontSize: '11.5px', padding: '3px 8px', borderRadius: '6px' }}>
                                -{discount}%
                              </span>
                            ) : (
                              <span style={{ color: 'var(--gray-400)', fontSize: '12px' }}>None</span>
                            )}
                          </td>

                          {/* Stock Status & Inline Toggle */}
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <button
                                onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                                title="Click to toggle stock status"
                                style={{
                                  padding: '4px 10px',
                                  borderRadius: '100px',
                                  fontSize: '11.5px',
                                  fontWeight: 800,
                                  background: p.inStock ? 'rgba(30,166,114,0.1)' : 'rgba(255,61,90,0.1)',
                                  color: p.inStock ? '#1EA672' : '#FF3D5A',
                                  border: 'none',
                                  cursor: 'pointer'
                                }}
                              >
                                {p.inStock ? 'In Stock' : 'Out of Stock'}
                              </button>
                              <span style={{ fontSize: '12px', color: 'var(--gray-700)', fontWeight: 600 }}>
                                ({p.stockCount ?? 50})
                              </span>
                            </div>
                          </td>

                          {/* Promotional Badge */}
                          <td style={{ padding: '14px 16px' }}>
                            {p.badge ? (
                              <span className={`badge badge-${p.badge}`} style={{ position: 'static', display: 'inline-block', fontSize: '10.5px' }}>
                                {p.badgeText || p.badge.toUpperCase()}
                              </span>
                            ) : (
                              <span style={{ color: 'var(--gray-400)', fontSize: '12px' }}>—</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <button
                                onClick={() => {
                                  setEditingProduct(p);
                                  setIsProductModalOpen(true);
                                }}
                                title="Edit product"
                                style={{
                                  padding: '6px 10px',
                                  borderRadius: '8px',
                                  border: '1px solid var(--gray-200)',
                                  background: '#fff',
                                  color: 'var(--blue)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '12px',
                                  fontWeight: 700
                                }}
                              >
                                <Edit2 size={13} /> Edit
                              </button>

                              <button
                                onClick={() => setDeleteConfirmId(p.id)}
                                title="Delete product"
                                style={{
                                  padding: '6px 8px',
                                  borderRadius: '8px',
                                  border: '1px solid var(--gray-200)',
                                  background: '#fff',
                                  color: '#FF3D5A',
                                  cursor: 'pointer'
                                }}
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
        {/* TAB 3: PROMOTIONS & MARKETING CAMPAIGNS */}
        {/* ========================================================= */}
        {activeTab === 'campaigns' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                  Promotional Campaign Engine
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--gray-700)', margin: '4px 0 0' }}>
                  Manage site-wide promotional banners, flash deal events, and category targeted campaigns.
                </p>
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
                  boxShadow: '0 4px 16px rgba(11,99,246,0.3)'
                }}
              >
                <Plus size={16} /> Create Campaign
              </button>
            </div>

            {/* Campaign Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '22px' }}>
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    border: '1px solid var(--gray-200)',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(11,30,61,0.03)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Banner Theme Preview Top */}
                  <div
                    style={{
                      background:
                        camp.gradientTheme === 'violet-magsafe'
                          ? 'linear-gradient(135deg, #2E1065 0%, #7C3AED 100%)'
                          : camp.gradientTheme === 'orange-pink'
                          ? 'linear-gradient(135deg, #7C2D12 0%, #EA580C 100%)'
                          : camp.gradientTheme === 'emerald-teal'
                          ? 'linear-gradient(135deg, #064E3B 0%, #059669 100%)'
                          : camp.gradientTheme === 'cyber-dark'
                          ? 'linear-gradient(135deg, #090D16 0%, #334155 100%)'
                          : camp.gradientTheme === 'crimson-fire'
                          ? 'linear-gradient(135deg, #881337 0%, #E11D48 100%)'
                          : 'linear-gradient(135deg, #0B1E3D 0%, #1E3A8A 100%)',
                      padding: '24px',
                      color: '#fff',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: 800, background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '100px', letterSpacing: '0.04em' }}>
                        {camp.badgeText}
                      </span>
                      <button
                        onClick={() => toggleCampaign(camp.id)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '100px',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: camp.isActive ? '#1EA672' : 'rgba(255,255,255,0.2)',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {camp.isActive ? '● Live on Store' : '○ Disabled'}
                      </button>
                    </div>

                    <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: '12px 0 4px' }}>
                      {camp.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.4 }}>
                      {camp.subtitle}
                    </p>
                  </div>

                  {/* Campaign Specs & Controls */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--gray-700)', fontWeight: 600 }}>Internal Name:</span>
                        <span style={{ fontWeight: 800, color: 'var(--navy)' }}>{camp.name}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--gray-700)', fontWeight: 600 }}>Target Category:</span>
                        <span style={{ fontWeight: 700, color: 'var(--blue)' }}>
                          {camp.targetCategory ? (CATEGORIES.find((c) => c.id === camp.targetCategory)?.name || camp.targetCategory) : 'All Products'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                        <span style={{ color: 'var(--gray-700)', fontWeight: 600 }}>Active Dates:</span>
                        <span style={{ color: 'var(--navy)', fontWeight: 600, fontFamily: 'monospace' }}>
                          {camp.startDate} to {camp.endDate}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--gray-100)' }}>
                      <button
                        onClick={() => {
                          setEditingCampaign(camp);
                          setIsCampaignModalOpen(true);
                        }}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '8px',
                          border: '1.5px solid var(--gray-200)',
                          background: '#fff',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: 'var(--navy)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Edit2 size={13} /> Edit
                      </button>

                      <button
                        onClick={() => {
                          deleteCampaign(camp.id);
                          showToast('Campaign Deleted', `"${camp.name}" removed.`, 'info');
                        }}
                        style={{
                          padding: '7px 12px',
                          borderRadius: '8px',
                          border: '1.5px solid var(--gray-200)',
                          background: '#fff',
                          color: '#FF3D5A',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: PROMO CODES */}
        {/* ========================================================= */}
        {activeTab === 'promos' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                  Discount Promo Codes
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--gray-700)', margin: '4px 0 0' }}>
                  Create coupon codes that customers can redeem on Cart and Checkout.
                </p>
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
        {/* TAB 5: SETTINGS & DATA BACKUP */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>
              Catalog Data &amp; Backup Operations
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Backup Card */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid var(--gray-200)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(11,99,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Download size={20} color="var(--blue)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                      Export Catalog Backup JSON
                    </h3>
                    <span style={{ fontSize: '12.5px', color: 'var(--gray-700)' }}>Download a snapshot of all products, prices, and promo campaigns.</span>
                  </div>
                </div>
                <button
                  onClick={handleExport}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: 'var(--navy)',
                    color: '#fff',
                    border: 'none',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Download size={15} /> Export Backup (.json)
                </button>
              </div>

              {/* Restore Card */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid var(--gray-200)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(30,166,114,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={20} color="#1EA672" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                      Restore Catalog from Backup File
                    </h3>
                    <span style={{ fontSize: '12.5px', color: 'var(--gray-700)' }}>Load products and promotional rules from an existing JSON file.</span>
                  </div>
                </div>
                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: '#1EA672',
                    color: '#fff',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Upload size={15} /> Choose Backup File to Restore
                  <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
                </label>
              </div>

              {/* Reset to Default Card */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '20px', border: '1.5px solid rgba(255,61,90,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,61,90,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RefreshCw size={20} color="#FF3D5A" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FF3D5A', margin: 0 }}>
                      Reset to Factory Default Demo Catalog
                    </h3>
                    <span style={{ fontSize: '12.5px', color: 'var(--gray-700)' }}>
                      Reverts all modifications and resets catalog back to standard CellCentral Canadian stock.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all products, prices, and campaigns back to defaults?')) {
                      resetToDefaults();
                      showToast('Catalog Reset', 'Reset all products and campaigns to default factory demo state.', 'info');
                    }
                  }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: '#FF3D5A',
                    color: '#fff',
                    border: 'none',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <RefreshCw size={15} /> Reset Demo Data
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

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
  );
}
