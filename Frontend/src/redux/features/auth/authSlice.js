import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "./../cart/cartApi";


// Utility function to load user data from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("user");
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (e) {
    return null;
  }
};

const initialState = { user: loadUserFromLocalStorage() };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("cart"); // Clear cart on logout
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.fetchCart.matchFulfilled, (state, { payload }) => {
      localStorage.setItem("cart", JSON.stringify({ products: payload })); // Sync cart on login
    });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;



// This code sets up an authentication management system in Redux,
//  where user data is stored in the global state and also persisted in
//   localStorage. The utility function loadUserFromLocalStorage retrieves
//    the user's authentication state from localStorage when the app 
//    initializes, allowing the app to retain the user session even 
//    after a page reload. The authSlice includes two main actions: setUser
//     for logging in the user, which updates both the Redux state and
//      localStorage, and logout, which clears both the Redux state and 
//      localStorage. This setup ensures that the user's session persists
//       across page reloads or browser closures, improving the user experience
//        by keeping them logged in unless they explicitly log out.