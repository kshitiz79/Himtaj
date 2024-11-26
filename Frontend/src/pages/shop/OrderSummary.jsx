import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Coupon from "./Coupon";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);

  // Access user and cart data from Redux
  const { user } = useSelector((state) => state.auth);
  const { products = [], taxRate = 0.1 } = useSelector((store) => store.cart);

  const [paymentMethod, setPaymentMethod] = useState(null);

  // UPI Payment Details
  const upiId = "8127520552@ptsbi";
  const upiName = "Your Name";

  const selectedItems = products.reduce((acc, product) => acc + product.quantity, 0);

  // Calculate totals
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discountAmount = (totalPrice * discount) / 100;
  const tax = (totalPrice - discountAmount) * taxRate;
  const grandTotal = totalPrice - discountAmount + tax;

  const handleApplyDiscount = (discountPercentage) => {
    setDiscount(discountPercentage);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      products: products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
      })),
      amount: grandTotal.toFixed(2),
      email: user?.email || "guest@example.com",
      paymentMethod: paymentMethod,
    };

    try {
      const response = await fetch(`http://localhost:4000/api/orders/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(clearCart());
        navigate("/success");
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
        <p className="text-dark mt-2">Selected Items: {selectedItems}</p>
        <p className="text-dark mt-2">Total Price: ₹{totalPrice.toFixed(2)}</p>
        <p>Discount: ₹{discountAmount.toFixed(2)} ({discount}%)</p>
        <p className="text-dark mt-2">Tax ({(taxRate * 100).toFixed(0)}%): ₹{tax.toFixed(2)}</p>
        <h3 className="font-semibold text-dark mt-4">Grand Total: ₹{grandTotal.toFixed(2)}</h3>
      </div>

      <div className="px-4 pb-6">
        {/* Clear Cart Button */}
        <button
          onClick={handleClearCart}
          className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
        >
          <span className="mr-2">Clear Cart</span>
          <i className="ri-delete-bin-7-line"></i>
        </button>

        {/* Coupon Component */}
        <Coupon onApplyDiscount={handleApplyDiscount} />

        {/* Payment Method Selection */}
        <h2 className="mt-8">Select Payment Method</h2>
        <button
          onClick={() => setPaymentMethod("COD")}
          className="bg-blue-500 px-3 py-1.5 text-white mt-2 rounded-md mr-2"
        >
          Cash on Delivery (COD)
        </button>
        <button
          onClick={() => setPaymentMethod("UPI")}
          className="bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md"
        >
          UPI Payment
        </button>

        {/* UPI Payment Section */}
        {paymentMethod === "UPI" && (
          <div>
            <h3 className="text-xl font-bold mt-4">Scan QR Code to Pay</h3>
            <QRCode
              value={`upi://pay?pa=${encodeURIComponent(
                upiId
              )}&pn=${encodeURIComponent(
                upiName
              )}&am=${grandTotal.toFixed(2)}&cu=INR&tn=${encodeURIComponent(
                "Order Payment"
              )}`}
              size={200}
            />
            <p className="mt-2">UPI ID: {upiId}</p>
            <p>Total Amount: ₹{grandTotal.toFixed(2)}</p>
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 px-3 py-1.5 text-white mt-4 rounded-md"
            >
              I Have Paid
            </button>
          </div>
        )}

        {/* COD Payment Section */}
        {paymentMethod === "COD" && (
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 px-3 py-1.5 text-white mt-4 rounded-md"
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
