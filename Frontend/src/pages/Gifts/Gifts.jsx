import React from 'react';
import gift from "./../../assets/1.png"
const Gift = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex items-center gap-20 p-8 bg-white  max-w-5xl">
        <div className="flex flex-col items-start">
          <p className="text-2xl font-semibold text-primary mb-3">Let’s find the</p>
          <h1 className="text-7xl font-bold text-primary-dark mb-4">Perfect Gift</h1>
          <p className="text-gray-600 mb-8 mt-5">
            Let’s gift right and strengthen the bonds between you and your loved one
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition">
            Start finding gifts
          </button>
        </div>
        <div className="relative">
          <img
            src={gift}
            alt="Gift"
            className="w-96 h-96 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Gift;
