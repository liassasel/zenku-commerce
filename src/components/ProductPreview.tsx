import React from 'react';
import type { Product } from '@/types/products';

interface ProductPreviewProps {
    product: Partial<Product>;
    previewSize: 'small' | 'medium' | 'large';
}

export default function ProductPreview({ product, previewSize }: ProductPreviewProps) {
    const sizeClasses = {
    small: 'w-48 h-64',
    medium: 'w-64 h-80',
    large: 'w-80 h-96',
    };

    return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${sizeClasses[previewSize]}`}>
        <div className="relative h-3/5">
        {product.video ? (
            <video 
            src={product.video} 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            />
        ) : (
            <img 
            src={product.image || 'https://i.pinimg.com/564x/c7/02/58/c70258c33f4387c6694d0b44dcf37dd2.jpg'} 
            alt="Product Preview"
            className="w-full h-full object-cover"
            />
        )}
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1">
            ${product.price?.toFixed(2)}
        </div>
        </div>
        <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
            {product.categories?.map((category) => (
            <span key={category} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded">
                {category}
            </span>
            ))}
        </div>
        <div className="flex flex-wrap gap-1">
            {product.sizes?.map((size) => (
            <span key={size} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                {size}
            </span>
            ))}
        </div>
        </div>
    </div>
    );
}