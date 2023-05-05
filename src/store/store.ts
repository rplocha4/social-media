import { configureStore } from "@reduxjs/toolkit";
import { serverApi } from './features/serverApi'

export default configureStore({
    reducer: {
            [serverApi.reducerPath]: serverApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serverApi.middleware)
})


