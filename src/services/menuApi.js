const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const menuApi = {
  // Get all menu items
  getAllMenuItems: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu-items`);
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  },

  // Get menu items by category
  getMenuItemsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu-items/category/${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch menu items for category: ${category}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching menu items for category ${category}:`, error);
      throw error;
    }
  },

  // Get menu items by category and subcategory
  getMenuItemsBySubcategory: async (category, subcategory) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/menu-items/category/${category}/subcategory/${subcategory}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch menu items for ${category}/${subcategory}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching menu items for ${category}/${subcategory}:`, error);
      throw error;
    }
  },

  // Get a single menu item by ID
  getMenuItemById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu-items/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch menu item with id: ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching menu item ${id}:`, error);
      throw error;
    }
  },
};

