export type { ScrollSaveSchema } from './model/types/ScrollSaveSchema.ts';
export { getScrollSaveByPath } from './model/selectors/scrollSaveSelectors.ts';
export {
    saveScrollActions,
    saveScrollReducer,
} from './model/slices/saveScrollSlice.ts';
