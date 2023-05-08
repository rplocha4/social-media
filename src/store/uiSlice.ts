import { createSlice } from "@reduxjs/toolkit";

export const uiSlice =  createSlice({
    name: 'ui',
    initialState: {
        darkMode: true,
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    }
})

export const { toggleDarkMode } = uiSlice.actions;