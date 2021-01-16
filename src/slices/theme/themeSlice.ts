import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/rootReducer';

const initialState = {
  mode: 'light'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
  },
});

export const themeSelector = (state: RootState) => state.theme.mode;
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
