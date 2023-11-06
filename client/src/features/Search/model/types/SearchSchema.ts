import {Brand} from "@/entities/Brand";
import {Product} from "@/entities/Product";

export interface ResultSearch {
    brands: Brand[];
    products: Product[]
}

export interface SearchSchema {
    isLoading: boolean;
    error?: string;
    query?: string;
    result?: ResultSearch;
}
