import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = 'http://localhost:8080';

export const userLogin = createAsyncThunk('user/userLogin', async( userDetails )=>{
    
    const {email , password} = userDetails;
    let link = `${host}/api/user/login`;
    const config = { headers: { "Content-Type": "application/json" } };
    
    try{
        const response  = await axios.post(
            link,
            { email, password },{
                ...config,
                withCredentials: true
            }
        )
        // console.log(response)
        return response.data.user;
    }catch(error){
        throw new Error(error.response.data.message);
    }

});

export const userRegister = createAsyncThunk('user/userRegister',async(userDetails)=>{

    let link = `${host}/api/user/register`;
    const config = {headers:{'content-type':'application/json'}};
    try{
        const response = await axios.post(
            link,
            userDetails,{
                ...config,
                withCredentials: true
            }
        );
        return response.data.user; 
    }catch(error){
        throw new Error(error.response.data.message);
    }
})


export const  userLoad = createAsyncThunk('user/userLoader',async()=>{

    let link = `${host}/api/user/myDetails`;
    try{
        const response = await axios.get(
            link,
            {withCredentials :true},
        )
        return response.data.user;
    }catch(error){
        throw new Error(error.response.data.message);
    }
})

export const  userLogOut = createAsyncThunk('user/userLogOut',async()=>{

  let link = `${host}/api/user/logout`;

  try{
      const response = await axios.post(
          link,
          {withCredentials :true},
      )
      return response.data;
  }catch(error){
      throw new Error(error.response.data.message);
  }
})

const UserSlice = createSlice({
    name: 'user',
    initialState: {
      user: {},
      loading: false,
      isAuthenticated:false,
      error: null,
    },

    reducers: {

      clearErrors: (state) => {
        console.log(state.error)
        state.error = null;
      }

    },

    extraReducers: builder => {
      builder
      //-> userlogin

        .addCase(userLogin.pending, (state) => {
          state.loading = true;
          state.isAuthenticated = false;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
        })
        .addCase(userLogin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          state.user = {};
          state.isAuthenticated = false;
        })

      //-> userRegister 

        .addCase(userRegister.pending, (state) => {
          state.loading = true;
          state.isAuthenticated = false;
        })
        .addCase(userRegister.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        })
        .addCase(userRegister.rejected, (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user={};
          state.error = action.error.message;
        })
    
    //-> userLoad

        .addCase(userLoad.pending, (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        })
        .addCase(userLoad.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase(userLoad.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user={};
            state.error = action.error.message;
        })
    
    //-> userLogOut    

        .addCase(userLogOut.pending, (state) => {
          state.loading = true;
          state.isAuthenticated = false;
        })
        .addCase(userLogOut.fulfilled, (state, action) => {
            state.loading = false;
            state.user = {};
            state.isAuthenticated=false;
        })
        .addCase(userLogOut.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.error.message;
        })
    }

  });
  
  export const { clearErrors } = UserSlice.actions;  // Export the regular actions
  export default UserSlice.reducer;  // Export the reducer