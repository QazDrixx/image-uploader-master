import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isError: '',
}

export const submitSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {
        setLoadingState: (state, action) => {
            state.isLoading = action.payload
        },
        setErrorState: (state, action) => {
            state.isError = action.payload
        },
    }
})

export const {setLoadingState, setErrorState } = submitSlice.actions
export default submitSlice.reducer