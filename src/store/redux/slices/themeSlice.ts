import { createSelector, createSlice } from '@reduxjs/toolkit';

type Theme = "dark" | "light"

const themeSlice = createSlice({
    name: 'theme',
    initialState: "light" as Theme,
    reducers: {
        toggleTheme: (state) => {
            return state == "dark" ? "light" : "dark";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;


export const selectTheme = createSelector(
    state => state.theme,
    theme => theme
);

export default themeSlice.reducer;