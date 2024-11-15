import axios from 'axios';
import type { Product, CreateProductInput, UpdateProductInput } from '@/types/products';

const API_URL = 'http://localhost:3316';

export const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: CreateProductInput): Promise<Product> => {
  const formData = new FormData();
  
  Object.entries(productData).forEach(([key, value]) => {
    if (key === 'price') {
      // Aseguramos que el precio se envíe como número
      formData.append(key, String(Number(value)));
    } else if (Array.isArray(value)) {
      // Manejamos arrays (categorías y tallas)
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof File) {
      // Manejamos archivos
      formData.append(key, value);
    } else {
      // Manejamos otros campos
      formData.append(key, String(value));
    }
  });

  const response = await api.post<Product>('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProduct = async (id: number, productData: UpdateProductInput): Promise<Product> => {
  const formData = new FormData();
  
  Object.entries(productData).forEach(([key, value]) => {
    if (key === 'price') {
      formData.append(key, String(Number(value)));
    } else if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  const response = await api.put<Product>(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};