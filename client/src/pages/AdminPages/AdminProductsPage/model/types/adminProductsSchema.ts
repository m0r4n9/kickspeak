import {Product} from "@/entities/Product";

export interface ProductsData {
    products: Product[];
    hasMore: boolean;
}

export interface AdminProductsSchema {
    isLoading: boolean;
    data?: ProductsData;
    page: number;
    error?: string;
}
