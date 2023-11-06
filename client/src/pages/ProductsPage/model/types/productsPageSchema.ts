import {EntityState} from "@reduxjs/toolkit";
import {Product, ProductColor, ProductSexField} from "@/entities/Product";
import {SortOrder} from "@/entities/Product";

export interface ProductsPageSchema extends EntityState<Product> {
    isLoading?: boolean;
    error?: string;

    // Pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // Filters
    sex: ProductSexField[];
    priceStart: number;
    priceEnd: number;
    order: SortOrder;
    color: ProductColor[];

    _inited: boolean;
}
