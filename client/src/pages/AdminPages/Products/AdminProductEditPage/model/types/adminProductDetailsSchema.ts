import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { Product } from '@/entities/Product';

export interface AdminProductDetailsSchema {
    isLoading: boolean;
    data?: Product;
    error?: ErrorInterface;
}
