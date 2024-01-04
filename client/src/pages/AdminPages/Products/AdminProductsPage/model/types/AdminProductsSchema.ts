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
    totalCount: number;
}

export interface AdminProductsSchema {
    isLoading: boolean;
    products?: AdminProductsData[];
    totalCount?: number;
    page: number;
    limit: number;
    query: string;
    error?: ErrorInterface;
}
