import {ImageProduct, SizeProduct} from "@/entities/Product";
import {ErrorInterface} from "@/shared/interfaces/ApiError";

export interface ProductCreateSchema {
    isLoading: boolean;
    error?: ErrorInterface;

    name: string;
    price: number;
    sex: 'W' | 'U' | 'M';
    code: string;
    colors: string[];
    sizes?: SizeProduct[];
    images?: ImageProduct[]
}