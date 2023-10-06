import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    isLoadingAuth: false,
    isFetchingUser: true,
    authError: null,
    userData: null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setLoadingAuth: (state, action) => {
            state.isLoadingAuth = action.payload
        },
        setAuthError: (state, action) => {
            state.authError = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setFetchingUser: (state, action) => {
            state.isFetchingUser = action.payload
        }
    }
})

export const { setAuth, setLoadingAuth, setAuthError, setUserData, setFetchingUser } = authSlice.actions
export default authSlice.reducer