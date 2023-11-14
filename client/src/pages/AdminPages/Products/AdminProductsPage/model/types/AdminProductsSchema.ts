import { ErrorInterface } from '@/shared/interfaces/ApiError';

export interface AdminProductsData {
    id?: string;
    name?: string;
    code?: string;
    price?: number;
}

export interface ResProductsAdmin {
    products?: AdminProductsData[];
    page: number;
    hasMore: boolean;
}

export interface AdminProductsSchema {
    isLoading: boolean;
    products?: AdminProductsData[];
    hasMore: boolean;
    page: number;
    query: string;
    error?: ErrorInterface;
}
