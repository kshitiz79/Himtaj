// routes/cart.js
const express = require('express');
const Cart = require('./cart.model');
const router = express.Router();

// Add item to cart
router.post('/add', async (req, res) => {
  console.log("Received request body:", req.body); // Log for debugging

  try {
    const { productId, name, price, quantity, userId } = req.body;

    // Validate each field to ensure it's present and correctly formatted
    if (!productId || !name || !price || !quantity || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure price and quantity are numbers
    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);

    if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
      return res.status(400).json({ message: "Price and quantity must be numbers" });
    }

    // Handle the addition of the item to the cart (example logic)
    let cartItem = await Cart.findOne({ productId, userId });

    if (cartItem) { 
      // If the item exists, update quantity
      cartItem.quantity += parsedQuantity;
    } else {
      // Otherwise, create a new cart item
      cartItem = new Cart({
        productId,
        name,
        price: parsedPrice,
        quantity: parsedQuantity,
        userId
      });
    }

    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Update quantity
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body; // Use "type" to specify increment or decrement

    const cartItem = await Cart.findById(id);
    if (!cartItem) return res.status(404).json({ message: 'Item not found' });

    // Increment or decrement based on type
    if (type === 'increment') {
      cartItem.quantity += 1;
    } else if (type === 'decrement') {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
    } else {
      return res.status(400).json({ message: 'Invalid update type' });
    }

    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear cart
router.delete('/clear/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.deleteMany({ userId });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all cart items for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
