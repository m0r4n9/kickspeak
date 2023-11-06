import {Brand} from "@/entities/Brand";

export interface BrandsData {
    brands: Brand[];
    hasMore: boolean;
}

export interface AdminBrandsSchema {
    isLoading: boolean;
    data?: BrandsData;
    page: number;
    error?: string;
}
