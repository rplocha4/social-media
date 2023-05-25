import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user_id: null,
        token: null,
        username:null,
        avatar:'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png',
    },
    reducers: {
        login: (state, action) => {
            
            state.user_id = action.payload.user_id;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.avatar = action.payload.avatar;
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('user_id', action.payload.user_id);
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('avatar', action.payload.avatar);
            
        },
        logout: (state) => {
            state.user_id = null;
            state.token = null;
            state.username = null;
            state.avatar = 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('avatar');
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
            localStorage.setItem('avatar', action.payload);
        }


    }
});
export const { login,logout,setAvatar } = userSlice.actions;
