import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoadingImage: false,
    images: [],
    filteredImages: [],
    sortType: {},
    isShownFavorites: false,
    searchValue: ''
};

export const submitSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {
        setLoadingImage: (state, action) => {
            state.isLoadingImage = action.payload;
        },
        setImages: (state, action) => {
            state.images = action.payload;
        },
        setFilteredImages: (state, action) => {
            state.filteredImages = action.payload;
        },
        setSortType: (state, action) => {
            state.sortType = action.payload;
        },
        setShownFavorites: (state, action) => {
            state.isShownFavorites = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
    },
});

export const {
    setLoadingImage,
    setImages,
    setFilteredImages,
    setSortType,
    setShownFavorites,
    setSearchValue,
} = submitSlice.actions;

export default submitSlice.reducer;
