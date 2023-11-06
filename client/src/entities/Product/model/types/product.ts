import {Brand} from "@/entities/Brand";

interface BrandProduct {
    id: number;
    name: string;
}

export interface SizeProduct {
    id: number;
    name: number;
    productId: number;
}

interface ImageProduct {
    id: number;
    url: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    code?: string;
    sex?: string;
    Brand?: BrandProduct;
    Sizes?: SizeProduct[];
    Images: ImageProduct[];
}
export interface BrandDetails {
    products: Product[];
    brand: Brand;
}

export interface AdditionalProduct {
    id: number;
    name: string;
    Images: ImageProduct[];
}

export interface ProductDetailsInfo {
    product: Product;
    recentProducts: Product[];
    additionalProducts: AdditionalProduct[];
}

export interface ProductDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: ProductDetailsInfo;
}
