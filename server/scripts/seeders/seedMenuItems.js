import MenuItem from '../../models/MenuItem.js';

const menuItemsData = [
  // Hot Breakfast
  {
    name: "pancake",
    price: 300,
    src: "/assets/images/menu-items/breakfast/hot-breakfast/pancake.png",
    description: "Fluffy, golden pancakes served with maple syrup and a pat of butter. Made fresh daily with our secret recipe that's been perfected over the years. A classic breakfast favorite that never disappoints.",
    addOns: ["Maple Syrup", "Butter", "Fresh Berries", "Whipped Cream", "Chocolate Chips", "Banana Slices"],
    category: "BREAKFAST",
    subcategory: "Hot Breakfast",
  },
  {
    name: "crepes",
    price: 300,
    src: "/assets/images/menu-items/breakfast/hot-breakfast/crepes.png",
    description: "Delicate, paper-thin crepes filled with your choice of sweet or savory fillings. Light and airy, these French-style crepes are made to order and served warm. Perfect for a sophisticated breakfast experience.",
    addOns: ["Nutella", "Strawberries", "Powdered Sugar", "Lemon & Sugar", "Ham & Cheese", "Spinach & Feta"],
    category: "BREAKFAST",
    subcategory: "Hot Breakfast",
  },
  {
    name: "french toast",
    price: 300,
    src: "/assets/images/menu-items/breakfast/hot-breakfast/frenchtoast.png",
    description: "Thick slices of brioche bread soaked in a rich custard mixture, then pan-fried to golden perfection. Served with powdered sugar, fresh berries, and a drizzle of maple syrup. A decadent morning treat.",
    addOns: ["Maple Syrup", "Powdered Sugar", "Fresh Berries", "Cinnamon", "Vanilla Ice Cream", "Bacon Strips"],
    category: "BREAKFAST",
    subcategory: "Hot Breakfast",
  },
  {
    name: "waffle",
    price: 300,
    src: "/assets/images/menu-items/breakfast/hot-breakfast/waffle.png",
    description: "Crispy on the outside, soft on the inside - our Belgian-style waffles are made fresh to order. Served with whipped cream, fresh fruit, and your choice of syrup. A breakfast classic that's always a crowd pleaser.",
    addOns: ["Whipped Cream", "Fresh Fruit", "Maple Syrup", "Chocolate Sauce", "Ice Cream", "Nuts"],
    category: "BREAKFAST",
    subcategory: "Hot Breakfast",
  },
  // Sweet Treats
  {
    name: "cinnamon rolls",
    price: 250,
    src: "/assets/images/menu-items/dessert/cinnamon_rolls.png",
    description: "Warm, gooey cinnamon rolls fresh from the oven, drizzled with creamy vanilla glaze. Made with our signature dough that's soft, fluffy, and perfectly spiced with cinnamon. A sweet indulgence that pairs perfectly with your morning coffee.",
    addOns: ["Vanilla Glaze", "Cream Cheese Frosting", "Raisins", "Walnuts", "Extra Cinnamon", "Caramel Drizzle"],
    category: "DESSERTS",
    subcategory: "Sweet Treats",
  },
  // Hot Drinks
  {
    name: "black tea",
    price: 150,
    src: "/assets/images/menu-items/drinks/Hot/black_tea.png",
    description: "Classic black tea brewed to perfection. A comforting and energizing beverage that pairs well with any meal. Served hot with your choice of milk and sugar.",
    addOns: ["Milk", "Sugar", "Honey", "Lemon", "Ginger", "Cardamom"],
    category: "BEVERAGES",
    subcategory: "Hot",
  },
  {
    name: "hot chocolate",
    price: 200,
    src: "/assets/images/menu-items/drinks/Hot/hot_chocolate.png",
    description: "Rich and creamy hot chocolate made with premium cocoa. Topped with whipped cream and chocolate shavings. A decadent warm beverage perfect for chilly mornings.",
    addOns: ["Whipped Cream", "Chocolate Shavings", "Marshmallows", "Cinnamon", "Caramel", "Vanilla"],
    category: "BEVERAGES",
    subcategory: "Hot",
  },
  {
    name: "lemon tea",
    price: 150,
    src: "/assets/images/menu-items/drinks/Hot/lemon_tea.png",
    description: "Refreshing lemon tea with a zesty twist. A perfect blend of tea and fresh lemon that's both soothing and invigorating. Great for starting your day or as an afternoon pick-me-up.",
    addOns: ["Honey", "Mint", "Ginger", "Sugar", "Lemon Slice", "Ice"],
    category: "BEVERAGES",
    subcategory: "Hot",
  },
  {
    name: "pink tea",
    price: 180,
    src: "/assets/images/menu-items/drinks/Hot/pink_tea.png",
    description: "Traditional pink tea, also known as Kashmiri chai. A beautiful pink-hued tea with a unique flavor profile. Served with nuts and a touch of sweetness.",
    addOns: ["Almonds", "Pistachios", "Sugar", "Cardamom", "Saffron", "Cream"],
    category: "BEVERAGES",
    subcategory: "Hot",
  },
  // Cold Drinks
  {
    name: "blueberry margarita",
    price: 250,
    src: "/assets/images/menu-items/drinks/Cold/blueberry_margarita.png",
    description: "Refreshing blueberry margarita with a perfect balance of sweet and tart. Made with fresh blueberries and served ice-cold. A delightful non-alcoholic beverage.",
    addOns: ["Blueberries", "Lime", "Ice", "Sugar Rim", "Mint", "Lemon Slice"],
    category: "BEVERAGES",
    subcategory: "Cold",
  },
  {
    name: "chocolate milkshake",
    price: 220,
    src: "/assets/images/menu-items/drinks/Cold/chocolate_milkshake.png",
    description: "Creamy and rich chocolate milkshake made with premium chocolate and fresh milk. Topped with whipped cream and chocolate drizzle. A classic favorite that never disappoints.",
    addOns: ["Whipped Cream", "Chocolate Sauce", "Chocolate Chips", "Cherry", "Caramel", "Vanilla Ice Cream"],
    category: "BEVERAGES",
    subcategory: "Cold",
  },
  {
    name: "iced latte",
    price: 200,
    src: "/assets/images/menu-items/drinks/Cold/iced_latte.png",
    description: "Smooth and refreshing iced latte made with premium espresso and cold milk. Perfectly balanced and served over ice. A cool pick-me-up for any time of day.",
    addOns: ["Vanilla Syrup", "Caramel Drizzle", "Whipped Cream", "Cinnamon", "Ice", "Chocolate Powder"],
    category: "BEVERAGES",
    subcategory: "Cold",
  },
  {
    name: "mint margarita",
    price: 250,
    src: "/assets/images/menu-items/drinks/Cold/mint_margarita.png",
    description: "Cool and refreshing mint margarita with a burst of fresh mint flavor. Perfectly balanced with lime and a hint of sweetness. A revitalizing beverage.",
    addOns: ["Fresh Mint", "Lime", "Ice", "Sugar", "Lemon Slice", "Cucumber"],
    category: "BEVERAGES",
    subcategory: "Cold",
  },
  {
    name: "orange margarita",
    price: 250,
    src: "/assets/images/menu-items/drinks/Cold/orange_margarita.png",
    description: "Zesty orange margarita with fresh orange juice and a tangy twist. Bright, citrusy, and incredibly refreshing. Perfect for a sunny day.",
    addOns: ["Orange Slice", "Lime", "Ice", "Sugar Rim", "Mint", "Lemon"],
    category: "BEVERAGES",
    subcategory: "Cold",
  },
  {
    name: "sharbat",
    price: 180,
    src: "/assets/images/menu-items/drinks/Cold/sharbat.png",
    description: "Traditional sharbat, a sweet and refreshing drink made with natural fruit flavors. Cool, hydrating, and perfect for quenching your thirst.",
    addOns: ["Ice", "Mint", "Lemon", "Rose Water", "Sugar", "Basil Seeds"],
    category: "BEVERAGES",
    subcategory: "Cold",
  },
  {
    name: "strawberry lemonade",
    price: 200,
    src: "/assets/images/menu-items/drinks/Cold/strawberry_lemonade.png",
    description: "Fresh strawberry lemonade made with real strawberries and freshly squeezed lemons. Sweet, tangy, and incredibly refreshing. A perfect summer drink.",
    addOns: ["Strawberries", "Lemon Slice", "Ice", "Mint", "Sugar", "Lime"],
    category: "BEVERAGES",
    subcategory: "Cold",
  },
  {
    name: "strawberry margarita",
    price: 250,
    src: "/assets/images/menu-items/drinks/Cold/strawberry_margarita.png",
    description: "Sweet and fruity strawberry margarita with fresh strawberries. A delightful blend of sweet and tart flavors. Served ice-cold for maximum refreshment.",
    addOns: ["Strawberries", "Lime", "Ice", "Sugar Rim", "Mint", "Lemon Slice"],
    category: "BEVERAGES",
    subcategory: "Cold",
  },
  {
    name: "strawberry milkshake",
    price: 220,
    src: "/assets/images/menu-items/drinks/Cold/strawberry_milkshake.png",
    description: "Creamy strawberry milkshake made with fresh strawberries and premium ice cream. Topped with whipped cream and fresh strawberry slices. A classic favorite.",
    addOns: ["Whipped Cream", "Strawberry Slices", "Chocolate Sauce", "Cherry", "Vanilla Ice Cream", "Strawberry Syrup"],
    category: "BEVERAGES",
    subcategory: "Cold",
  },
];

export const seedMenuItems = async () => {
  try {
    console.log('\n=== Seeding Menu Items ===');
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');
    
    const insertedItems = await MenuItem.insertMany(menuItemsData);
    console.log(`✅ Successfully seeded ${insertedItems.length} menu items`);
    
    return { success: true, count: insertedItems.length };
  } catch (error) {
    console.error('❌ Error seeding menu items:', error.message);
    return { success: false, error: error.message };
  }
};


