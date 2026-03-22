'use client'

import { notFound } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById, getCategoryProducts, categoryLabels } from '@/data/products'
import { useCartStore } from '@/store/useCartStore'
import { useLanguage } from '@/context/LanguageContext'
import ProductCard from '@/components/ProductCard'

interface ProductDetailPageProps {
  params: { id: string }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { t } = useLanguage()
  const addItem = useCartStore(state => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [tab, setTab] = useState<'description' | 'reviews'>('description')

  const product = getProductById(params.id)
  if (!product) notFound()

  const related = getCategoryProducts(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addItem(product)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary-600 transition-colors">Products</Link>
          <span>/</span>
          <Link href={`/products/${product.category}`} className="hover:text-primary-600 transition-colors">
            {categoryLabels[product.category]}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10 mb-10">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Category badge */}
            <span className="inline-flex w-fit items-center bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {categoryLabels[product.category]}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviewCount} {t('product.reviews')})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-sm font-semibold text-red-600">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                </>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-6">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                {product.inStock ? t('product.inStock') : t('product.outOfStock')}
              </span>
            </div>

            {/* Description preview */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
              {product.description}
            </p>

            {/* Quantity selector */}
            {product.inStock && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">{t('cart.quantity')}:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3.5 rounded-xl font-semibold text-base transition-all ${
                  !product.inStock
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg'
                }`}
              >
                {addedToCart ? `✓ ${t('product.addedToCart')}` : t('product.addToCart')}
              </button>
              {product.inStock && (
                <Link
                  href="/cart"
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 rounded-xl font-semibold text-base border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors text-center"
                >
                  {t('product.buyNow')}
                </Link>
              )}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-3">
              {[
                { icon: '🔒', text: 'Secure Checkout' },
                { icon: '🚚', text: 'Free shipping over $50' },
                { icon: '↩️', text: '30-day returns' },
                { icon: '⭐', text: 'Top rated product' },
              ].map(badge => (
                <div key={badge.text} className="flex items-center gap-2 text-xs text-gray-600">
                  <span>{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10 mb-10">
          <div className="flex border-b border-gray-100 mb-6 gap-6">
            {(['description', 'reviews'] as const).map(t_tab => (
              <button
                key={t_tab}
                onClick={() => setTab(t_tab)}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors capitalize ${
                  tab === t_tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {t_tab === 'description' ? t('product.description') : `${t('product.reviews')} (${product.reviewCount})`}
              </button>
            ))}
          </div>

          {tab === 'description' ? (
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
              <p>{product.description}</p>
              <ul className="mt-4 space-y-2">
                <li>High-quality materials selected for durability</li>
                <li>Designed for everyday use, practical and stylish</li>
                <li>Ships in protective packaging to ensure safe delivery</li>
                <li>Backed by our 30-day return policy</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                <div className="text-4xl font-bold text-primary-600">{product.rating}</div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Based on {product.reviewCount} reviews</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">Detailed reviews are available in the full product experience.</p>
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('product.relatedProducts')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
