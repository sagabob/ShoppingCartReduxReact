import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../../utils/constants";
import { CartItem, CartProps } from "./cartType";

const initialState: CartProps = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_: void, thunkAPI) => {
    try {
      const resp = await axios(apiUrl);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state: CartProps) => {
      state.cartItems = [];
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state: CartProps, action: PayloadAction<CartItem>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (cartItem !== undefined) cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, action: PayloadAction<CartItem>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (cartItem !== undefined) cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state: CartProps) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
