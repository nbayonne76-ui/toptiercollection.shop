'use client'

import { useState } from 'react'
import { products, categoryLabels } from '@/data/products'
import { Category } from '@/types'
import ProductGrid from '@/components/ProductGrid'
import { useLanguage } from '@/context/LanguageContext'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
]

export default function AllProductsPage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [sort, setSort] = useState('featured')
  const [inStockOnly, setInStockOnly] = useState(false)

  const categories: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: t('category.allProducts') },
    { value: 'home-decor', label: t('category.homeDecor') },
    { value: 'kitchenware', label: t('category.kitchenware') },
    { value: 'pet-products', label: t('category.petProducts') },
    { value: 'beauty-self-care', label: t('category.beauty') },
  ]

  let filtered = activeCategory === 'all'
    ? [...products]
    : products.filter(p => p.category === activeCategory)

  if (inStockOnly) filtered = filtered.filter(p => p.inStock)

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price)
  else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('category.allProducts')}</h1>
          <p className="text-gray-500">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters and sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-white rounded-xl border border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={e => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-primary-600 rounded"
            />
            <span className="text-sm text-gray-700 font-medium">In Stock Only</span>
          </label>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
            <select
              id="sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <ProductGrid products={filtered} />
      </div>
    </div>
  )
}
