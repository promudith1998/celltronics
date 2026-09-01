import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/shop/ShopCatalog';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { ProductCategory } from '@/types/product';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.id === params.category);
  if (!cat) {
    return {
      title: 'Category Not Found — CellCentral Canada',
    };
  }
  return {
    title: `${cat.name} — CellCentral Canada`,
    description: `${cat.description} Fast Canadian shipping from domestic logistics centers with 1-Year Comprehensive Warranty.`,
    alternates: {
      canonical: `https://cellcentral.ca/shop/${cat.id}`
    }
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.id === params.category);
  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} — CellCentral Canada`,
    description: category.description,
    url: `https://cellcentral.ca/shop/${category.id}`,
    itemListElement: categoryProducts.map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: prod.name,
      url: `https://cellcentral.ca/product/${prod.id}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="wrap" style={{ padding: '48px 0', minHeight: '600px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--navy)' }}>
                {category.name}
              </h1>
              <p style={{ color: 'var(--gray-500)', maxWidth: '600px', margin: '8px auto 0' }}>
                {category.description}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid var(--gray-200)',
                    height: '340px'
                  }}
                />
              ))}
            </div>
          </div>
        }
      >
        <ShopCatalog
          initialCategory={params.category as ProductCategory}
          categoryTitle={category.name}
          categoryDescription={category.description}
        />
      </Suspense>
    </>
  );
}
