import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import submitSlice from "./submitSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        submit: submitSlice
    },
})