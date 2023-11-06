import {ErrorInterface} from "@/shared/interfaces/ErrorInterface.ts";

export interface LoginSchema {
    email: string;
    password: string;
    isLoading: boolean;
    error?: ErrorInterface;
}
