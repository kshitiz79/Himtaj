import React, { useState, useEffect } from "react";
import { useFetchDealQuery, useUpdateDealMutation } from "./../../../redux/features/deals/dealsApi";
import axios from "axios";
import { getBaseUrl } from "../../../utils/baseURL";

const Deals = () => {
  const { data: deal, isLoading, error } = useFetchDealQuery();
  const [updateDeal] = useUpdateDealMutation();
  
  const [dealData, setDealData] = useState({
    title: "",
    description: "",
    discount: 0,
    image: "",
    endDate: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Use the useEffect hook to update the dealData state when deal data is available
  useEffect(() => {
    if (deal && deal.endDate) {
      setDealData({
        title: deal.title,
        description: deal.description,
        discount: deal.discount,
        image: deal.imageUrl,
        endDate: new Date(deal.endDate).toISOString().substring(0, 16), // Format the date
      });
    }
  }, [deal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDealData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onloadend = async () => {
      try {
        const response = await axios.post(`${getBaseUrl()}/api/uploadImage`, {
          image: reader.result, // Send base64-encoded image
        });
        setDealData((prev) => ({ ...prev, image: response.data })); // Save image URL
        alert("Image uploaded successfully");
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image");
      }
    };
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDeal(dealData).unwrap();
      alert("Deal updated successfully!");
    } catch (err) {
      console.error("Failed to update deal:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading deal: {error.message}</p>;

  return (
    <div className="deals-admin container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Deals</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={dealData.title}
            onChange={handleChange}
            className="input-field w-[29rem]"
            placeholder="Deal Title"
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={dealData.description}
            onChange={handleChange}
            className="input-field"
            placeholder="Deal Description"
          />
        </div> */}
        {/* <div>
          <label className="block text-sm font-medium">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={dealData.discount}
            onChange={handleChange}
            className="input-field"
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={dealData.endDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image</label>
          {dealData.image && (
            <img
              src={dealData.image}
              alt="Deal"
              className="w-32 h-32 object-cover mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="input-field"
          />
          {uploading && <p>Uploading image...</p>}
        </div>
        <button type="submit" className="btn" disabled={uploading}>
          {uploading ? "Updating..." : "Update Deal"}
        </button>
      </form>
    </div>
  );
};

export default Deals;
