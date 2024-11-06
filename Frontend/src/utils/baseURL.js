export const getBaseUrl = () => {
  return process.env.NODE_ENV === "production" 
      ? "https://himtajjewelry.com" // Production URL
      : "http://localhost:4000";     // Development URL
};
