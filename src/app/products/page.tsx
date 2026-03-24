export const dynamic = 'force-dynamic'

import { getAllProducts } from '@/lib/shopify'
import ProductsClient from './ProductsClient'

export default async function AllProductsPage() {
  const products = await getAllProducts()
  return <ProductsClient initialProducts={products} />
}
