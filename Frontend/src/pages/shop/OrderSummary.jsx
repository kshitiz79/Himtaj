import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import to access logged-in user data
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Coupon from "./Coupon";
import {
  useFetchCartQuery,
  useClearCartMutation,
} from "../../redux/features/cart/cartApi";
import { getBaseUrl } from "../../../../Frontend/src/utils/baseURL";

const OrderSummary = ({ userId }) => { // Pass userId as a prop
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // Fetch logged-in user details
  const { user } = useSelector((state) => state.auth); // Replace 'auth' with your slice name
  const userEmail = user?.email; // Get the logged-in user's email

  // Fetch cart data using RTK Query
  const { data: products = [], isLoading, isError, refetch } = useFetchCartQuery(userId);

  // Mutation hooks
  const [clearCart] = useClearCartMutation();

  // UPI Payment Details
  const upiId = "6306643695@pthdfc"; // Replace with your UPI ID
  const upiName = "Kshitiz Maurya"; // Replace with your UPI Name

  // Calculate selected items
  const selectedItems = products.reduce((acc, product) => acc + product.quantity, 0);

  // Calculate totals
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discountAmount = (totalPrice * discount) / 100;
  const tax = (totalPrice - discountAmount) * 0.1; // Assuming taxRate is 10%
  const grandTotal = totalPrice - discountAmount + tax;

  // Apply Discount Handler
  const handleApplyDiscount = (discountPercentage) => {
    setDiscount(discountPercentage);
  };

  // Clear Cart Handler using RTK Query
  const handleClearCart = async () => {
    try {
      await clearCart(userId).unwrap();
    } catch (error) {
      console.error("Failed to clear cart:", error);
      alert("Failed to clear cart. Please try again.");
    }
  };

  // Place Order Handler
  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (!userEmail) {
      alert("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      products: products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
      })),
      amount: grandTotal.toFixed(2),
      email: userEmail, // Use the logged-in user's email
      paymentMethod,
    };

    try {
      const response = await fetch(`${getBaseUrl()}/api/orders/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (response.ok) {
        if (paymentMethod === "COD") {
          navigate("/thanks"); // Redirect to COD Success Page
        } else if (paymentMethod === "UPI") {
          navigate(`/payment-success?session_id=${data.order._id}`); // Redirect to Payment Success Page
        }
      } else {
        console.error("Error:", data.error);
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading cart data.</p>;

  return (
    <div className="bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
        <p className="text-dark mt-2">Selected Items: {selectedItems}</p>
        <p className="text-dark mt-2">Total Price: ₹{totalPrice.toFixed(2)}</p>
        <p>Discount: ₹{discountAmount.toFixed(2)} ({discount}%)</p>
        <p className="text-dark mt-2">Tax (10%): ₹{tax.toFixed(2)}</p>
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
          className={`bg-blue-500 px-3 py-1.5 text-white mt-2 rounded-md mr-2 ${
            paymentMethod === "COD" ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          Cash on Delivery (COD)
        </button>
        <button
          onClick={() => setPaymentMethod("UPI")}
          className={`bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md ${
            paymentMethod === "UPI" ? "opacity-75 cursor-not-allowed" : ""
          }`}
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
