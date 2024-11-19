import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState
      ? JSON.parse(serializedState)
      : {
          products: [],
          totalPrice: 0,
          tax: 0,
          taxRate: 0.1, // Example tax rate of 10%
          grandTotal: 0,
          selectedItems: 0,
        };
  } catch (e) {
    console.error("Error loading cart from localStorage:", e);
    return {
      products: [],
      totalPrice: 0,
      tax: 0,
      taxRate: 0.1,
      grandTotal: 0,
      selectedItems: 0,
    };
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    const plainState = {
      products: state.products.map((item) => ({ ...item })),
      totalPrice: state.totalPrice,
      tax: state.tax,
      grandTotal: state.grandTotal,
      selectedItems: state.selectedItems,
    };
    localStorage.setItem("cart", JSON.stringify(plainState));
  } catch (e) {
    console.error("Error saving cart to localStorage:", e);
  }
};

// Calculate totals
const calculateTotals = (state) => {
  state.totalPrice = state.products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  state.tax = state.totalPrice * state.taxRate;
  state.grandTotal = state.totalPrice + state.tax;
  state.selectedItems = state.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart(state, action) {
      const existingItem = state.products.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        // Increment quantity of existing item
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        // Add new item to cart
        state.products.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }

      calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    // Remove item from cart
    removeFromCart(state, action) {
      const existingItem = state.products.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Decrement quantity if more than 1
          existingItem.quantity -= 1;
        } else {
          // Remove item completely if quantity is 1
          state.products = state.products.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }

      calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    // Clear the entire cart
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
      state.selectedItems = 0;

      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
