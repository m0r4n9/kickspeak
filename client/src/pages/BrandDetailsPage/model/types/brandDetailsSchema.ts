import {ErrorInterface} from "@/shared/interfaces/ErrorInterface.ts";
import {Brand} from "@/entities/Brand";
import {Product, ProductColor, ProductSexField, SortOrder} from "@/entities/Product";

export interface BrandDetailsData {
    brandDetails?: Brand;
    products?: Product[];
    hasMore?: boolean;
}

export interface BrandDetailsSchema {
    isLoading: boolean;
    data?: BrandDetailsData;
    error?: ErrorInterface;

    // Pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // Filters
    sex: ProductSexField[];
    color: ProductColor[];
    order: SortOrder;
    priceStart: number;
    priceEnd: number;
}
