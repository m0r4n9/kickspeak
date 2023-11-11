import { ErrorInterface } from '@/shared/interfaces/ApiError';
import {Brand} from "@/entities/Brand";

export interface BrandCreateSchema {
    isLoading?: boolean;

    name: string;
    foundation: number;
    country: string;
    error?: ErrorInterface;
}
