'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Share2,
  ZoomIn,
  Send
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductIcon } from '@/components/product/ProductIcon';
import { StarRating } from '@/components/product/StarRating';
import { ProductCard } from '@/components/product/ProductCard';
import { DeliveryEstimator } from '@/components/product/DeliveryEstimator';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { ProductVariant, ProductReview } from '@/types/product';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorite = isInWishlist(product.id);
  const outOfStock = !product.inStock || product.badge === 'out';

  // Variant & Qty State
  const [selectedColor, setSelectedColor] = useState<ProductVariant>(product.colors[0] || { name: 'Default' });
  const [selectedModel, setSelectedModel] = useState<string>(product.models[0] || 'Default');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeThumb, setActiveThumb] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'shipping'>('desc');

  // Customer Review Submission State
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews || []);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleAddToCart = () => {
    if (!outOfStock) {
      addItem(product, quantity, selectedColor, selectedModel);
    }
  };

  const handleBuyNow = () => {
    if (!outOfStock) {
      addItem(product, quantity, selectedColor, selectedModel);
      window.location.href = '/checkout';
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to clipboard.', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      showToast('Missing Fields', 'Please fill in your name and review comment.', 'error');
      return;
    }
    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle.trim() || 'Great product',
      comment: newReviewComment.trim(),
      verified: true,
      location: 'Canada'
    };
    setReviewsList([newRev, ...reviewsList]);
    showToast('Review Submitted', 'Thank you for your verified customer review!', 'success');
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  // Recommended products (excluding current)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="wrap" style={{ paddingTop: '24px', paddingBottom: '64px' }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.categoryName, href: `/shop/${product.category}` },
          { label: product.name }
        ]}
      />

      {/* Main PDP Grid */}
      <div className="pdp">
        {/* Left Column: Interactive Product Gallery */}
        <div className="pdp-gallery">
          <div className="pdp-main">
            <ProductIcon type={product.iconType} size="50%" />
            {product.badge && (
              <span
                className={`badge badge-${product.badge}`}
                style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}
              >
                {product.badgeText || product.badge.toUpperCase()}
              </span>
            )}
            <div className="pdp-zoom" title="High resolution preview">
              <ZoomIn size={16} color="var(--navy)" />
            </div>
          </div>

          {/* Thumbnail Angles */}
          <div className="pdp-thumbs">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`pdp-thumb ${activeThumb === idx ? 'active' : ''}`}
                onClick={() => setActiveThumb(idx)}
                aria-label={`View angle ${idx + 1}`}
              >
                <ProductIcon type={product.iconType} size="56%" />
              </div>
            ))}
          </div>

          {/* Security & Warranty Trust Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: '20px',
              padding: '12px 16px',
              background: 'var(--gray-50)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--gray-100)',
              fontSize: '12px',
              color: 'var(--navy)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#1EA672" />
              <span>1-Yr Warranty</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={16} color="var(--blue)" />
              <span>Free Shipping $49+</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcw size={16} color="var(--orange)" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Config & Buy Actions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="pdp-brand">{product.brand}</span>
            <button
              onClick={handleShare}
              style={{ background: 'none', color: 'var(--gray-400)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
            >
              <Share2 size={15} /> Share
            </button>
          </div>

          <h1 className="pdp-title">{product.name}</h1>

          {/* Ratings & SKU */}
          <div className="pdp-row">
            <StarRating rating={product.rating} reviews={reviewsList.length} size={14} />
            <span className="pdp-sku mono">SKU: {product.sku}</span>
          </div>

          {/* Price */}
          <div className="pdp-price">
            <span className="now">${product.price.toFixed(2)}</span>
            {product.wasPrice && (
              <>
                <span className="was">${product.wasPrice.toFixed(2)}</span>
                <span className="badge badge-sale" style={{ position: 'static', fontSize: '11px' }}>
                  Save ${(product.wasPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="pdp-stock">
            {outOfStock ? (
              <span style={{ color: 'var(--red)', fontWeight: 700 }}>Currently Out of Stock</span>
            ) : (
              <>
                <CheckCircle2 size={16} color="#1EA672" />
                <span>In Stock — ships within 24 hours from Ontario warehouse</span>
              </>
            )}
          </div>

          <p className="pdp-desc">{product.description}</p>

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div className="opt-group">
              <div className="opt-label">
                <span>Color</span>
                <span className="sel">{selectedColor.name}</span>
              </div>
              <div className="opt-colors">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`opt-swatch ${selectedColor.name === color.name ? 'active' : ''}`}
                    style={{ background: color.colorHex }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Device Model Selector */}
          {product.models.length > 0 && (
            <div className="opt-group">
              <div className="opt-label">
                <span>Device Model</span>
                <span className="sel">{selectedModel}</span>
              </div>
              <div className="opt-pills">
                {product.models.map((model) => (
                  <button
                    key={model}
                    className={`opt-pill ${selectedModel === model ? 'active' : ''}`}
                    onClick={() => setSelectedModel(model)}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Compatibility List Box */}
          <div className="compat-box">
            <h5>
              <CheckCircle2 size={15} color="var(--blue)" />
              CERTIFIED COMPATIBLE DEVICES
            </h5>
            <div className="compat-list">
              {product.compatibleDevices.map((dev) => (
                <span key={dev} className="compat-tag">
                  {dev}
                </span>
              ))}
            </div>
          </div>

          {/* Buy Row: Qty + Add to Cart + Wishlist */}
          <div className="buy-row">
            <div className="qty-box">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              className="btn btn-navy"
              style={{ flex: 1 }}
              onClick={handleAddToCart}
              disabled={outOfStock}
            >
              <ShoppingBag size={16} />
              {outOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
            </button>

            <button
              className={`btn btn-outline ${isFavorite ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
              style={{ width: '48px', height: '48px', padding: 0, borderRadius: '50%' }}
            >
              <Heart size={18} fill={isFavorite ? 'var(--red)' : 'none'} color={isFavorite ? 'var(--red)' : 'var(--navy)'} />
            </button>
          </div>

          {/* Direct Buy Now Button */}
          {!outOfStock && (
            <button
              className="btn btn-grad btn-block"
              style={{ marginTop: '12px' }}
              onClick={handleBuyNow}
            >
              BUY NOW WITH 1-CLICK
            </button>
          )}

          {/* Canadian Postal Code Delivery Estimator */}
          <DeliveryEstimator />

          {/* Product Tabs: Description, Specs, Reviews, Shipping */}
          <div className="pdp-tabs">
            <button
              className={`pdp-tab ${activeTab === 'desc' ? 'active' : ''}`}
              onClick={() => setActiveTab('desc')}
            >
              Description &amp; Highlights
            </button>
            <button
              className={`pdp-tab ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Technical Specifications
            </button>
            <button
              className={`pdp-tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Customer Reviews ({reviewsList.length})
            </button>
            <button
              className={`pdp-tab ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Canadian Shipping
            </button>
          </div>

          {/* Tab Panel Content */}
          <div className="pdp-tab-panel">
            {activeTab === 'desc' && (
              <div>
                <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>{product.longDescription || product.description}</p>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>Key Product Highlights:</h4>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
                  {product.features.map((f, i) => (
                    <li key={i} style={{ color: 'var(--gray-700)' }}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="spec-grid">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="spec-row">
                    <b>{key}</b>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }}>Verified Customer Feedback</h4>
                    <StarRating rating={product.rating} reviews={reviewsList.length} size={14} />
                  </div>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <form
                    onSubmit={handleReviewSubmit}
                    style={{
                      background: 'var(--gray-50)',
                      padding: '20px',
                      borderRadius: 'var(--radius)',
                      marginBottom: '24px',
                      border: '1px solid var(--gray-100)'
                    }}
                  >
                    <h5 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Leave Your Verified Review</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)' }}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Review headline (e.g. Excellent build quality)"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)' }}
                      />
                    </div>
                    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewReviewRating(star)}
                          style={{ background: 'none', padding: 0 }}
                        >
                          <Star
                            size={18}
                            fill={star <= newReviewRating ? 'var(--orange)' : 'var(--gray-200)'}
                            color={star <= newReviewRating ? 'var(--orange)' : 'var(--gray-200)'}
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder="Write your honest review about this product..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      rows={3}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)', marginBottom: '12px' }}
                      required
                    />
                    <button type="submit" className="btn btn-navy btn-sm">
                      <Send size={14} /> Submit Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      style={{ paddingBottom: '16px', borderBottom: '1px solid var(--gray-100)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{rev.author}</span>
                          {rev.verified && (
                            <span style={{ fontSize: '11px', background: '#E7EFFE', color: 'var(--blue)', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{rev.date}</span>
                      </div>
                      <div style={{ margin: '4px 0' }}>
                        <StarRating rating={rev.rating} showCount={false} size={12} />
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '13.5px', marginTop: '4px' }}>{rev.title}</div>
                      <p style={{ color: 'var(--gray-700)', fontSize: '13px', margin: '4px 0 0' }}>{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--gray-700)' }}>
                <p><b>Fast Canadian Delivery:</b> All orders are dispatched from our centralized logistics hub within 24 hours on business days.</p>
                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><b>Free Standard Shipping:</b> Orders over $49 across all Canadian provinces (2-4 business days).</li>
                  <li><b>Express Canada Post / Courier:</b> 1-2 business days expedited option available at checkout.</li>
                  <li><b>30-Day Returns:</b> We offer easy, prepaid return labels if you change your mind.</li>
                  <li><b>1-Year Replacement Warranty:</b> If your accessory experiences any manufacturing defect, we will replace it free of charge.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* "You May Also Like" Recommendation Carousel */}
      <section style={{ paddingTop: '56px' }}>
        <div className="section-head">
          <h2>You May Also Like</h2>
          <Link href="/shop" className="seeall">
            Browse All Products
          </Link>
        </div>
        <div className="product-grid">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
