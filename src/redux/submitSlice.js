import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingImage: false,
}

export const submitSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {
        setLoadingImage: (state, action) => {
            state.isLoadingImage = action.payload
        },
    }
})

export const {setLoadingImage } = submitSlice.actions
export default submitSlice.reducer