import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = 'http://localhost:8080';

export const userLogin = createAsyncThunk('user/userLogin', async( userDetails )=>{
    
    const {email , password} = userDetails;
    let link = `${host}/api/user/login`;
    const config = { headers: { "Content-Type": "application/json" } };
    
    try{
        const { data } = await axios.post(
            link,
            { email, password },
            config
        )
        console.log(data);
    }catch(error){
        return new Error(error.response.data.message);
    }

});

export const userRegister = createAsyncThunk('user/userRegister',async(userDetails)=>{

    let link = `${host}/api/user/register`;
    const config = {headers:{'content-type':'application/json'}};
    try{
        const response = await axios.post(
            link,
            userDetails,
            config
        );
        console.log(response)
    }catch(error){
        return new Error(error.response.data.message);
    }
})

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
      //-> userlogin

        .addCase(userLogin.pending, (state) => {
          state.loading = true;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(userLogin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

    //   -> getProductDetails 

    //     .addCase(getProductDetails.pending, (state) => {
    //       state.loading = true;
    //     })
    //     .addCase(getProductDetails.fulfilled, (state, action) => {
    //       state.loading = false;
    //       state.productDetails = action.payload.product;
    //     })
    //     .addCase(getProductDetails.rejected, (state, action) => {
    //       state.loading = false;
    //       state.error = action.error.message;
    //     });
    }
  });
  
  export const { clearErrors } = UserSlice.actions;  // Export the regular actions
  export default UserSlice.reducer;  // Export the reducer