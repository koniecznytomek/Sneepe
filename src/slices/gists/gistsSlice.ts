import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GistsState, Gists, File, Files } from './types';
import { RootState } from '../../store/rootReducer';

const initialState: GistsState = {
    gists: [],
};

const gistsSlice = createSlice({
    name: 'gists',
    initialState,
    reducers: {
        addGists: (state, { payload }: PayloadAction<Gists[]>) => {
            state.gists = payload;
        },
        addGist: (state, { payload }: PayloadAction<Gists>) => {
            state.gists.push(payload);
        },
        deleteGist: (state, { payload }: PayloadAction<string>) => {
            state.gists = state.gists.filter(gist => gist.name !== payload);
        },
        addFile: (state, { payload }: PayloadAction<File>) => {
            const gist = state.gists.find(gist => gist.name === payload.name);
            gist && gist.files.push({ name: payload.filename, text: payload.text });
        },
        updateFile: (state, { payload }: PayloadAction<{ name: string; filename: string; data: Files }>) => {
            state.gists = state.gists.map(gist => {
                if (gist.name === payload.name) {
                    return {
                        ...gist,
                        files: gist.files.map(file =>
                            file.name === payload.filename
                                ? { ...file, name: payload.data.name, text: payload.data.text }
                                : file
                        ),
                    };
                }
                return gist;
            });
        },
        deleteFile: (state, { payload }: PayloadAction<{ name: string; filename: string }>) => {
            state.gists = state.gists.map(gist => {
                if (gist.name === payload.name) {
                    return {
                        ...gist,
                        files: gist.files.filter(file => file.name !== payload.filename),
                    };
                }
                return gist;
            });
        },

        editNote: (state, { payload }: PayloadAction<File & { newFilename: string }>) => {
            state.gists = state.gists.map(gist => {
                if (gist.name === payload.name) {
                    return {
                        ...gist,
                        files: gist.files.map(file =>
                            file.name === payload.filename
                                ? { ...file, text: payload.text, name: payload.newFilename }
                                : file
                        ),
                    };
                }
                return gist;
            });
        },
    },
});

export const getGists = (state: RootState) => state.gistsState.gists;

export const { addGists, addGist, deleteGist, addFile, updateFile, deleteFile, editNote } = gistsSlice.actions;

export default gistsSlice.reducer;
