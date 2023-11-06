import {EntityState} from "@reduxjs/toolkit";
import {Brand} from "@/entities/Brand";

export interface BrandsPageSchema extends EntityState<Brand> {
    isLoading?: boolean;
    error?: string;
}