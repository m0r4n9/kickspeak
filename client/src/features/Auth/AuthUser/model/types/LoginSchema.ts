import {ErrorInterface} from "@/shared/interfaces/ApiError";

export interface LoginSchema {
    email: string;
    password: string;
    isLoading: boolean;
    error?: ErrorInterface;
}
