import { ScrollSaveSchema } from '../types/ScrollSaveSchema.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ScrollSaveSchema = {
    scroll: {},
};

const saveScrollSlice = createSlice({
    name: 'saveScroll',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const { actions: saveScrollActions, reducer: saveScrollReducer } =
    saveScrollSlice;
