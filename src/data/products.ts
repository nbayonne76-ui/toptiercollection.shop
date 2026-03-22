import { Product } from '@/types'

export const products: Product[] = []

export const getCategoryProducts = (category: string) => {
  return products.filter(p => p.category === category)
}

export const getFeaturedProducts = () => {
  return products.filter(p => p.rating >= 4.7 && p.inStock).slice(0, 8)
}

export const getProductById = (id: string) => {
  return products.find(p => p.id === id)
}

export const categoryLabels: Record<string, string> = {
  'home-decor': 'Home Decor',
  'kitchenware': 'Kitchenware',
  'pet-products': 'Pet Products',
  'beauty-self-care': 'Beauty & Self-Care',
}
