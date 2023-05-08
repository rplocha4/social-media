import { configureStore } from "@reduxjs/toolkit";
import { serverApi } from './features/serverApi'
import { uiSlice } from './uiSlice'

const store = configureStore({
    reducer: {
            ui: uiSlice.reducer,
            [serverApi.reducerPath]: serverApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serverApi.middleware)
})

export default store;
export type RootState = ReturnType<typeof store.getState>