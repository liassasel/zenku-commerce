import axios from 'axios';
import type { Product, CreateProductInput, UpdateProductInput } from '../types/products';

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

export const createProduct = async (product: CreateProductInput): Promise<Product> => {
    const response = await api.post<Product>('/products', product);
    return response.data;
};

export const updateProduct = async (id: number, product: UpdateProductInput): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
};