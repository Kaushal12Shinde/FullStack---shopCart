// import { createStore , combineReducers , applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { productReducer } from './Reducers/productReducer';

// // createStore is depricated u can use reduxToolkit 
// const reducer = combineReducers({
//     products:productReducer,
// });

// let initialState = {};

// const middleware = [thunk];

// const Store = createStore( 
//         reducer , 
//         initialState , 
//         composeWithDevTools(applyMiddleware(...middleware))
//     );

// export default Store;

// applyMiddleware
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './Slice/ProductSlice';
import userReducer from './Slice/UserSlice';
import cartReducer from './Slice/CartSlice';

const Store = configureStore({
    reducer:{
        products : productsReducer,
        user : userReducer,
        cart : cartReducer,
    }
});

export default Store