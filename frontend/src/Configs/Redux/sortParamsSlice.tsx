import { createSlice } from "@reduxjs/toolkit";

export const sortParamsSlice = createSlice({
    name:'sortParams',
    initialState: {
        sortingParams: {
            brands: "",
            types: "",
            orderBy: "",
            searchTerm: "",
          }
    },
    reducers: {
        setSortingParams: (state, action) => {
            state.sortingParams = action.payload;
          }
    }
})

export const {setSortingParams} = sortParamsSlice.actions