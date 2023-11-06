import {StateSchema} from "@/app/providers/StoreProvider";

export const getSearchQuery = (state: StateSchema) => state.search.query || '';
export const getSearchResult = (state: StateSchema) => state.search.result;
