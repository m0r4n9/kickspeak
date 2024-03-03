import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { Brand } from '@/entities/Brand';
import {
    Product,
    ProductSexField,
    SortOrder,
} from '@/entities/Product';

export interface ReturnBrandDetailsData {
    brandDetails?: Brand;
    products?: Product[];
    totalPage: number;
}

export interface BrandDetailsSchema {
    isLoading: boolean;
    brand?: Brand;
    products?: Product[];
    error?: ErrorInterface;

    // Pagination
    page: number;
    limit: number;
    totalPage: number;

    // Filters
    sex: ProductSexField[];
    color: string[];
    order: SortOrder;
    priceStart: number;
    priceEnd: number;
}
