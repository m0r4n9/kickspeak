import {Profile} from "@/entities/Profile";
import {ErrorInterface} from "@/shared/interfaces/ErrorInterface.ts";
import {CartFields} from "@/entities/Cart";
import {SizeProduct} from "@/entities/Product/model/types/product.ts";

export interface AdminCart {
    id?: string;
    name?: string;
    Sizes?: SizeProduct[];
}

export interface AdminProfileDetails {
    user: Profile;
    cart: AdminCart[];
}

export interface AdminUserDetailsSchema {
    isLoading: boolean;
    data?: AdminProfileDetails;
    form?: Profile;
    error?: ErrorInterface;
}
