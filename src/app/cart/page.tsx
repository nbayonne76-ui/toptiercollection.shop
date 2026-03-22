'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/useCartStore'
import { useLanguage } from '@/context/LanguageContext'

export default function CartPage() {
  const { t } = useLanguage()
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const clearCart = useCartStore(state => state.clearCart)
  const totalPrice = useCartStore(state => state.totalPrice())

  const shippingCost = totalPrice >= 50 ? 0 : 5.99
  const orderTotal = totalPrice + shippingCost
  const remainingForFreeShipping = Math.max(0, 50 - totalPrice)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('cart.title')}</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('cart.empty')}</h2>
            <p className="text-gray-500 mb-8">{t('cart.emptyDesc')}</p>
            <Link
              href="/products"
              className="bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free shipping progress */}
              {remainingForFreeShipping > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
                  <p className="text-sm text-gray-700 mb-2">
                    Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for free shipping!
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full transition-all"
                      style={{ width: `${Math.min(100, (totalPrice / 50) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {remainingForFreeShipping === 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-green-800 text-sm font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  You qualify for free shipping!
                </div>
              )}

              {/* Items list */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-5 p-5 hover:bg-gray-50/50 transition-colors">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">
                          ${item.product.price.toFixed(2)} each
                        </p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-sm text-red-500 hover:text-red-700 transition-colors"
                          >
                            {t('cart.remove')}
                          </button>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Link
                  href="/products"
                  className="text-sm text-black hover:text-zinc-700 font-medium flex items-center gap-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  {t('cart.continueShopping')}
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{t('cart.subtotal')}</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{t('cart.shipping')}</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="h-px bg-gray-100 my-2" />
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>{t('cart.total')}</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition-colors text-base shadow-lg hover:shadow-xl">
                  {t('cart.checkout')}
                </button>

                <div className="mt-5 space-y-2">
                  {['🔒 Secure checkout', '↩️ 30-day easy returns', '📦 Ships in 1-2 business days'].map(badge => (
                    <p key={badge} className="text-xs text-gray-500 flex items-center gap-2">
                      {badge}
                    </p>
                  ))}
                </div>

                {/* Promo code */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-2">Promo Code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button className="text-sm font-semibold text-black hover:text-zinc-700 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
