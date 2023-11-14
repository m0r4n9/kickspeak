import { Brand } from '@/entities/Brand';
import { ErrorInterface } from '@/shared/interfaces/ApiError';

export interface BrandsData {
    brands: Brand[];
    hasMore: boolean;
}

export interface AdminBrandsSchema {
    isLoading: boolean;
    data?: BrandsData;
    query: string;
    page: number;
    error?: ErrorInterface;
}
