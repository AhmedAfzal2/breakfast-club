import { API_BASE_URL } from "./apiConfig";

export const contactApi = {
  submitContactForm: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  },
};
