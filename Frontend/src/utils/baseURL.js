export const getBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? "http://localhost:4000"
    : "http://localhost:4000";
