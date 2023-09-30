import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingImage: false,
    images: [],
    filteredImages: [],
    sortType: {}
}

export const submitSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {
        setLoadingImage: (state, action) => {
            state.isLoadingImage = action.payload
        },
        setImages: (state, action) => {
            state.images = action.payload
        },
        setFilteredImages: (state, action) => {
            state.filteredImages = action.payload
        },
        setSortTypeGlobal: (state, action) => {
            state.sortType = action.payload
        },
    }
})

export const {setLoadingImage, setImages, setFilteredImages, setSortTypeGlobal } = submitSlice.actions
export default submitSlice.reducer