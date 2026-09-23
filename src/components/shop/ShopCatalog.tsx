'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronDown,
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  Sparkles,
  ShieldCheck,
  Truck,
  Flame,
  Check,
  Grid3X3,
  LayoutGrid,
  Filter
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, BRANDS, DEVICE_MODELS } from '@/data/products';
import { useAdminProducts } from '@/context/AdminProductContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductCategory, Product } from '@/types/product';

interface ShopCatalogProps {
  initialCategory?: ProductCategory;
  categoryTitle?: string;
  categoryDescription?: string;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  initialCategory,
  categoryTitle = 'All Mobile Accessories',
  categoryDescription = 'Discover our full range of premium phone cases, GaN fast chargers, ultra-durable cables, and MagSafe accessories designed for Canadian daily life.'
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products: adminProducts } = useAdminProducts();
  const PRODUCTS_DATA = adminProducts.length > 0 ? adminProducts : PRODUCTS;

  // Search Param Initializers
  const queryParam = searchParams.get('q') || '';
  const brandParam = searchParams.get('brand') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(brandParam ? [brandParam] : []);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<'normal' | 'large'>('normal');

  // Sync initial category or query param changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  useEffect(() => {
    if (brandParam && !selectedBrands.includes(brandParam)) {
      setSelectedBrands([brandParam]);
    }
  }, [brandParam]);

  // Handle Brand Toggle
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Handle Model Toggle
  const toggleModel = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  // Reset Filters
  const clearFilters = () => {
    setSelectedCategory(initialCategory || 'all');
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(200);
    setSelectedModels([]);
    setSelectedColor('');
    setInStockOnly(false);
    setSearchQuery('');
  };

  // Set Price preset
  const setPricePreset = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  // Active filters count
  const activeFiltersCount =
    (selectedCategory !== (initialCategory || 'all') ? 1 : 0) +
    selectedBrands.length +
    selectedModels.length +
    (selectedColor ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minPrice > 0 || maxPrice < 200 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Price filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
      // Model compatibility filter
      if (
        selectedModels.length > 0 &&
        !selectedModels.some((m) => product.compatibleDevices.includes(m) || product.models.includes(m))
      ) {
        return false;
      }
      // In-stock filter
      if (inStockOnly && (!product.inStock || product.badge === 'out')) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.categoryName.toLowerCase().includes(q);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesTag) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0);
      return 0; // Default: featured
    });
  }, [PRODUCTS_DATA, selectedCategory, selectedBrands, minPrice, maxPrice, selectedModels, inStockOnly, searchQuery, sortBy]);

  // Brand product counts
  const getBrandCount = (brand: string) => {
    return PRODUCTS_DATA.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      return p.brand === brand;
    }).length;
  };

  const currentCatObj = CATEGORIES.find((c) => c.id === selectedCategory);
  const displayTitle = currentCatObj ? currentCatObj.name : categoryTitle;
  const displayDescription = currentCatObj ? currentCatObj.description : categoryDescription;

  // Recommended products for empty or small result sets
  const topRecommendations = PRODUCTS_DATA.filter((p) => p.badge === 'best' || p.rating >= 4.8).slice(0, 4);

  return (
    <div className="wrap" style={{ paddingTop: '20px', paddingBottom: '72px' }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Shop All', href: '/shop' },
          ...(currentCatObj ? [{ label: currentCatObj.name }] : [])
        ]}
      />

      {/* CATEGORY SHOWCASE HERO BANNER */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0B1E3D 0%, #132A52 60%, #1D3557 100%)',
          borderRadius: '20px',
          padding: '32px 36px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '28px',
          boxShadow: '0 8px 30px rgba(11,30,61,0.14)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        {/* Subtle Background Glow Spheres */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-30px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(11,99,246,0.3) 0%, rgba(255,46,147,0.15) 50%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '30%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,122,26,0.2) 0%, transparent 70%)',
            filter: 'blur(25px)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                padding: '5px 14px',
                borderRadius: '100px',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '12px',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              <Sparkles size={13} color="#FF7A1A" />
              <span>OFFICIAL CANADIAN STORE · FAST DISPATCH</span>
            </div>

            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}
            >
              {displayTitle}
            </h1>
            <p
              style={{
                fontSize: '14.5px',
                color: '#C6D2EA',
                maxWidth: '650px',
                margin: 0,
                lineHeight: 1.5
              }}
            >
              {displayDescription}
            </p>
          </div>

          {/* Quick Value Badge Pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#E1E6EF'
              }}
            >
              <Truck size={15} color="#3FA9FF" />
              <span>Free Shipping over $49</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#E1E6EF'
              }}
            >
              <ShieldCheck size={15} color="#1EA672" />
              <span>1-Year Warranty</span>
            </div>
          </div>
        </div>

        {/* Category Filter Quick Chips Strip */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            marginTop: '22px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '12.5px',
              fontWeight: 600,
              background: selectedCategory === 'all' ? 'var(--grad-brand)' : 'rgba(255,255,255,0.08)',
              color: '#fff',
              border: selectedCategory === 'all' ? 'none' : '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            All Categories ({PRODUCTS_DATA.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSel = selectedCategory === cat.id;
            const count = PRODUCTS_DATA.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  background: isSel ? 'var(--grad-brand)' : 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  border: isSel ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '11px', opacity: 0.75 }}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOOLBAR: Filter Count, Active Filter Tags & Sort Selector */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--gray-200)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 600 }}>
            Showing <b style={{ color: 'var(--blue)' }}>{filteredProducts.length}</b> {filteredProducts.length === 1 ? 'product' : 'products'}
            {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
          </span>

          {/* Active Filter Chips */}
          {selectedBrands.map((brand) => (
            <span
              key={brand}
              onClick={() => toggleBrand(brand)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'var(--gray-100)',
                color: 'var(--navy)',
                fontSize: '12px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '100px',
                cursor: 'pointer'
              }}
            >
              Brand: {brand} <X size={12} color="var(--gray-400)" />
            </span>
          ))}

          {selectedModels.map((model) => (
            <span
              key={model}
              onClick={() => toggleModel(model)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'var(--gray-100)',
                color: 'var(--navy)',
                fontSize: '12px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '100px',
                cursor: 'pointer'
              }}
            >
              {model} <X size={12} color="var(--gray-400)" />
            </span>
          ))}

          {inStockOnly && (
            <span
              onClick={() => setInStockOnly(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(30,166,114,0.12)',
                color: '#1EA672',
                fontSize: '12px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '100px',
                cursor: 'pointer'
              }}
            >
              In Stock Only <X size={12} />
            </span>
          )}

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--red)',
                background: 'none',
                padding: '4px 8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={12} /> Reset all
            </button>
          )}
        </div>

        {/* Right Controls: Sort & Mobile Filter Button */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Mobile Filter Toggle */}
          <button
            className="btn btn-outline btn-sm mobile-filter-btn"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            style={{ display: 'none' }}
          >
            <SlidersHorizontal size={14} /> Filters ({activeFiltersCount})
          </button>

          {/* Sort Selector Dropdown */}
          <div className="sort-select">
            <label htmlFor="sort-dropdown" style={{ color: 'var(--gray-400)', fontSize: '12.5px' }}>Sort by:</label>
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured &amp; Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* PLP LAYOUT: Filters Sidebar (Left) + Products Grid (Middle/Right) */}
      <div className="plp-layout">
        {/* SIDEBAR FILTERS */}
        <aside
          className={`filters ${isMobileFiltersOpen ? 'mobile-open' : ''}`}
          style={{
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid var(--gray-200)',
            padding: '22px',
            boxShadow: '0 2px 12px rgba(11,30,61,0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1.5px solid var(--gray-100)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} color="var(--blue)" />
              <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, letterSpacing: '0.04em' }}>FILTERS</h4>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: 'var(--red)',
                  background: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <RotateCcw size={11} /> Clear ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h5>Category</h5>
            <label className="filter-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => setSelectedCategory('all')}
                />
                All Categories
              </span>
              <span className="n">{PRODUCTS_DATA.length}</span>
            </label>
            {CATEGORIES.map((cat) => (
              <label key={cat.id} className="filter-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.id}
                    onChange={() => setSelectedCategory(cat.id)}
                  />
                  {cat.name}
                </span>
                <span className="n">{PRODUCTS_DATA.filter((p) => p.category === cat.id).length}</span>
              </label>
            ))}
          </div>

          {/* Brand Filter */}
          <div className="filter-group">
            <h5>Brand</h5>
            {BRANDS.map((brand) => {
              const count = getBrandCount(brand);
              return (
                <label key={brand} className="filter-row">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    {brand}
                  </span>
                  <span className="n">{count}</span>
                </label>
              );
            })}
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h5>Price Range (CAD)</h5>
            {/* Quick Price Preset Chips */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <button
                type="button"
                onClick={() => setPricePreset(0, 25)}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid var(--gray-200)',
                  background: maxPrice === 25 ? 'var(--navy)' : 'var(--gray-50)',
                  color: maxPrice === 25 ? '#fff' : 'var(--navy)',
                  cursor: 'pointer'
                }}
              >
                &lt; $25
              </button>
              <button
                type="button"
                onClick={() => setPricePreset(25, 50)}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid var(--gray-200)',
                  background: minPrice === 25 && maxPrice === 50 ? 'var(--navy)' : 'var(--gray-50)',
                  color: minPrice === 25 && maxPrice === 50 ? '#fff' : 'var(--navy)',
                  cursor: 'pointer'
                }}
              >
                $25 - $50
              </button>
              <button
                type="button"
                onClick={() => setPricePreset(50, 200)}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid var(--gray-200)',
                  background: minPrice === 50 ? 'var(--navy)' : 'var(--gray-50)',
                  color: minPrice === 50 ? '#fff' : 'var(--navy)',
                  cursor: 'pointer'
                }}
              >
                $50+
              </button>
            </div>

            <div className="price-range-inputs">
              <div className="price-input-box">
                <span>$</span>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
              </div>
              <span style={{ color: 'var(--gray-400)', fontSize: '12px' }}>to</span>
              <div className="price-input-box">
                <span>$</span>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Device Model Compatibility Filter */}
          <div className="filter-group">
            <h5>Compatible Phone Model</h5>
            {DEVICE_MODELS.map((model) => (
              <label key={model} className="filter-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={selectedModels.includes(model)}
                    onChange={() => toggleModel(model)}
                  />
                  {model}
                </span>
              </label>
            ))}
          </div>

          {/* Availability Filter */}
          <div className="filter-group">
            <h5>Availability</h5>
            <label className="filter-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                In Stock Items Only
              </span>
            </label>
          </div>

          {/* Reset Filters CTA */}
          <button
            className="btn btn-outline btn-block btn-sm"
            onClick={clearFilters}
            style={{ marginTop: '16px', width: '100%' }}
          >
            Reset All Filters
          </button>
        </aside>

        {/* MIDDLE / RIGHT PRODUCT CATALOG GRID */}
        <div>
          {filteredProducts.length === 0 ? (
            <div>
              <div
                style={{
                  textAlign: 'center',
                  padding: '56px 24px',
                  background: 'var(--gray-50)',
                  borderRadius: '16px',
                  border: '1px solid var(--gray-200)',
                  marginBottom: '40px'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    boxShadow: '0 4px 14px rgba(11,30,61,0.06)'
                  }}
                >
                  <Search size={28} color="var(--gray-400)" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>No products match your criteria</h3>
                <p style={{ color: 'var(--gray-700)', fontSize: '14px', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
                  Try loosening your filters, adjusting the price range, or searching for a different brand or term.
                </p>
                <button className="btn btn-navy" onClick={clearFilters}>
                  CLEAR ALL FILTERS
                </button>
              </div>

              {/* Recommended alternatives */}
              <div style={{ marginTop: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Popular Best Sellers You Might Like</h3>
                <div className="product-grid">
                  {topRecommendations.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Value proposition guarantee strip below products */}
              <div
                style={{
                  marginTop: '48px',
                  background: 'var(--gray-50)',
                  borderRadius: '16px',
                  border: '1px solid var(--gray-200)',
                  padding: '24px 32px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '24px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(11,30,61,0.06)', flex: 'none' }}>
                    <Truck size={20} color="var(--blue)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 2px' }}>Fast Canadian Shipping</h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--gray-700)', margin: 0 }}>Free express shipping on all orders over $49 CAD.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(11,30,61,0.06)', flex: 'none' }}>
                    <ShieldCheck size={20} color="#1EA672" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 2px' }}>1-Year Peace of Mind</h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--gray-700)', margin: 0 }}>Hassle-free Canadian warranty on all accessories.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(11,30,61,0.06)', flex: 'none' }}>
                    <Flame size={20} color="var(--orange)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 2px' }}>100% Genuine Accessories</h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--gray-700)', margin: 0 }}>Official accessories from Anker, Spigen, TORRAS, ESR &amp; Belkin.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
