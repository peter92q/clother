import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { accountSlice } from "./accountSlice";
import { basketSlice } from "./basketSlice";
import { catalogueSlice } from "./catalogueSlice";
import { sortParamsSlice } from "./sortParamsSlice";

export const store = configureStore({
    reducer: {
        catalog: catalogueSlice.reducer, 
        basket: basketSlice.reducer,
        account: accountSlice.reducer,
        params: sortParamsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
