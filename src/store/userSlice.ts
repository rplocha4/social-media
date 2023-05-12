import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user_id: null,
        token: null,
        username:null,
    },
    reducers: {
        login: (state, action) => {
            state.user_id = action.payload.user_id;
            state.token = action.payload.token;
            state.username = action.payload.username;
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('user_id', action.payload.user_id);
            localStorage.setItem('username', action.payload.username);
            
        },
        logout: (state) => {
            state.user_id = null;
            state.token = null;
            state.username = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
        }

    }
});

export const { login,logout } = userSlice.actions;
