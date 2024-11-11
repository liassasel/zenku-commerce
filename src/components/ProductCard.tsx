import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { useApp } from '@/context/AppContext'

type Product = {
    id: number
    name: string
    price: number
    image: string
    categories: string[]
}

export default function ProductCard({ product }: { product: Product }) {
    const { t } = useApp()

    return (
    <div className="bg-white dark:bg-[#1A1D23] rounded-lg overflow-hidden w-full max-w-sm transition-all duration-200 hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-800">
        <div className="relative aspect-square">
        <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
        />
        </div>
        <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
            {product.categories.map((category) => (
            <span
                key={category}
                className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
                {t(`product.categories.${category}`)}
            </span>
            ))}
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">${product.price.toFixed(2)}</p>
        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#1A1D23]">
            <ShoppingCart className="w-5 h-5" />
            {t('common.addToCart')}
        </button>
        </div>
    </div>
    )
}