export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    video?: string;
    categories: string[];
    sizes: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateProductInput {
    name: string;
    price: number;
    image: string;
    video?: string;
    categories: string[];
    sizes: string[];
}

export interface UpdateProductInput extends CreateProductInput {
    id: number;
}