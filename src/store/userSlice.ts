import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user_id: null,
        token: null,
        username:null,
        avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU',
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
            state.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU';
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('avatar');
        }

    }
});

export const { login,logout } = userSlice.actions;
