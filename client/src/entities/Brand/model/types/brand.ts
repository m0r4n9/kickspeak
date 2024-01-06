import {Product} from "@/entities/Product";

export interface Brand {
    id: string;
    name: string;
    foundation?: string;
    country?: string;
    logo?: string;

    productCount?: number;
}

export interface ProductBrand {
    brand: Brand;
    products: Product[];
}
