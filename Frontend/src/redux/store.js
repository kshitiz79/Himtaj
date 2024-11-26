import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./features/cart/cartSlice";
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import productsApi from "./features/products/productsApi";
import reviewApi from "./features/reviews/reviewApi";
import statsApi from "./features/stats/statsApi";
import orderApi from "./features/order/orderApi";
import cartApi from "./features/cart/cartApi"; // Ensure it matches the exact file name
import couponApi from "./features/coupon/couponApi";
import dealsApi from "./features/deals/dealsApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer, 
    [dealsApi.reducerPath]: dealsApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      reviewApi.middleware, 
      statsApi.middleware,
      orderApi.middleware,
      cartApi.middleware ,
      dealsApi.middleware,
      couponApi.middleware // Add cartApi middleware
    ),
});


// The store.js file is responsible for configuring 
// the global Redux store in your application. It 
// combines multiple reducers, including cartReducer 
// for managing the cart's state and authReducer for handling 
// user authentication. It also integrates authApi from RTK Query, 
// which helps in managing asynchronous API calls related to authentication.
//  The configureStore function not only sets up the reducers but 
//  also applies middleware, including the default middleware and 
//  authApi.middleware, to handle API requests effectively. 
//  This store is then used throughout the application to provide access
//   to the global state, making it accessible in any component wrapped 
//   in the Provider component from react-redux. This structure ensures t
//   hat all components can access, update, and interact with the global state efficiently.