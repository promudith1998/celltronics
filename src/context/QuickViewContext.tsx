'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product } from '@/types/product';

interface QuickViewContextType {
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const QuickViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  return (
    <QuickViewContext.Provider value={{ quickViewProduct, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = (): QuickViewContextType => {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
};
