export type Category = 'home-decor' | 'kitchenware' | 'pet-products' | 'beauty-self-care'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  category: Category
  description: string
  rating: number
  reviewCount: number
  image: string
  inStock: boolean
  tags: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export type Language = 'en' | 'fr'

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

export interface Testimonial {
  id: string
  name: string
  rating: number
  text: string
  date: string
  product: string
}
