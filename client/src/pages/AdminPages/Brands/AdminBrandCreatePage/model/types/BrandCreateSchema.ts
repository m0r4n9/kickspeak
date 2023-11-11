import { ErrorInterface } from '@/shared/interfaces/ApiError';
import {Brand} from "@/entities/Brand";

export interface BrandCreateSchema {
    isLoading?: boolean;

    name: string;
    foundation: string;
    country: string;
    error?: ErrorInterface;
}
