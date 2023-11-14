import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { Brand } from '@/entities/Brand';

export interface BrandProducts {
    id?: string;
    name?: string;
    price?: number;
    code?: string;
}

export interface AdminBrandDetails extends Brand {
    Products: BrandProducts[];
}

export interface AdminBrandDetailsSchema {
    isLoading: boolean;
    data?: AdminBrandDetails;
    form?: Brand;
    error?: ErrorInterface;
}
