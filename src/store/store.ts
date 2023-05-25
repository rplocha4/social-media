import { configureStore } from "@reduxjs/toolkit";
import { serverApi } from './features/serverApi'
import { uiSlice } from './uiSlice'
import { userSlice } from "./userSlice";

const store = configureStore({
    reducer: {
            ui: uiSlice.reducer,
            user: userSlice.reducer,
            [serverApi.reducerPath]: serverApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }).concat(serverApi.middleware)
})

export default store;
export type RootState = ReturnType<typeof store.getState>