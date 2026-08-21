'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, SlidersHorizontal, X, RotateCcw, Search } from 'lucide-react';
import { PRODUCTS, CATEGORIES, BRANDS, DEVICE_MODELS } from '@/data/products';
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
  categoryTitle = 'All Products',
  categoryDescription = 'Discover our full range of premium phone cases, GaN fast chargers, ultra-durable cables, and MagSafe accessories designed for Canadian daily life.'
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search Param Initializers
  const queryParam = searchParams.get('q') || '';
  const brandParam = searchParams.get('brand') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(brandParam ? [brandParam] : []);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

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
    setMaxPrice(100);
    setSelectedModels([]);
    setSelectedColor('');
    setInStockOnly(false);
    setSearchQuery('');
  };

  // Active filters count
  const activeFiltersCount =
    (selectedCategory !== (initialCategory || 'all') ? 1 : 0) +
    selectedBrands.length +
    selectedModels.length +
    (selectedColor ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minPrice > 0 || maxPrice < 100 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
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
  }, [selectedCategory, selectedBrands, minPrice, maxPrice, selectedModels, inStockOnly, searchQuery, sortBy]);

  // Brand product counts
  const getBrandCount = (brand: string) => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      return p.brand === brand;
    }).length;
  };

  const currentCatObj = CATEGORIES.find((c) => c.id === selectedCategory);
  const displayTitle = currentCatObj ? currentCatObj.name : categoryTitle;
  const displayDescription = currentCatObj ? currentCatObj.description : categoryDescription;

  return (
    <div className="wrap" style={{ paddingTop: '24px', paddingBottom: '64px' }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          ...(currentCatObj ? [{ label: currentCatObj.name }] : [])
        ]}
      />

      {/* PLP Header */}
      <div className="plp-head">
        <h1>{displayTitle}</h1>
        <p>{displayDescription}</p>

        {/* Meta Header / Toolbar */}
        <div className="plp-meta">
          <span className="plp-count">
            Showing <b>{filteredProducts.length}</b> {filteredProducts.length === 1 ? 'product' : 'products'}
            {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
          </span>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Mobile Filter Trigger */}
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              style={{ display: 'none' }}
            >
              <SlidersHorizontal size={14} /> Filters ({activeFiltersCount})
            </button>

            {/* Sort Selector */}
            <div className="sort-select">
              <label htmlFor="sort-dropdown" style={{ color: 'var(--gray-400)', fontSize: '12px' }}>Sort by:</label>
              <select
                id="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured &amp; Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* PLP Layout: Filters Sidebar + Products Grid */}
      <div className="plp-layout">
        {/* Sidebar Filters */}
        <aside className={`filters ${isMobileFiltersOpen ? 'mobile-open' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800 }}>FILTERS</h4>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                style={{ fontSize: '12px', fontWeight: 700, color: 'var(--red)', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RotateCcw size={12} /> Clear all ({activeFiltersCount})
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
              <span className="n">{PRODUCTS.length}</span>
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
                <span className="n">{PRODUCTS.filter((p) => p.category === cat.id).length}</span>
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
            <div className="price-range-inputs">
              <div className="price-input-box">
                <span>$</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
              </div>
              <span style={{ color: 'var(--gray-400)' }}>to</span>
              <div className="price-input-box">
                <span>$</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--gray-400)', marginTop: '6px' }}>
              <span>$0</span>
              <span>$100+</span>
            </div>
          </div>

          {/* Device Model Compatibility Filter */}
          <div className="filter-group">
            <h5>Device Model</h5>
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

          {/* Clear Filters Button */}
          <button
            className="btn btn-ghost btn-block btn-sm"
            onClick={clearFilters}
            style={{ marginTop: '12px' }}
          >
            Reset All Filters
          </button>
        </aside>

        {/* Product Grid Area */}
        <div>
          {filteredProducts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '64px 20px',
                background: 'var(--gray-50)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--gray-100)'
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
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
