import React, { useState, useEffect } from "react";
import axios from "axios";

const DealsSection = () => {
  const [deal, setDeal] = useState({
    title: "",
    description: "",
    discount: 0,
    imageUrl: "", // Image URL fetched from the backend
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
      const response = await axios.get("http://localhost:4000/api/deal");
      setDeal(response.data);
      startCountdown(response.data.endDate);
    } catch (error) {
      console.error("Error fetching deal:", error);
    }
  };

  const startCountdown = (endDate) => {
    clearInterval(intervalId); // Clear any existing interval to prevent multiple intervals
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
      await axios.put("http://localhost:4000/api/deal", deal);
      setIsEditing(false);
      startCountdown(deal.endDate); // Restart countdown with new date
    } catch (error) {
      console.error("Error updating deal:", error);
    }
  };

  const handleImageUpload = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/uploadImage", {
          image: reader.result,
        });
        setDeal({ ...deal, imageUrl: response.data }); // Save the new image URL
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
  };

  return (
    <section className="section__container deals__container">
      <div className="deal__image">
        {deal.imageUrl ? (
          <img src={deal.imageUrl} alt="Deal" />
        ) : (
          <p>No image available</p> // Display this if no image URL is available
        )}
      </div>
      <div className="deals__content">
        {isEditing ? (
          <>
            <input
              type="text"
              value={deal.title}
              onChange={(e) => setDeal({ ...deal, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              value={deal.description}
              onChange={(e) =>
                setDeal({ ...deal, description: e.target.value })
              }
              placeholder="Description"
            />
            <input
              type="number"
              value={deal.discount}
              onChange={(e) =>
                setDeal({ ...deal, discount: e.target.value })
              }
              placeholder="Discount"
            />
            <input
              type="datetime-local"
              value={new Date(deal.endDate).toISOString().substring(0, 16)}
              onChange={(e) =>
                setDeal({ ...deal, endDate: new Date(e.target.value) })
              }
            />
            <input
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />

          </>
        ) : (
          <>
            <h4> Get Up To {deal.discount}% Discount</h4>
            <h5>{deal.title}</h5>
            <p>{deal.description}</p>
            <div className="deals__countdown flex_wrap">
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

          </>
        )}
      </div>
    </section>
  );
};

export default DealsSection;
