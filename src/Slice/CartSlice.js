import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const host = 'http://localhost:8080'

export const addTocart = createAsyncThunk('cart/addTocart', async(params)=>{
    const { id , quantity} = params;
    console.log(id , quantity)
    const link = `${host}/api/product/${id}`;
    let { data } = await axios.get(link);
    console.log(data);
    return{
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.image[0].url,
        stock: data.product.stock,
        quantity,
    };
})


const CartSlice = createSlice({
    name: 'cart',
    initialState:{
        cartItem: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem('cartItem')) : []
    },

    reducers:{
        removeFromCart :(state , action)=>{
           state.cartItem = state.cartItem.filter((item)=> item.product !== action.payload);
            localStorage.setItem('cartItem',JSON.stringify(state.cartItem));
        }
    },

    extraReducers: builder =>{
        builder
            
            .addCase(addTocart.fulfilled , (state , action , thunkApi)=>{
                
                const currItem = action.payload;
                
                const itemExist = state.cartItem.find(
                    (item) => item.product === currItem.product
                );
                if(itemExist){
                    // update the existing one
                    state.cartItem = state.cartItem.map(item => 
                        (item.product === itemExist.product ? currItem : item)
                    )
                }
                else{
                    state.cartItem.push(currItem);
                }
                localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
                // return state.cartItem;
            })
    }
})

export const {removeFromCart} = CartSlice.actions;
export default CartSlice.reducer; 