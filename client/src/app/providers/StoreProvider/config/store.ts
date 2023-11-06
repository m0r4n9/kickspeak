import { StateSchema, ThunkExtraArg } from './StateSchema.ts';
import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { createReducerManager } from './reducerManager.ts';
import { saveScrollReducer } from '@/features/scrollSave';
import { $api } from '@/shared/api';
import { userReducer } from '@/entities/User';
import {searchReducer} from "@/features/Search";
import {cartReducer} from "@/entities/Cart";
import {rtkApi} from "@/shared/api/rtkApi.ts";

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        scroll: saveScrollReducer,
        search: searchReducer,
        user: userReducer,
        cart: cartReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArgs: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArgs,
                },
            }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
