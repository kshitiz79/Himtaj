import React, { useState, useEffect } from "react";
import axios from "axios";

const DealsSection = () => {
  const BASE_URL = "http://localhost:4000";

  const [deal, setDeal] = useState({
    title: "",
    description: "",
    discount: 0,
    imageUrl: "",
    endDate: "",
  });
  const [countdown, setCountdown] = useState({});
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

  return (
    <section className="max-w-[1600px] mx-auto px-4 py-8 md:px-8 md:py-16">
      {/* Image Section */}
      <div className="w-full h-auto  ">
        {deal.imageUrl ? (
          <img
            src={deal.imageUrl}
            alt="Deal Banner"
            className="w-full h-auto  mx-auto  shadow-md object-cover"
          />
        ) : (
          <p className="text-center text-gray-500">No image available</p>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-teal-600 bg-opacity-60 text-white p-6 md:p-10  shadow-lg">
        {/* Text Section */}
        <div className="text-center md:text-left flex flex-col md:w-1/2">
          <h4 className="text-2xl md:text-4xl font-bold mb-4">{deal.title}</h4>
          <p className="text-sm md:text-base">{deal.description}</p>
        </div>

        {/* Countdown Section */}
        <div className="grid grid-cols-4 gap-4 mt-6 md:mt-0 md:w-auto">
          <div className="flex flex-col items-center justify-center bg-white text-teal-700 p-4 md:p-6 rounded-lg shadow-md">
            <h4 className="text-lg md:text-2xl font-bold">{countdown.days || "0"}</h4>
            <p className="text-xs md:text-sm">Days</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white text-teal-700 p-4 md:p-6 rounded-lg shadow-md">
            <h4 className="text-lg md:text-2xl font-bold">{countdown.hours || "0"}</h4>
            <p className="text-xs md:text-sm">Hours</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white text-teal-700 p-4 md:p-6 rounded-lg shadow-md">
            <h4 className="text-lg md:text-2xl font-bold">{countdown.minutes || "0"}</h4>
            <p className="text-xs md:text-sm">Minutes</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white text-teal-700 p-4 md:p-6 rounded-lg shadow-md">
            <h4 className="text-lg md:text-2xl font-bold">{countdown.seconds || "0"}</h4>
            <p className="text-xs md:text-sm">Seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
