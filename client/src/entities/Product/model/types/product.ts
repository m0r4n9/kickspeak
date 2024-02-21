interface BrandProduct {
    id: number;
    name: string;
}

export interface SizeProduct {
    id: string;
    name: string;
    quantity: number;
    productId: string;
}

export interface ImageProduct {
    id: number;
    url: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    code?: string;
    sex?: string;
    colors?: string[];
    Brand?: BrandProduct;
    Sizes?: SizeProduct[];
    Images: ImageProduct[];
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
