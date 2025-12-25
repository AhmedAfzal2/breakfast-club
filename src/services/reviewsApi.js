import { API_BASE_URL } from "./apiConfig";

export const reviewsApi = {
  getAllReviews: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  },

  getLimitedReviews: async (limit = 3) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/limit/${limit}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  },
};
