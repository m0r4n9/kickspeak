import {Product} from "@/entities/Product";
import {ErrorInterface} from "@/shared/interfaces/ErrorInterface.ts";

export interface WishListSchema {
    isLoading: boolean;
    products?: Product[];
    error?: ErrorInterface;
}
