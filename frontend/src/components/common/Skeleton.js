import React from 'react';

export const ProductCardSkeleton = () => (
  <div className="card">
    <div className="aspect-[4/3] skeleton" />
    <div className="p-4 space-y-3">
      <div className="skeleton h-3 w-20 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
      <div className="skeleton h-6 w-1/2 rounded" />
      <div className="skeleton h-10 w-full rounded-xl" />
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
    <div className="skeleton aspect-square rounded-2xl" />
    <div className="space-y-4">
      <div className="skeleton h-5 w-24 rounded" />
      <div className="skeleton h-8 w-3/4 rounded" />
      <div className="skeleton h-8 w-1/2 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-2/3 rounded" />
      <div className="skeleton h-12 w-full rounded-xl mt-6" />
    </div>
  </div>
);

export default ProductCardSkeleton;
