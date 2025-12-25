import { API_BASE_URL } from "./apiConfig";

export const reservationsApi = {
  getReservedTables: async (date, time) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/reservations/reserved-tables?date=${encodeURIComponent(
          date.toISOString()
        )}&time=${encodeURIComponent(time.toISOString())}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reserved tables");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching reserved tables:", error);
      throw error;
    }
  },

  createReservation: async (reservationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });
      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  },

  getAllReservations: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`);
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw error;
    }
  },

  updateReservationStatus: async (id, status) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/reservations/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update reservation status");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating reservation status:", error);
      throw error;
    }
  },

  deleteReservation: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error;
    }
  },
};
