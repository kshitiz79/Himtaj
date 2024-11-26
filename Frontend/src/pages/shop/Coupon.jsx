import React, { useState } from "react";
import { useValidateCouponMutation } from "./../../redux/features/coupon/couponApi";

const Coupon = ({ onApplyDiscount }) => {
  const [couponCode, setCouponCode] = useState("");
  const [validateCoupon] = useValidateCouponMutation();
  const [message, setMessage] = useState("");

  const handleApplyCoupon = async () => {
    try {
      const response = await validateCoupon(couponCode).unwrap();
      onApplyDiscount(response.discountPercentage);
      setMessage(`Coupon applied! ${response.discountPercentage}% discount.`);
    } catch (err) {
      setMessage("Invalid or expired coupon code.");
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Apply Coupon</h3>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="border rounded px-3 py-2 w-full mt-2"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          Apply
        </button>
      </div>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default Coupon;

