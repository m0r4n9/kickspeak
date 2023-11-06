import {EntityState} from "@reduxjs/toolkit";

type TypeOption = 'Размер';

interface ProductOption {
    name: TypeOption;
    optionValueId: number;
    value: string;
}

interface SizeOption {
    id: number;
    name: string;
}

interface ImageOption {
    id: number;
    url: string;
}

interface BrandOption {
    id: number;
    name: string;
}

export interface ProductData {
    id: number;
    name: string;
    price: number;
    Brand: BrandOption;
    Sizes: SizeOption;
    Images: ImageOption[];
}

export interface ProductCart {
    products?: ProductData[];
}


export interface CartSchema extends EntityState<ProductData>{
    isLoading: boolean;
    error?: string;
    // data?: ProductCart;
}

export interface CartFields {
    id: string;
    userId: number;
    productId: number;
    sizeId: number;
}
