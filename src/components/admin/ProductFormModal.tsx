'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Tag,
  Shield,
  Palette
} from 'lucide-react';
import { Product, ProductCategory, ProductBadge, ProductVariant } from '@/types/product';
import { CATEGORIES, BRANDS, DEVICE_MODELS } from '@/data/products';
import { ProductIcon } from '@/components/product/ProductIcon';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<Product, 'id'>, existingId?: string) => void;
  productToEdit?: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  productToEdit
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'media' | 'specs' | 'variants'>('basic');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form States
  const [name, setName] = useState('');
  const [brand, setBrand] = useState(BRANDS[0]);
  const [customBrand, setCustomBrand] = useState('');
  const [category, setCategory] = useState<ProductCategory>('phone-cases');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState<number>(29.99);
  const [wasPrice, setWasPrice] = useState<number | ''>('');
  const [badge, setBadge] = useState<ProductBadge | ''>('');
  const [badgeText, setBadgeText] = useState('');
  const [inStock, setInStock] = useState(true);
  const [stockCount, setStockCount] = useState<number>(50);
  const [iconType, setIconType] = useState<Product['iconType']>('case');
  const [imageUrl, setImageUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
    { key: 'Material', value: 'Polycarbonate + TPU' },
    { key: 'Warranty', value: '1-Year Limited Warranty' }
  ]);
  const [compatibleDevices, setCompatibleDevices] = useState<string[]>(['iPhone 16 Series', 'iPhone 17 Series']);
  const [colors, setColors] = useState<ProductVariant[]>([
    { name: 'Midnight Black', colorHex: '#111827' }
  ]);
  const [models, setModels] = useState<string[]>(['Standard Edition']);
  const [tags, setTags] = useState<string>('magsafe, case, protection');

  // Populate when editing
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setBrand(productToEdit.brand || BRANDS[0]);
      setCategory(productToEdit.category || 'phone-cases');
      setSku(productToEdit.sku || '');
      setPrice(productToEdit.price || 0);
      setWasPrice(productToEdit.wasPrice || '');
      setBadge(productToEdit.badge || '');
      setBadgeText(productToEdit.badgeText || '');
      setInStock(productToEdit.inStock ?? true);
      setStockCount(productToEdit.stockCount ?? 50);
      setIconType(productToEdit.iconType || 'case');
      setImageUrl(productToEdit.imageUrl || '');
      setGalleryImages(productToEdit.galleryImages || []);
      setDescription(productToEdit.description || '');
      setFeatures(productToEdit.features?.length ? productToEdit.features : ['']);
      setSpecs(
        productToEdit.specs
          ? Object.entries(productToEdit.specs).map(([key, value]) => ({ key, value }))
          : [{ key: 'Warranty', value: '1-Year Limited Warranty' }]
      );
      setCompatibleDevices(productToEdit.compatibleDevices || []);
      setColors(productToEdit.colors?.length ? productToEdit.colors : [{ name: 'Default', colorHex: '#0B1E3D' }]);
      setModels(productToEdit.models?.length ? productToEdit.models : ['Standard']);
      setTags(productToEdit.tags?.join(', ') || '');
    } else {
      // Defaults for new product
      setName('');
      setBrand(BRANDS[0]);
      setCustomBrand('');
      setCategory('phone-cases');
      setSku(`CC-${Math.floor(1000 + Math.random() * 9000)}`);
      setPrice(29.99);
      setWasPrice('');
      setBadge('');
      setBadgeText('');
      setInStock(true);
      setStockCount(50);
      setIconType('case');
      setImageUrl('');
      setGalleryImages([]);
      setDescription('Engineered for maximum endurance and sleek Canadian everyday styling.');
      setFeatures([
        'Ultra-durable construction designed for high impact defense',
        'Pro-grade premium finish with non-slip tactile grip',
        'Backed by our Canadian 1-Year replacement warranty'
      ]);
      setSpecs([
        { key: 'Material', value: 'High-grade Composite' },
        { key: 'Compatibility', value: 'Universal Qi & MagSafe' },
        { key: 'Warranty', value: '1-Year Full Coverage' }
      ]);
      setCompatibleDevices(['iPhone 17 Pro Max', 'iPhone 16 Pro', 'Galaxy S26 Ultra']);
      setColors([
        { name: 'Midnight Black', colorHex: '#0B1E3D' },
        { name: 'Cobalt Blue', colorHex: '#0B63F6' }
      ]);
      setModels(['Standard']);
      setTags('fast-charge, premium, canada');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Image Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          if (!imageUrl) {
            setImageUrl(resultStr);
          } else {
            setGalleryImages((prev) => [...prev, resultStr]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Discount Calculation Helper
  const discountPercent = wasPrice && wasPrice > price
    ? Math.round(((wasPrice - price) / wasPrice) * 100)
    : 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalBrand = customBrand.trim() || brand;
    const catObj = CATEGORIES.find((c) => c.id === category);

    const specsObj: { [key: string]: string } = {};
    specs.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specsObj[s.key.trim()] = s.value.trim();
      }
    });

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const productData: Omit<Product, 'id'> = {
      name: name.trim(),
      brand: finalBrand,
      category,
      categoryName: catObj ? catObj.name : 'Accessories',
      price: Number(price),
      wasPrice: wasPrice ? Number(wasPrice) : null,
      rating: productToEdit?.rating || 4.8,
      reviewCount: productToEdit?.reviewCount || Math.floor(Math.random() * 200) + 25,
      badge: badge ? (badge as ProductBadge) : null,
      badgeText: badgeText.trim() || (discountPercent > 0 ? `-${discountPercent}%` : ''),
      sku: sku.trim() || `SKU-${Date.now()}`,
      inStock,
      stockCount: Number(stockCount),
      iconType,
      imageUrl: imageUrl.trim() || undefined,
      galleryImages: galleryImages.filter(Boolean),
      description: description.trim(),
      features: features.filter((f) => f.trim().length > 0),
      specs: specsObj,
      compatibleDevices,
      colors: colors.filter((c) => c.name.trim().length > 0),
      models: models.filter((m) => m.trim().length > 0),
      tags: parsedTags,
      warranty: specsObj['Warranty'] || '1-Year Limited Warranty'
    };

    onSave(productData, productToEdit?.id);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(11,30,61,0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(11,30,61,0.25)',
          overflow: 'hidden',
          animation: 'modalScale 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px 32px',
            borderBottom: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #0B1E3D 0%, #132A52 100%)',
            color: '#fff'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', color: '#3FA9FF', textTransform: 'uppercase' }}>
              {productToEdit ? 'EDIT PRODUCT RECORD' : 'CATALOG MANAGEMENT'}
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
              {productToEdit ? productToEdit.name : 'Create New Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--gray-200)',
            background: 'var(--gray-50)',
            padding: '0 24px',
            overflowX: 'auto',
            gap: '8px'
          }}
        >
          {[
            { id: 'basic', label: 'Basic Info', icon: Layers },
            { id: 'pricing', label: 'Pricing & Stock', icon: DollarSign },
            { id: 'media', label: 'Photos & Artwork', icon: ImageIcon },
            { id: 'specs', label: 'Specs & Features', icon: Sparkles },
            { id: 'variants', label: 'Variants & Models', icon: Palette }
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
                  color: isSel ? 'var(--blue)' : 'var(--gray-700)',
                  borderBottom: isSel ? '2.5px solid var(--blue)' : '2.5px solid transparent',
                  background: 'transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            {/* TAB 1: BASIC INFO */}
            {activeTab === 'basic' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '18px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. GaN Prime 140W 4-Port Fast Wall Charger"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--gray-200)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--navy)',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                      SKU Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="e.g. ANK-GAN-140W"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--gray-200)',
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        color: 'var(--navy)'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProductCategory)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--gray-200)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--navy)',
                        background: '#fff'
                      }}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                      Brand
                    </label>
                    <select
                      value={brand}
                      onChange={(e) => {
                        setBrand(e.target.value);
                        setCustomBrand('');
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--gray-200)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--navy)',
                        background: '#fff'
                      }}
                    >
                      {BRANDS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                      <option value="custom">+ Custom Brand...</option>
                    </select>
                  </div>

                  {brand === 'custom' ? (
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                        Custom Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter brand name"
                        value={customBrand}
                        onChange={(e) => setCustomBrand(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--gray-200)',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                        Hardware Icon Type
                      </label>
                      <select
                        value={iconType}
                        onChange={(e) => setIconType(e.target.value as any)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--gray-200)',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'var(--navy)',
                          background: '#fff'
                        }}
                      >
                        <option value="case">Phone Case</option>
                        <option value="charger">GaN Fast Charger</option>
                        <option value="cable">Braided Cable</option>
                        <option value="power">MagSafe Power Bank</option>
                        <option value="audio">Audio / ANC Earbuds</option>
                        <option value="screen">Screen Protector</option>
                        <option value="mount">Car Mount &amp; GPS</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Short Summary Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief highlights for product cards and search results..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid var(--gray-200)',
                      fontSize: '13.5px',
                      lineHeight: 1.5,
                      color: 'var(--navy)',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Tags (comma separated for search indexing)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="magsafe, fast charge, gan, 240w, durable"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid var(--gray-200)',
                      fontSize: '13.5px'
                    }}
                  />
                </div>
              </>
            )}

            {/* TAB 2: PRICING & DISCOUNTS */}
            {activeTab === 'pricing' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  {/* Current Selling Price */}
                  <div style={{ background: 'var(--gray-50)', padding: '18px', borderRadius: '14px', border: '1px solid var(--gray-200)' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Current Selling Price ($ CAD) *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '10px', fontWeight: 700, color: 'var(--gray-700)' }}>$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0.99"
                        required
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 28px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--blue)',
                          fontSize: '18px',
                          fontWeight: 800,
                          color: 'var(--navy)',
                          background: '#fff'
                        }}
                      />
                    </div>
                  </div>

                  {/* Was / Original Price (for Discount Strike-through) */}
                  <div style={{ background: 'var(--gray-50)', padding: '18px', borderRadius: '14px', border: '1px solid var(--gray-200)' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Original / Was Price ($ CAD)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '10px', fontWeight: 700, color: 'var(--gray-700)' }}>$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={wasPrice}
                        onChange={(e) => setWasPrice(e.target.value ? parseFloat(e.target.value) : '')}
                        placeholder="e.g. 39.99"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 28px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--gray-300)',
                          fontSize: '18px',
                          fontWeight: 700,
                          color: 'var(--gray-700)',
                          background: '#fff'
                        }}
                      />
                    </div>
                  </div>

                  {/* Calculated Live Discount Preview */}
                  <div
                    style={{
                      background: discountPercent > 0 ? 'rgba(255,61,90,0.06)' : 'var(--gray-50)',
                      padding: '18px',
                      borderRadius: '14px',
                      border: discountPercent > 0 ? '1.5px solid #FF3D5A' : '1px solid var(--gray-200)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: discountPercent > 0 ? '#FF3D5A' : 'var(--gray-700)', textTransform: 'uppercase' }}>
                      Discount Value
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: discountPercent > 0 ? '#FF3D5A' : 'var(--navy)', marginTop: '4px' }}>
                      {discountPercent > 0 ? `-${discountPercent}% OFF` : 'No Discount'}
                    </div>
                    {discountPercent > 0 && wasPrice && (
                      <div style={{ fontSize: '12px', color: '#FF3D5A', marginTop: '2px', fontWeight: 600 }}>
                        Customer saves ${(wasPrice - price).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Promotional Badge Selector */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '8px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Promotional Ribbon Badge
                    </label>
                    <select
                      value={badge}
                      onChange={(e) => {
                        const val = e.target.value as ProductBadge;
                        setBadge(val);
                        if (val === 'sale' && discountPercent > 0) {
                          setBadgeText(`-${discountPercent}%`);
                        } else if (val === 'new') {
                          setBadgeText('NEW');
                        } else if (val === 'best') {
                          setBadgeText('BEST SELLER');
                        } else if (val === 'limited') {
                          setBadgeText('LIMITED');
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--gray-200)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--navy)',
                        background: '#fff'
                      }}
                    >
                      <option value="">None (Standard)</option>
                      <option value="sale">SALE (Red Ribbon)</option>
                      <option value="new">NEW (Pink Ribbon)</option>
                      <option value="best">BEST SELLER (Blue Ribbon)</option>
                      <option value="limited">LIMITED (Purple Ribbon)</option>
                      <option value="out">OUT OF STOCK (Gray Ribbon)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Custom Badge Text Override
                    </label>
                    <input
                      type="text"
                      value={badgeText}
                      onChange={(e) => setBadgeText(e.target.value)}
                      placeholder="e.g. -25%, HOT PICK, FLAGSHIP"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--gray-200)',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                {/* Stock & Inventory */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--gray-50)', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--gray-200)' }}>
                    <input
                      type="checkbox"
                      id="inStockCheck"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <label htmlFor="inStockCheck" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', cursor: 'pointer' }}>
                      Active &amp; Available for Purchase (In Stock)
                    </label>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Units in Warehouse Inventory
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stockCount}
                      onChange={(e) => setStockCount(parseInt(e.target.value) || 0)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--gray-200)',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--navy)'
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* TAB 3: PHOTOS & ARTWORK */}
            {activeTab === 'media' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Upload Product Photo (Dropzone)
                    </label>

                    {/* Drag and Drop Zone */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        border: '2px dashed var(--blue)',
                        background: 'rgba(11,99,246,0.03)',
                        borderRadius: '16px',
                        padding: '32px 20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                      />
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: 'rgba(11,99,246,0.1)',
                          color: 'var(--blue)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '12px'
                        }}
                      >
                        <Upload size={22} />
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)' }}>
                        Click to upload photos from computer
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray-700)', marginTop: '4px' }}>
                        Supports PNG, JPG, WebP, SVG (Multiple files supported)
                      </div>
                    </div>

                    {/* Direct Image URL Input */}
                    <div style={{ marginTop: '16px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                        Or Paste Web Image URL
                      </label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.png"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--gray-200)',
                          fontSize: '13px'
                        }}
                      />
                    </div>
                  </div>

                  {/* Live Media Preview Box */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Primary Preview
                    </label>
                    <div
                      style={{
                        background: 'radial-gradient(circle at 50% 35%, #F8FAFC 0%, #EEF2F6 100%)',
                        borderRadius: '16px',
                        border: '1px solid var(--gray-200)',
                        aspectRatio: '1/1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '16px'
                      }}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Product preview"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      ) : (
                        <div style={{ textAlign: 'center', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <ProductIcon type={iconType} size="60%" />
                          <span style={{ fontSize: '11px', color: 'var(--gray-700)', marginTop: '8px', fontWeight: 600 }}>
                            (Using default 3D vector SVG artwork)
                          </span>
                        </div>
                      )}

                      {imageUrl && (
                        <button
                          type="button"
                          onClick={() => setImageUrl('')}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(255,61,90,0.9)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Multi-photo Gallery list */}
                {galleryImages.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Additional Gallery Angles ({galleryImages.length})
                    </label>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '4px 0' }}>
                      {galleryImages.map((img, i) => (
                        <div
                          key={i}
                          style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '10px',
                            border: '1px solid var(--gray-200)',
                            position: 'relative',
                            overflow: 'hidden',
                            flex: 'none',
                            background: '#F8FAFC'
                          }}
                        >
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          <button
                            type="button"
                            onClick={() => setGalleryImages((prev) => prev.filter((_, idx) => idx !== i))}
                            style={{
                              position: 'absolute',
                              top: '2px',
                              right: '2px',
                              background: 'rgba(0,0,0,0.6)',
                              color: '#fff',
                              borderRadius: '50%',
                              width: '18px',
                              height: '18px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* TAB 4: SPECS & FEATURES */}
            {activeTab === 'specs' && (
              <>
                {/* Key Bullet Features */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase' }}>
                      Key Bullet Features
                    </label>
                    <button
                      type="button"
                      onClick={() => setFeatures((prev) => [...prev, ''])}
                      style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Plus size={14} /> Add Feature
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFeatures((prev) => {
                              const updated = [...prev];
                              updated[i] = val;
                              return updated;
                            });
                          }}
                          placeholder={`Feature bullet point #${i + 1}`}
                          style={{
                            flex: 1,
                            padding: '9px 12px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--gray-200)',
                            fontSize: '13.5px'
                          }}
                        />
                        {features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setFeatures((prev) => prev.filter((_, idx) => idx !== i))}
                            style={{ background: 'none', color: '#FF3D5A', cursor: 'pointer', padding: '0 6px' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications Key/Values */}
                <div style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase' }}>
                      Technical Specifications (Key &amp; Value)
                    </label>
                    <button
                      type="button"
                      onClick={() => setSpecs((prev) => [...prev, { key: '', value: '' }])}
                      style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Plus size={14} /> Add Spec
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {specs.map((spec, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '8px' }}>
                        <input
                          type="text"
                          value={spec.key}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSpecs((prev) => {
                              const updated = [...prev];
                              updated[i].key = val;
                              return updated;
                            });
                          }}
                          placeholder="e.g. Max Wattage"
                          style={{
                            padding: '9px 12px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--gray-200)',
                            fontSize: '13px',
                            fontWeight: 600
                          }}
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSpecs((prev) => {
                              const updated = [...prev];
                              updated[i].value = val;
                              return updated;
                            });
                          }}
                          placeholder="e.g. 100W PD (20V/5A)"
                          style={{
                            padding: '9px 12px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--gray-200)',
                            fontSize: '13px'
                          }}
                        />
                        {specs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setSpecs((prev) => prev.filter((_, idx) => idx !== i))}
                            style={{ background: 'none', color: '#FF3D5A', cursor: 'pointer', padding: '0 6px' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* TAB 5: VARIANTS & MODELS */}
            {activeTab === 'variants' && (
              <>
                {/* Color Swatch Variants */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase' }}>
                      Color Finish Options
                    </label>
                    <button
                      type="button"
                      onClick={() => setColors((prev) => [...prev, { name: 'New Color', colorHex: '#0B63F6' }])}
                      style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Plus size={14} /> Add Color Variant
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {colors.map((c, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1.5fr 1fr auto', gap: '10px', alignItems: 'center' }}>
                        <input
                          type="color"
                          value={c.colorHex || '#111827'}
                          onChange={(e) => {
                            const val = e.target.value;
                            setColors((prev) => {
                              const updated = [...prev];
                              updated[i].colorHex = val;
                              return updated;
                            });
                          }}
                          style={{ width: '38px', height: '38px', borderRadius: '8px', border: 'none', cursor: 'pointer', padding: 0 }}
                        />
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setColors((prev) => {
                              const updated = [...prev];
                              updated[i].name = val;
                              return updated;
                            });
                          }}
                          placeholder="Color Name (e.g. Natural Titanium)"
                          style={{
                            padding: '9px 12px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--gray-200)',
                            fontSize: '13.5px',
                            fontWeight: 600
                          }}
                        />
                        <input
                          type="text"
                          value={c.colorHex || '#111827'}
                          onChange={(e) => {
                            const val = e.target.value;
                            setColors((prev) => {
                              const updated = [...prev];
                              updated[i].colorHex = val;
                              return updated;
                            });
                          }}
                          placeholder="#Hex"
                          style={{
                            padding: '9px 12px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--gray-200)',
                            fontSize: '13px',
                            fontFamily: 'monospace'
                          }}
                        />
                        {colors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setColors((prev) => prev.filter((_, idx) => idx !== i))}
                            style={{ background: 'none', color: '#FF3D5A', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model / Sizing Variants */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase' }}>
                      Size / Sizing Model Options
                    </label>
                    <button
                      type="button"
                      onClick={() => setModels((prev) => [...prev, ''])}
                      style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Plus size={14} /> Add Model Option
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {models.map((m, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={m}
                          onChange={(e) => {
                            const val = e.target.value;
                            setModels((prev) => {
                              const updated = [...prev];
                              updated[i] = val;
                              return updated;
                            });
                          }}
                          placeholder="e.g. 1.8m (6ft) or iPhone 17 Pro"
                          style={{
                            flex: 1,
                            padding: '9px 12px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--gray-200)',
                            fontSize: '13.5px'
                          }}
                        />
                        {models.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setModels((prev) => prev.filter((_, idx) => idx !== i))}
                            style={{ background: 'none', color: '#FF3D5A', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Modal Footer Controls */}
          <div
            style={{
              padding: '18px 32px',
              borderTop: '1px solid var(--gray-200)',
              background: 'var(--gray-50)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1.5px solid var(--gray-300)',
                background: '#fff',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--gray-700)',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                style={{
                  padding: '11px 28px',
                  borderRadius: '10px',
                  background: 'var(--grad-brand)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 800,
                  boxShadow: '0 4px 16px rgba(11,99,246,0.3)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Check size={16} />
                {productToEdit ? 'Save Product Changes' : 'Create & Publish Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
