import { ReactNode } from 'react';

interface Translations {
    [key: string]: TranslationValue | Translations;
}

type TranslationValue = string | ReactNode | ((params: Record<string, string | number>) => string);

const translations: Record<string, Translations> = {
    en: {
    common: {
        home: "Home",
        products: "Products",
        cart: "Cart",
        profile: "Profile",
        addToCart: "Add to Cart",
        welcome: "Welcome to our store",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        language: "Language",
        backToHome: "Back to Home"
    },
    product: {
        name: "Product Name",
        price: "Price",
        image: "Product Image",
        video: "Product Video",
        categories: "Categories",
        sizes: "Available Sizes",
        description: "Description",
        featured: "Featured",
        new: "New",
        best: "Best Seller",
    nav: {
        toggleMenu: "Toggle menu"
    },
    home: {
        description: "Discover our curated selection of premium products.",
        featuredProducts: "Featured Products",
        newArrivals: "New Arrivals",
        bestSellers: "Best Sellers"
    },
    footer: {
        company: "Company",
        about: "About",
        careers: "Careers",
        support: "Support",
        contact: "Contact",
        faq: "FAQ",
        legal: "Legal",
        privacy: "Privacy",
        terms: "Terms",
        social: "Social",
        companyName: "Zenku",
        rightsReserved: "All rights reserved.",
        madeBy: "Made by"
    },
    admin: {
        manageProducts: "Manage Products",
        createProduct: "Create Product",
        updateProduct: "Update Product",
        productList: "Product List",
        edit: "Edit",
        delete: "Delete",
        editProduct: "Edit Product",
        confirmDelete: "Are you sure you want to delete this product?",
        preview: "Preview",
        previewSizes: {
            small: "Small",
            medium: "Medium",
            large: "Large"
    },
    noProducts: "",
    },
}   ,
    },
    es: {
    common: {
        home: "Inicio",
        products: "Productos",
        cart: "Carrito",
        profile: "Perfil",
        addToCart: "Añadir al carrito",
        welcome: "Bienvenido a nuestra tienda",
        darkMode: "Modo oscuro",
        lightMode: "Modo claro",
        language: "Idioma",
        backToHome: "Volver al Inicio"
    },
    product: {
        name: "Nombre del Producto",
        price: "Precio",
        image: "Imagen del Producto",
        video: "Video del Producto",
        categories: "Categorías",
        sizes: "Tallas Disponibles",
        description: "Descripción",
        featured: "Destacado",
        new: "Nuevo",
        best: "Más Vendido"
        },
    nav: {
        toggleMenu: "Alternar menú"
    },
    home: {
        description: "Descubre nuestra selección curada de productos premium.",
        featuredProducts: "Productos Destacados",
        newArrivals: "Nuevos Productos",
        bestSellers: "Más Vendidos"
    },
    footer: {
        company: "Empresa",
        about: "Acerca de",
        careers: "Carreras",
        support: "Soporte",
        contact: "Contacto",
        faq: "Preguntas frecuentes",
        legal: "Legal",
        privacy: "Privacidad",
        terms: "Términos",
        social: "Social",
        companyName: "Zenku",
        rightsReserved: "Todos los derechos reservados.",
        madeBy: "Hecho por"
    },
    admin: {
        manageProducts: "Administrar Productos",
        createProduct: "Crear Producto",
        updateProduct: "Actualizar Producto",
        productList: "Lista de Productos",
        edit: "Editar",
        delete: "Eliminar",
        editProduct: "Editar Producto",
        confirmDelete: "¿Estás seguro de que quieres eliminar este producto?",
        preview: "Vista Previa",
        previewSizes: {
            small: "Pequeño",
            medium: "Mediano",
            large: "Grande"
        },
        noProducts: "No se encontraron productos. ¡Crea uno para empezar!"
        },
    }
};

export type Lang = keyof typeof translations;

export const getTranslation = (lang: Lang, key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
    if (value[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
    }
    value = value[k];
    }

    if (typeof value === 'function') {
    return value(params || {});
    }

    if (typeof value === 'string') {
    return value;
    }

    console.warn(`Invalid translation value for key: ${key}`);
    return key;
};

export default translations;