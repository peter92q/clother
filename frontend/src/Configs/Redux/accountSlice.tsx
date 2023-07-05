import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { User } from "../Types/User";
import { setBasket } from "./basketSlice";
import agent from "../Axios/axios";
import Cookies from 'js-cookie';

interface AccountState {
    user: User | null;
}
 
const initialState : AccountState = {
    user: null
}

export const signinUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const {basket, ...user} = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            Cookies.set('user', JSON.stringify(user),{
                expires: 7,
                sameSite: 'lax',
                secure: true
            })
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)  

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(Cookies.get('user')!)))
        try {
            const userDto = await agent.Account.currentUser();
            const {basket, ...user} = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            Cookies.set('user', JSON.stringify(user));
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: () => {
            if (!Cookies.get('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state)=>{
            state.user = null;
            localStorage.removeItem('user');
        },
        setUser: (state, action)=>{
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state)=>{
            state.user = null;
            localStorage.removeItem('user');
        })
        builder.addMatcher(isAnyOf(signinUser.fulfilled, fetchCurrentUser.fulfilled), 
        (state, action)=>{
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signinUser.rejected), (_state,action)=>{
            console.log(action.payload)
        })
    }) 
})

export const {signOut, setUser} = accountSlice.actions;