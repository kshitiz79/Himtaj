import { createSlice } from '@reduxjs/toolkit';

// Utility function to get the initial state from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) return { user: null };
    return { user: JSON.parse(serializedState) };
  } catch (err) {
    return { user: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      // Save user state to localStorage
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
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