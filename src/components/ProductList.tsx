'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { useApp } from '@/context/AppContext'
import { getProducts } from '@/services/api'
import Link from 'next/link'

type Product = {
    id: number
    name: string
    price: number
    image: string
    categories: string[]
}

type ProductListProps = {
    title: string
    category?: string
}

export default function ProductList({ title, category }: ProductListProps) {
    const [products, setProducts] = useState<Product[]>([])
    const { t } = useApp()

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const allProducts = await getProducts()
            const filteredProducts = category
            ? allProducts.filter((product: Product) => product.categories.includes(category))
            : allProducts
            setProducts(filteredProducts)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
        }

        fetchProducts()
    }, [category])

    return (
        <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{title}</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {products.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <Link href="/admin/products" className="mt-8 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
            {t('admin.manageProducts')}
        </Link>
        </div>
    )
}