import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCookie } from "../../Utils/Cookie";
import { Basket } from "../Types/Basket";
import agent from "../Axios/axios";

interface BasketState {
    basket: Basket | null
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle',
}

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if (!getCookie('buyerId')) return false;
        }
    }
)

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number, size: string}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1, size}, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId, quantity, size);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const removeBasketItemAsync = 
createAsyncThunk<void, {productId: number, quantity: number, name?: string, size: string}>(
    'basket/removeBasketItemAsync',
    async({productId, quantity, size },thunkAPI) =>{
        try{
            await agent.Basket.removeItem(productId, quantity, size);
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const basketSlice = createSlice({
    name: "basket",
    initialState, 
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        clearBasket: (state) => {
            state.basket = null;
        }
    },
    extraReducers: (builder=>{
        builder.addCase(addBasketItemAsync.pending, (state, action)=>{
            state.status = 'pendingAddItem' + action.meta.arg.size+ action.meta.arg.productId;
        });
        builder.addCase(fetchBasketAsync.pending, (state)=>{
            state.status = 'pending';
        });
        builder.addCase(removeBasketItemAsync.pending,(state, action)=>{
            state.status = 'pendingRemoveItem' + action.meta.arg.size + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled,(state, action)=>{
            const {productId, size, quantity} = action.meta.arg;
            const itemIndex= state.basket?.items.findIndex(i => i.productId === productId && i.size === size);
            if(itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket?.items[itemIndex].quantity === 0) 
                state.basket.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action)=>{
            state.status = 'idle';
            console.log(action.payload);
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state,action)=>{
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected,fetchBasketAsync.rejected), (state)=>{
            state.status = 'idle';
        });
    })
})

export const {setBasket, clearBasket} = basketSlice.actions;