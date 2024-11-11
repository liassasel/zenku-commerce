'use client'

import { useState, useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/api'
import type { Product, CreateProductInput, UpdateProductInput } from '@/types/products'
import ProductForm from '@/components/ProductForm'
import Link from 'next/link'

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const { t } = useApp()

    useEffect(() => {
    fetchProducts()
    }, [])

    const fetchProducts = async () => {
    try {
        const fetchedProducts = await getProducts()
        setProducts(fetchedProducts)
    } catch (error) {
        console.error('Error fetching products:', error)
    }
    }

    const handleCreateProduct = async (productData: CreateProductInput) => {
    try {
        await createProduct(productData)
        fetchProducts()
    } catch (error) {
        console.error('Error creating product:', error)
    }
    }

    const handleUpdateProduct = async (productData: UpdateProductInput) => {
    try {
        await updateProduct(productData.id, productData)
        setEditingProduct(null)
        fetchProducts()
    } catch (error) {
        console.error('Error updating product:', error)
    }
    }

    const handleDeleteProduct = async (id: number) => {
    if (window.confirm(t('admin.confirmDelete'))) {
        try {
        await deleteProduct(id)
        fetchProducts()
        } catch (error) {
        console.error('Error deleting product:', error)
        }
    }
    }

    const handleSubmit = async (productData: CreateProductInput | UpdateProductInput) => {
    if ('id' in productData) {
        await handleUpdateProduct(productData as UpdateProductInput)
    } else {
        await handleCreateProduct(productData)
    }
    }

    return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">{t('admin.manageProducts')}</h1>
        <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('admin.createProduct')}</h2>
        <ProductForm onSubmit={handleSubmit} />
        </div>
        <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('admin.productList')}</h2>
        <div className="space-y-4">
            {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{t('product.price')}: ${product.price.toFixed(2)}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{t('product.categories')}: {product.categories.join(', ')}</p>
                <div className="flex space-x-2">
                <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    {t('admin.edit')}
                </button>
                <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                    {t('admin.delete')}
                </button>
                </div>
                {editingProduct && editingProduct.id === product.id && (
                <div className="mt-4">
                    <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{t('admin.editProduct')}</h4>
                    <ProductForm initialProduct={editingProduct} onSubmit={handleSubmit} />
                </div>
                )}
            </div>
            ))}
        </div>
        </div>
        <Link href="/" className="mt-8 inline-block bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
        {t('common.backToHome')}
        </Link>
    </div>
    )
}