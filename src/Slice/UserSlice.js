import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = 'http://localhost:8080'

const UserSlice = createSlice({
    name: 'user',
    initialState: {
      user: {},
      loading: false,
      error: null,
    },

    reducers: {

      clearErrors: (state) => {
        state.error = null;
      }

    },

    extraReducers: builder => {
      builder
      // -> getPRoducts 

        .addCase(getProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload.AllProduct;
          state.productCount = action.payload.ProductCount;
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

      // -> getProductDetails 

        .addCase(getProductDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(getProductDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.productDetails = action.payload.product;
        })
        .addCase(getProductDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    }
  });
  
  export const { clearErrors } = UserSlice.actions;  // Export the regular actions
  export default productSlice.reducer;  // Export the reducer