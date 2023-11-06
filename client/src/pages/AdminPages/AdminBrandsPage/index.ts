export { adminBrandsPageAsync as AdminBrandsPage } from './ui/AdminBrandsPage/AdminBrandsPage.async.tsx';
export type { AdminBrandsSchema } from './model/types/AdminBrandsSchema.ts';
export {
    adminBrandActions,
    adminBrandReducer,
} from './model/slice/adminBrandsSlice.ts';
export {
    getBrandsAdminData,
    getBrandsAdminPage,
} from './model/selectors/adminBrandsSelectors.ts';
