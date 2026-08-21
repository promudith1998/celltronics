import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/shop/ShopCatalog';
import { CATEGORIES } from '@/data/products';
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
      title: 'Category Not Found — CellCentral',
    };
  }
  return {
    title: `${cat.name} — CellCentral Canada`,
    description: cat.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.id === params.category);
  if (!category) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '64px 0', textAlign: 'center' }}>Loading Category...</div>}>
      <ShopCatalog
        initialCategory={params.category as ProductCategory}
        categoryTitle={category.name}
        categoryDescription={category.description}
      />
    </Suspense>
  );
}
