import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../Types/Product";
import axios from "axios";

interface FetchProductsPayload extends Partial<{ 
  skip: number;
  take: number;
  orderBy: string;
  brands: string;
  types: string;
  searchTerm: string;
}>{}

export const fetchProducts = createAsyncThunk(
  "catalogue/fetchProducts",
  async ({ skip, take, orderBy, brands, types, searchTerm }: FetchProductsPayload) => {
    const response = await axios.get("/products", {
      params: { skip, take, orderBy, brands, types, searchTerm },
    });
    return {
      products: response.data.products,
      totalCount: response.data.totalCount,
      filteredTotalCount: response.data.filteredTotalCount,
      brands: response.data.brands,
      types: response.data.types
    };
  }
);

export const catalogueSlice = createSlice({
    name: 'catalogue',
    initialState: {
      products: [] as Product[],
      currentPage: 1,
      productsLoaded: false,
      status: "idle",
      totalCount: 0,
      filteredTotalCount: 0,
      brands: [],
      types: [],
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
          });
          builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.products = action.payload.products;
            state.totalCount = action.payload.totalCount;
            state.filteredTotalCount = action.payload.filteredTotalCount;
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.productsLoaded = true;
          }); 
          builder.addCase(fetchProducts.rejected, (state) => {
            state.status = "failed";
          });
    })
})

export const { setCurrentPage } = catalogueSlice.actions;