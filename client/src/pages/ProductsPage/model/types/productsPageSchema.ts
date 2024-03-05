import { EntityState } from '@reduxjs/toolkit';
import { Product, ProductSexField } from '@/entities/Product';
import { SortOrder } from '@/entities/Product';

export interface ColorsFilter {
    id: string;
    name: string;
}

export interface SizesFilter {
    id: string;
    name: string;
}

export interface BrandsFilter {
    id: string;
    name: string;
}

export interface ProductsPageSchema extends EntityState<Product> {
    isLoading?: boolean;
    error?: string;
    _inited: boolean;

    colors?: ColorsFilter[];
    brands?: BrandsFilter[];
    sizes?: SizesFilter[];

    // Pagination
    page: number;
    limit: number;
    totalPage: number;

    maxPriceDB?: number;
    minPriceDB?: number;

    // Filters
    filters: {
        sex: ProductSexField[];
        maxPrice: number;
        minPrice: number;
        color: string[];
        brands: string[];
        sizes: string[];
        order: SortOrder;
    };
}

export interface FetchProductsData {
    products: Product[];
    totalPage: number;
    maxPriceDB: number;
    minPriceDB: number;
}
