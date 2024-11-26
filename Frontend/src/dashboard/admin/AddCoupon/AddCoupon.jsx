import React, { useState } from "react";
import axios from "axios";

const AddCoupon = () => {
  const [couponData, setCouponData] = useState({
    code: "",
    discountPercentage: "",
    expiryDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // Track form validation errors

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!couponData.code.trim()) newErrors.code = "Coupon code is required.";
    if (!couponData.discountPercentage || couponData.discountPercentage <= 0)
      newErrors.discountPercentage = "Discount must be greater than 0.";
    if (!couponData.expiryDate) newErrors.expiryDate = "Expiry date is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const response = await axios.post("http://localhost:4000/api/coupon/add", couponData); // Ensure URL matches backend
      setMessage(response.data.message || "Coupon added successfully!");
      setCouponData({ code: "", discountPercentage: "", expiryDate: "" });
    } catch (err) {
      console.error("Failed to add coupon:", err);
      setMessage(err.response?.data?.message || "Failed to create coupon.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="add-coupon-admin container mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Coupon</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Coupon Code */}
        <div>
          <label className="block text-sm font-medium">Coupon Code</label>
          <input
            type="text"
            name="code"
            value={couponData.code}
            onChange={handleChange}
            className={`input-field w-[29rem] ${
              errors.code ? "border-red-500" : ""
            }`}
            placeholder="Enter Coupon Code"
          />
          {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
        </div>

        {/* Discount Percentage */}
        <div>
          <label className="block text-sm font-medium">Discount (%)</label>
          <input
            type="number"
            name="discountPercentage"
            value={couponData.discountPercentage}
            onChange={handleChange}
            className={`input-field w-[29rem] ${
              errors.discountPercentage ? "border-red-500" : ""
            }`}
            placeholder="Enter Discount Percentage"
          />
          {errors.discountPercentage && (
            <p className="text-red-500 text-sm">{errors.discountPercentage}</p>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium">Expiry Date</label>
          <input
            type="datetime-local"
            name="expiryDate"
            value={couponData.expiryDate}
            onChange={handleChange}
            className={`input-field w-[29rem] ${
              errors.expiryDate ? "border-red-500" : ""
            }`}
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm">{errors.expiryDate}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading || Object.keys(errors).length > 0}
        >
          {loading ? "Adding..." : "Add Coupon"}
        </button>
      </form>

      {/* Success/Error Message */}
      {message && (
        <p className={`mt-4 ${message.includes("Failed") ? "text-red-500" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddCoupon;
