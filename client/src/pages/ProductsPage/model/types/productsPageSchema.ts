import { EntityState } from '@reduxjs/toolkit';
import { Product, ProductColor, ProductSexField } from '@/entities/Product';
import { SortOrder } from '@/entities/Product';

export interface ProductsPageSchema extends EntityState<Product> {
    isLoading?: boolean;
    error?: string;
    _inited: boolean;

    // Pagination
    page: number;
    limit: number;
    hasMore: boolean;

    maxPriceDB?: number;
    minPriceDB?: number;

    UserFavoriteProducts?: {
        userId: string;
    };

    // Filters
    filters: {
        sex: ProductSexField[];
        maxPrice: number;
        minPrice: number;
        order: SortOrder;
        color: (typeof ProductColor)[];
    };
}

export interface FetchProductsData {
    products: Product[];
    hasMore: boolean;
    maxPriceDB: number;
    minPriceDB: number;
}
