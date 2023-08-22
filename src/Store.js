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

import { configureStore , applyMiddleware } from '@reduxjs/toolkit';
import productsReducer from './Slice/ProductSlice'

const Store = configureStore({
    reducer:{
        products : productsReducer
    }
});

export default Store