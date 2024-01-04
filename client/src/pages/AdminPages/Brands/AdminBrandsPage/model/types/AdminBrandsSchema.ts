import { Brand } from '@/entities/Brand';
import { ErrorInterface } from '@/shared/interfaces/ApiError';

export interface BrandsData {
    brands: Brand[];
    totalBrands: number;
}

export interface AdminBrandsSchema {
    isLoading: boolean;
    data?: BrandsData;
    query: string;
    page: number;
    limit: number;
    sort?: {
        name: string;
        value: string;
    };
    error?: ErrorInterface;
}
