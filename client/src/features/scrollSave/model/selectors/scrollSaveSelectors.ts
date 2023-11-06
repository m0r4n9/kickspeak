import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getScrollSave = (state: StateSchema) => state.scroll.scroll;
export const getScrollSaveByPath = createSelector(
    getScrollSave,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
