import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/auth/authSlice';
import collectionsReducer from '../slices/collections/collectionsSlice';
import gistReducer from '../slices/gist/gistSlice';
import gistsReducer from '../slices/gists/gistsSlice';
import themeReducer from '../slices/theme/themeSlice';
import trashReducer from '../slices/trash/trashSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    collectionsState: collectionsReducer,
    gist: gistReducer,
    gistsState: gistsReducer,
    theme: themeReducer,
    stateTrash: trashReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
