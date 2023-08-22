import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = 'http://localhost:8080'

export const getProducts = createAsyncThunk( 'products/getProduct', async (params) => {
      const { keyword='' , category=''} = params;

      let link = `${host}/api/product/getAllProducts?keyword=${keyword}`;

      if(category){
        link = `${host}/api/product/getAllProducts?keyword=${keyword}&category=${category}`;
      }

      try {
        const response = await axios.get(link);
        console.log(response)
        return response.data;
      } catch (error) {
        return new Error(error.response.data.message);
      }
    }
);

export const getProductDetails = createAsyncThunk( 'products/getProductDetails', async (id) => {

  const link = `${host}/api/product/${id}`;
  try {
    const response = await axios.get(link);
    console.log(response)
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
      products: [],
      loading: false,
      error: null,
      productDetails: {},
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
  
  export const { clearErrors } = productSlice.actions;  // Export the regular actions
  export default productSlice.reducer;  // Export the reducer