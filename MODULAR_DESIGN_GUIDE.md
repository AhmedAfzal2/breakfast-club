# Modular Design Guide for Menu Items

## Recommended Architecture

### 1. **Data Structure (MongoDB Schema)**
Keep the description as part of the item object:

```javascript
// MongoDB Document Structure
{
  _id: ObjectId,
  title: "pancake",
  price: 300,
  imageSrc: "/assets/images/menu-items/breakfast/hot-breakfast/pancake.png",
  description: "Delicious fluffy pancakes served with maple syrup and butter",
  category: "BREAKFAST",
  subcategory: "Hot Breakfast",
  // ... other fields
}
```

### 2. **Data Flow**

```
MongoDB → API Endpoint → menuService.js → MenuPage.jsx → MenuItemList → MenuItem → MenuItemModal → ModalDescription
```

### 3. **Where to Pass Description**

**Best Practice:** Pass description as part of the `item` object through all components.

**Current Structure:**
- `MenuPage.jsx` - Contains `subcategoryItems` array (add `description` here)
- `MenuItemList.jsx` - Receives items array, passes to MenuItem
- `MenuItem.jsx` - Receives item props, passes to modal on click
- `MenuItemModal.jsx` - Receives item object, passes `item.description` to ModalDescription
- `ModalDescription.jsx` - Receives `description` prop and displays it

### 4. **Implementation Steps**

#### Step 1: Update MenuPage.jsx to include descriptions
```javascript
const subcategoryItems = {
  "Hot Breakfast": [
    {
      id: 1,
      title: "pancake",
      price: 300,
      imageSrc: pancakeImage,
      description: "Delicious fluffy pancakes served with maple syrup" // Add here
    },
    // ...
  ]
};
```

#### Step 2: When fetching from MongoDB, ensure description is included
```javascript
// In menuService.js or API call
const items = await menuService.getMenuItemsBySubcategory("BREAKFAST", "Hot Breakfast");
// items will include description from MongoDB
```

#### Step 3: The description automatically flows through:
- MenuPage → MenuItemList → MenuItem → MenuItemModal → ModalDescription

### 5. **File Organization**

```
src/
├── services/
│   └── menuService.js          # API calls to MongoDB
├── pages/
│   └── MenuPage.jsx            # Main page, manages state
├── components/
│   └── menu/
│       ├── MenuItemList.jsx    # Maps items array
│       ├── MenuItem.jsx        # Individual item card
│       └── modal/
│           ├── MenuItemModal.jsx    # Modal container
│           ├── ModalHeader.jsx      # Header component
│           └── ModalDescription.jsx # Description component
```

### 6. **Benefits of This Approach**

✅ **Modular**: Each component has a single responsibility
✅ **Reusable**: ModalDescription can be used anywhere
✅ **Maintainable**: Easy to update description styling
✅ **Scalable**: Easy to add more fields (allergens, nutrition, etc.)
✅ **Type-safe**: Can add TypeScript interfaces later

### 7. **Example: Adding Description from MongoDB**

```javascript
// In MenuPage.jsx
useEffect(() => {
  const fetchItems = async () => {
    const items = await menuService.getMenuItemsBySubcategory(
      selectedCategory, 
      subcategory
    );
    // items already include description from MongoDB
    setSubcategoryItems(items);
  };
  
  if (selectedCategory && subcategory) {
    fetchItems();
  }
}, [selectedCategory, subcategory]);
```

### 8. **Optional: Create a Data Transformation Layer**

If MongoDB returns different field names, create a mapper:

```javascript
// src/utils/menuItemMapper.js
export const mapMenuItemFromDB = (dbItem) => {
  return {
    id: dbItem._id,
    title: dbItem.title,
    price: dbItem.price,
    imageSrc: dbItem.imageSrc,
    description: dbItem.description || "", // Handle missing descriptions
    // ... map other fields
  };
};
```

