import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gist } from './types';
import { RootState } from '../../store/rootReducer';

const initialState: Gist = {
  name: '',
  currentCollection: '',
};

const gistSlice = createSlice({
  name: 'gist',
  initialState,
  reducers: {
    setDragged: (state, { payload }: PayloadAction<Gist>) => {
     state.name = payload.name;
     state.currentCollection = payload.currentCollection;
    },
  },
});

export const draggedSelector = (state: RootState) => state.gist;
export const { setDragged } = gistSlice.actions;
export default gistSlice.reducer;
