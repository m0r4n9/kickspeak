import {Product} from "@/entities/Product";
import {ErrorInterface} from "@/shared/interfaces/ApiError";

export interface WishListSchema {
    isLoading: boolean;
    products?: Product[];
    error?: ErrorInterface;
}
