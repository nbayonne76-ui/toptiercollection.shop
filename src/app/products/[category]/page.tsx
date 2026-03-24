'use client'

import { notFound } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProductsByCategory } from '@/lib/shopify'
import { Category, Product } from '@/types'
import { categoryLabels } from '@/data/products'
import ProductGrid from '@/components/ProductGrid'
import { useLanguage } from '@/context/LanguageContext'

const VALID_CATEGORIES: Category[] = ['home-decor', 'kitchenware', 'pet-products', 'beauty-self-care']

const categoryMeta: Record<Category, { description: string; emoji: string }> = {
  'home-decor': { description: 'Transform your living space with beautiful, functional decor.', emoji: '🏠' },
  'kitchenware': { description: 'Elevate your cooking with professional-grade tools and cookware.', emoji: '🍳' },
  'pet-products': { description: 'Give your furry family members the comfort they deserve.', emoji: '🐾' },
  'beauty-self-care': { description: 'Invest in yourself with premium beauty and wellness products.', emoji: '✨' },
}

interface CategoryPageProps {
  params: { category: string }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { t } = useLanguage()
  const [sort, setSort] = useState('featured')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const category = params.category as Category

  if (!VALID_CATEGORIES.includes(category)) notFound()

  const meta = categoryMeta[category]
  const categoryLabel = categoryLabels[category]

  useEffect(() => {
    getProductsByCategory(category).then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [category])

  let sorted = [...products]
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white font-medium">{categoryLabel}</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{meta.emoji}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">{categoryLabel}</h1>
              <p className="text-white/80 max-w-xl">{meta.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-white rounded-xl border border-gray-100">
          <p className="text-sm text-gray-600">
            Showing <strong>{sorted.length}</strong> products in {categoryLabel}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
            <select
              id="sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ProductGrid products={sorted} emptyMessage="Products coming soon, check back shortly!" />
        )}

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Looking for something else?</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-zinc-800 transition-colors"
          >
            {t('category.allProducts')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
