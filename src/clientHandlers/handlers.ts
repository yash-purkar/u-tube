import axios from "axios";

// Fetces filters
export const getFilters = async () => {
  try {
    const response = await axios.get("http://localhost:3001/filters");
    return response;
  } catch (error) {
    throw new Error("Failed to get filters.");
  }
};
