import { createSlice } from '@reduxjs/toolkit';
import { defaultAvatar } from '../types/types';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user_id: null,
        token: null,
        role : null,
        username:null,
        avatar:defaultAvatar,
    },
    reducers: {
        login: (state, action) => {
            
            state.user_id = action.payload.user_id;
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.avatar = action.payload.avatar;
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('user_id', action.payload.user_id);
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('avatar', action.payload.avatar);
            localStorage.setItem('role', action.payload.role);
            
        },
        logout: (state) => {
            state.user_id = null;
            state.token = null;
            state.username = null;
            state.role = null;
            state.avatar = defaultAvatar;
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('avatar');
            localStorage.removeItem('role');
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
            localStorage.setItem('avatar', action.payload);
        }


    }
});
export const { login,logout,setAvatar } = userSlice.actions;
