import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : { products: [] };
  } catch (e) {
    return { products: [] };
  }
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.products.find((item) => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    
      // Save only plain data to localStorage, not the Proxy state
      const plainState = { products: state.products.map(item => ({ ...item })) };
      localStorage.setItem("cart", JSON.stringify(plainState));
    },
    

    removeFromCart(state, action) {
      state.products = state.products.filter((item) => item._id !== action.payload._id);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      state.products = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;



// Selectors

// // Selector to get all products
// const selectProducts = (state) => state.cart.products;

// // Selector to get total selected items
// export const selectSelectedItems = createSelector(
//     [selectProducts],
//     (products) => products.reduce((total, product) => total + product.quantity, 0)
// );

// // Selector to get total price
// export const selectTotalPrice = createSelector(
//     [selectProducts],
//     (products) => products.reduce((total, product) => total + product.quantity * product.price, 0)
// );

// // Selector to get tax
// export const selectTax = createSelector(
//     [selectTotalPrice, (state) => state.cart.taxRate],
//     (totalPrice, taxRate) => totalPrice * taxRate
// );

// // Selector to get grand total
// export const selectGrandTotal = createSelector(
//     [selectTotalPrice, selectTax],
//     (totalPrice, tax) => totalPrice + tax
// );