import React, { useState, useEffect } from "react";
import axios from "axios";

const DealsSection = () => {
  const BASE_URL = "http://localhost:4000"; 
  
  const [deal, setDeal] = useState({
    title: "",
    description: "",
    discount: 0,
    imageUrl: "",
    endDate: ""
  });
  const [countdown, setCountdown] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    fetchDeal();
  }, []);

  const fetchDeal = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/deal`);
      setDeal(response.data);
      startCountdown(response.data.endDate);
    } catch (error) {
      console.error("Error fetching deal:", error);
    }
  };

  const startCountdown = (endDate) => {
    clearInterval(intervalId);
    const targetDate = new Date(endDate);

    const id = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(id);
        setCountdown({});
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    setIntervalId(id);
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      await axios.put(`${BASE_URL}/api/deal`, deal);
      setIsEditing(false);
      startCountdown(deal.endDate);
    } catch (error) {
      console.error("Error updating deal:", error);
    }
  };

  const handleImageUpload = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/uploadImage`, {
          image: reader.result,
        });
        setDeal({ ...deal, imageUrl: response.data });
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
  };

  return (
<section className="deals__container">
  {/* Image Section */}
  <div className="deals__image">
    {deal.imageUrl ? (
      <img src={deal.imageUrl} alt="Deal Banner" />
    ) : (
      <p>No image available</p>
    )}
  </div>

  {/* Content Section */}
  <div className="deals__content">
    {/* Left-aligned text */}
    <div className="deals__text">
      <h4> {deal.title}</h4>
   
    </div>

    {/* Right-aligned countdown */}
    <div className="deals__countdown">
      <div className="deals__countdown__card">
        <h4>{countdown.days || "0"}</h4>
        <p>Days</p>
      </div>
      <div className="deals__countdown__card">
        <h4>{countdown.hours || "0"}</h4>
        <p>Hours</p>
      </div>
      <div className="deals__countdown__card">
        <h4>{countdown.minutes || "0"}</h4>
        <p>Minutes</p>
      </div>
      <div className="deals__countdown__card">
        <h4>{countdown.seconds || "0"}</h4>
        <p>Seconds</p>
      </div>
    </div>
  </div>
</section>


  
  );
  
};

export default DealsSection;
