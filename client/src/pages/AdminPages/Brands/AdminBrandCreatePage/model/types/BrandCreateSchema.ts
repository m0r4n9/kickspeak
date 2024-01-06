import { ErrorInterface } from '@/shared/interfaces/ApiError';

export interface BrandCreateSchema {
    isLoading?: boolean;

    name: string;
    foundation: string;
    country: string;
    error?: ErrorInterface;
}
