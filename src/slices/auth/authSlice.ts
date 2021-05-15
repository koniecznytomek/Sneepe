import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/rootReducer';

const initialState = {
  token: `${process.env.REACT_APP_TOKEN}`,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
  },
});

export const getToken = (state: RootState) => state.auth.token;
export const { setToken } = authSlice.actions;
export default authSlice.reducer;
