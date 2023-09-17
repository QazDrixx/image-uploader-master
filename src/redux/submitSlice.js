import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingImage: false,
    isError: '',
}

export const submitSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {
        setLoadingImage: (state, action) => {
            state.isLoadingImage = action.payload
        },
        setErrorState: (state, action) => {
            state.isError = action.payload
        },
    }
})

export const {setLoadingImage, setErrorState } = submitSlice.actions
export default submitSlice.reducer