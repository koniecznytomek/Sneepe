import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollectionsState, Collections, Collection } from './types';
import { RootState } from '../../store/rootReducer';

const initialState: CollectionsState = {
  collections: [],
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    addCollections: (state, { payload }: PayloadAction<Collections[]>) => {
      state.collections = payload;
    },
    addCollection: (state, { payload }: PayloadAction<string>) => {
      state.collections.push({ name: payload, gists: [] });
    },
    addToCollection: (state, { payload }: PayloadAction<Collection>) => {
      const collection = state.collections.find(
        collection => collection.name === payload.name
      );
      collection && collection.gists.push(payload.gist);
    },
    deleteCollection: (state, { payload }: PayloadAction<string>) => {
      state.collections = state.collections.filter(
        collection => collection.name !== payload
      );
    },
    deleteFromCollection: (state, { payload }: PayloadAction<Collection>) => {
      state.collections.map(collection =>
        collection.name === payload.name
          ? (collection.gists = collection.gists.filter(
              gist => gist !== payload.gist
            ))
          : collection
      );
    },
    renameCollection: (
      state,
      { payload }: PayloadAction<{ name: string; newName: string }>
    ) => {
      state.collections = state.collections.map(collection =>
        collection.name === payload.name
          ? { name: payload.newName, gists: collection.gists }
          : collection
      );
    },
  },
});

export const collectionsSelector = (state: RootState) =>
  state.collectionsState.collections;

export const {
  addCollections,
  addCollection,
  addToCollection,
  deleteCollection,
  deleteFromCollection,
  renameCollection,
} = collectionsSlice.actions;
export default collectionsSlice.reducer;
