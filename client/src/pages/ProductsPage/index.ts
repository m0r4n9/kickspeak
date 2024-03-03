export { ProductsPageAsync as ProductsPage } from './ui/ProductsPage/ProductsPage.async.tsx';
export type {
    ProductsPageSchema,
    ColorsFilter,
    BrandsFilter,
} from './model/types/productsPageSchema.ts';
export { getProducts } from './model/slice/productsPageSlice.ts';
export { fetchProductsList } from './model/services/fetchProductsList/fetchProductsList.ts';
export {
    productsPageReducer,
    productsPageActions,
} from './model/slice/productsPageSlice.ts';
