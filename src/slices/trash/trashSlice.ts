import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/rootReducer';
import { TrashState } from './types';
import { Gists } from '../gists/types';

const initialState: TrashState = {
  trash: [],
};

const trashSlice = createSlice({
  name: 'trash',
  initialState,
  reducers: {
    putToTrash: (state, { payload }: PayloadAction<Gists>) => {
      state.trash.push(payload);
    },
  },
});

export const getTrash = (state: RootState) => state.stateTrash.trash;
export const { putToTrash } = trashSlice.actions;
export default trashSlice.reducer;
