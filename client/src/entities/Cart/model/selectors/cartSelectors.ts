import { StateSchema } from '@/app/providers/StoreProvider';

export const getCartIsLoading = (state: StateSchema) => state.cart.isLoading;
export const getCartError = (state: StateSchema) => state.cart.error;
