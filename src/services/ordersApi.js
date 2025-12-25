import { API_BASE_URL } from "./apiConfig";

export const ordersApi = {
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  getAllOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  deleteOrder: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },
};
