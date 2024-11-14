'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import type { Product, CreateProductInput, UpdateProductInput } from '@/types/products';
import ProductPreview from './ProductPreview';
import { UploadIcon } from 'lucide-react';

interface ProductFormProps {
    initialProduct?: Product;
    onSubmit: (product: CreateProductInput | UpdateProductInput) => Promise<void>;
}

export default function ProductForm({ initialProduct, onSubmit }: ProductFormProps) {
    const { t } = useApp();
    const [product, setProduct] = useState<CreateProductInput>({
    name: '',
    price: 0,
    image: '',
    video: '',
    categories: [],
    sizes: []
    });
    const [previewSize, setPreviewSize] = useState<'small' | 'medium' | 'large'>('medium');
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
    if (initialProduct) {
        const { id, createdAt, updatedAt, ...createProductData } = initialProduct;
        setProduct(createProductData);
    }
    }, [initialProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) : value
    }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setProduct(prev => ({
        ...prev,
        [name]: checked 
        ? [...prev[name as keyof Pick<CreateProductInput, 'categories' | 'sizes'>] as string[], value]
        : (prev[name as keyof Pick<CreateProductInput, 'categories' | 'sizes'>] as string[]).filter(item => item !== value)
    }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
        setProduct(prev => ({ ...prev, [type]: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
        ...product,
        price: parseFloat(String(product.price)) // Fuerza a q sea float
    };

    if (initialProduct) {
        await onSubmit({ ...product, id: initialProduct.id });
    } else {
        await onSubmit(productData);
    }
    };

    return (
    <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            {initialProduct ? t('admin.updateProduct') : t('admin.createProduct')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                {t('product.name')}
                </label>
                <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="price">
                {t('product.price')}
                </label>
                <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="image">
                {t('product.image')}
                </label>
                <div className="flex items-center space-x-2">
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="https://"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <UploadIcon />
                </button>
                </div>
                <input
                type="file"
                ref={imageInputRef}
                onChange={(e) => handleFileChange(e, 'image')}
                accept="image/*"
                className="hidden"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="video">
                {t('product.video')}
                </label>
                <div className="flex items-center space-x-2">
                <input
                    type="text"
                    id="video"
                    name="video"
                    value={product.video}
                    onChange={handleChange}
                    placeholder="https://"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <UploadIcon />
                </button>
                </div>
                <input
                type="file"
                ref={videoInputRef}
                onChange={(e) => handleFileChange(e, 'video')}
                accept="video/*"
                className="hidden"
                />
            </div>

            <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('product.categories')}
                </span>
                <div className="flex flex-wrap gap-3">
                {['featured', 'new', 'best'].map((category) => (
                    <label key={category} className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="categories"
                        value={category}
                        checked={product.categories.includes(category)}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {t(`product.${category}`)}
                    </span>
                    </label>
                ))}
                </div>
            </div>

            <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('product.sizes')}
                </span>
                <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL'].map((size) => (
                    <label key={size} className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="sizes"
                        value={size}
                        checked={product.sizes.includes(size)}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{size}</span>
                    </label>
                ))}
                </div>
            </div>
            </div>

            <div className="space-y-4">
            <div className="text-center">
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.preview')}
                </span>
                <div className="flex justify-center gap-2 mb-4">
                {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                    key={size}
                    type="button"
                    onClick={() => setPreviewSize(size)}
                    className={`px-3 py-1 rounded text-sm ${
                        previewSize === size
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                    >
                    {t(`admin.previewSizes.${size}`)}
                    </button>
                ))}
                </div>
                <div className="flex justify-center">
                <ProductPreview product={product} previewSize={previewSize} />
                </div>
            </div>
            </div>
        </div>

        <div className="mt-6 text-center">
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
            {initialProduct ? t('admin.updateProduct') : t('admin.createProduct')}
            </button>
        </div>
        </form>
    </div>
    );
}