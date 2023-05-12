import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user_id: null,
        token: null
    },
    reducers: {
        login: (state, action) => {
            state.user_id = action.payload.user_id;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user_id = null;
            state.token = null;

        }

    }
});

export const { login,logout } = userSlice.actions;
