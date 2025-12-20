import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import MenuCategories from "../components/menu/MenuCategories";
import MenuSubcategory from "../components/menu/MenuSubcategory";
import MenuBanner from "../components/menu/MenuBanner";
import MenuItemList from "../components/menu/MenuItemList";
import MenuItemModal from "../components/menu/modal/MenuItemModal";
import CartIcon from "../components/menu/CartIcon";
import Cart from "../components/cart/Cart";
import "../App.css";
import "./MenuPage.css";
import breakfastBanner from "/assets/images/banner-images/breakfast.png";
import dessertBanner from "/assets/images/banner-images/dessert.png";
import beveragesBanner from "/assets/images/banner-images/beverages.png";
import pancakeImage from "/assets/images/menu-items/breakfast/hot-breakfast/pancake.png";
import crepesImage from "/assets/images/menu-items/breakfast/hot-breakfast/crepes.png";
import frenchToastImage from "/assets/images/menu-items/breakfast/hot-breakfast/frenchtoast.png";
import waffleImage from "/assets/images/menu-items/breakfast/hot-breakfast/waffle.png";
import cinnamonRollsImage from "/assets/images/menu-items/dessert/cinnamon_rolls.png";
// Hot drinks
import blackTeaImage from "/assets/images/menu-items/drinks/Hot/black_tea.png";
import hotChocolateImage from "/assets/images/menu-items/drinks/Hot/hot_chocolate.png";
import lemonTeaImage from "/assets/images/menu-items/drinks/Hot/lemon_tea.png";
import pinkTeaImage from "/assets/images/menu-items/drinks/Hot/pink_tea.png";
// Cold drinks
import blueberryMargaritaImage from "/assets/images/menu-items/drinks/Cold/blueberry_margarita.png";
import chocolateMilkshakeImage from "/assets/images/menu-items/drinks/Cold/chocolate_milkshake.png";
import icedLatteImage from "/assets/images/menu-items/drinks/Cold/iced_latte.png";
import mintMargaritaImage from "/assets/images/menu-items/drinks/Cold/mint_margarita.png";
import orangeMargaritaImage from "/assets/images/menu-items/drinks/Cold/orange_margarita.png";
import sharbatImage from "/assets/images/menu-items/drinks/Cold/sharbat.png";
import strawberryLemonadeImage from "/assets/images/menu-items/drinks/Cold/strawberry_lemonade.png";
import strawberryMargaritaImage from "/assets/images/menu-items/drinks/Cold/strawberry_margarita.png";
import strawberryMilkshakeImage from "/assets/images/menu-items/drinks/Cold/strawberry_milkshake.png";

function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("BREAKFAST");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartBgRef = useRef();
  const categoryRefs = {
    BREAKFAST: useRef(null),
    DESSERTS: useRef(null),
    BEVERAGES: useRef(null),
  };
  const isScrollingRef = useRef(false);

  // prevent scrolling when cart open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Intersection Observer to detect which category is in view
  useEffect(() => {
    const observers = [];
    let timeoutId;

    // Small delay to ensure refs are attached
    timeoutId = setTimeout(() => {
      const categories = ["BREAKFAST", "DESSERTS", "BEVERAGES"];

      categories.forEach((category) => {
        const ref = categoryRefs[category];
        if (!ref?.current) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !isScrollingRef.current) {
                const rect = entry.boundingClientRect;
                // Check if the section is in the upper portion of the viewport
                if (rect.top <= window.innerHeight * 0.4 && rect.top >= -100) {
                  setSelectedCategory(category);
                }
              }
            });
          },
          {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
            rootMargin: "-10% 0px -60% 0px",
          }
        );

        observer.observe(ref.current);
        observers.push({ observer, element: ref.current });
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observers.forEach(({ observer, element }) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleCategorySelect = (category) => {
    isScrollingRef.current = true;
    setSelectedCategory(category);
    
    // Scroll to the selected category section
    if (categoryRefs[category]?.current) {
      categoryRefs[category].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      // Reset scrolling flag after scroll completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  const onClear = () => {
    setCartItems([]);
  };

  const onDelete = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) onDelete(id);
    else
      setCartItems((items) =>
        items.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
  };

  const onBack = () => {
    closeCart();
  };

  const openCart = () => {
    setIsCartOpen(true);
    cartBgRef.current.classList.remove("hidden");
  };

  const closeCart = () => {
    setIsCartOpen(false);
    cartBgRef.current.classList.add("hidden");
  };

  const handleAddToBasket = (item) => {
    setCartItems((items) => [
      ...items,
      {
        id: item.id,
        name: item.name,
        price: item.price,
        src: item.src,
        quantity: 1,
      },
    ]);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // All categories in order
  const allCategories = ["BREAKFAST", "DESSERTS", "BEVERAGES"];

  // Subcategories for each category
  const subcategories = {
    BREAKFAST: ["Hot Breakfast", "Healthy", "Light Breakfast"],
    DESSERTS: ["Sweet Treats"],
    BEVERAGES: ["Hot", "Cold"],
  };

  // Banner images for categories
  const categoryBanners = {
    BREAKFAST: breakfastBanner,
    DESSERTS: dessertBanner,
    BEVERAGES: beveragesBanner,
  };

  // Menu items for each subcategory
  const subcategoryItems = {
    "Hot Breakfast": [
      {
        id: 1,
        name: "pancake",
        price: 300,
        src: pancakeImage,
        description:
          "Fluffy, golden pancakes served with maple syrup and a pat of butter. Made fresh daily with our secret recipe that's been perfected over the years. A classic breakfast favorite that never disappoints.",
        toppings: [
          "Maple Syrup",
          "Butter",
          "Fresh Berries",
          "Whipped Cream",
          "Chocolate Chips",
          "Banana Slices",
        ],
      },
      {
        id: 2,
        name: "crepes",
        price: 300,
        src: crepesImage,
        description:
          "Delicate, paper-thin crepes filled with your choice of sweet or savory fillings. Light and airy, these French-style crepes are made to order and served warm. Perfect for a sophisticated breakfast experience.",
        toppings: [
          "Nutella",
          "Strawberries",
          "Powdered Sugar",
          "Lemon & Sugar",
          "Ham & Cheese",
          "Spinach & Feta",
        ],
      },
      {
        id: 3,
        name: "french toast",
        price: 300,
        src: frenchToastImage,
        description:
          "Thick slices of brioche bread soaked in a rich custard mixture, then pan-fried to golden perfection. Served with powdered sugar, fresh berries, and a drizzle of maple syrup. A decadent morning treat.",
        toppings: [
          "Maple Syrup",
          "Powdered Sugar",
          "Fresh Berries",
          "Cinnamon",
          "Vanilla Ice Cream",
          "Bacon Strips",
        ],
      },
      {
        id: 4,
        name: "waffle",
        price: 300,
        src: waffleImage,
        description:
          "Crispy on the outside, soft on the inside - our Belgian-style waffles are made fresh to order. Served with whipped cream, fresh fruit, and your choice of syrup. A breakfast classic that's always a crowd pleaser.",
        toppings: [
          "Whipped Cream",
          "Fresh Fruit",
          "Maple Syrup",
          "Chocolate Sauce",
          "Ice Cream",
          "Nuts",
        ],
      },
    ],
    "Sweet Treats": [
      {
        id: 5,
        name: "cinnamon rolls",
        price: 250,
        src: cinnamonRollsImage,
        description:
          "Warm, gooey cinnamon rolls fresh from the oven, drizzled with creamy vanilla glaze. Made with our signature dough that's soft, fluffy, and perfectly spiced with cinnamon. A sweet indulgence that pairs perfectly with your morning coffee.",
        toppings: [
          "Vanilla Glaze",
          "Cream Cheese Frosting",
          "Raisins",
          "Walnuts",
          "Extra Cinnamon",
          "Caramel Drizzle",
        ],
      },
    ],
    "Hot": [
      {
        id: 6,
        name: "black tea",
        price: 150,
        src: blackTeaImage,
        description:
          "Classic black tea brewed to perfection. A comforting and energizing beverage that pairs well with any meal. Served hot with your choice of milk and sugar.",
        toppings: [
          "Milk",
          "Sugar",
          "Honey",
          "Lemon",
          "Ginger",
          "Cardamom",
        ],
      },
      {
        id: 7,
        name: "hot chocolate",
        price: 200,
        src: hotChocolateImage,
        description:
          "Rich and creamy hot chocolate made with premium cocoa. Topped with whipped cream and chocolate shavings. A decadent warm beverage perfect for chilly mornings.",
        toppings: [
          "Whipped Cream",
          "Chocolate Shavings",
          "Marshmallows",
          "Cinnamon",
          "Caramel",
          "Vanilla",
        ],
      },
      {
        id: 8,
        name: "lemon tea",
        price: 150,
        src: lemonTeaImage,
        description:
          "Refreshing lemon tea with a zesty twist. A perfect blend of tea and fresh lemon that's both soothing and invigorating. Great for starting your day or as an afternoon pick-me-up.",
        toppings: [
          "Honey",
          "Mint",
          "Ginger",
          "Sugar",
          "Lemon Slice",
          "Ice",
        ],
      },
      {
        id: 9,
        name: "pink tea",
        price: 180,
        src: pinkTeaImage,
        description:
          "Traditional pink tea, also known as Kashmiri chai. A beautiful pink-hued tea with a unique flavor profile. Served with nuts and a touch of sweetness.",
        toppings: [
          "Almonds",
          "Pistachios",
          "Sugar",
          "Cardamom",
          "Saffron",
          "Cream",
        ],
      },
    ],
    "Cold": [
      {
        id: 10,
        name: "blueberry margarita",
        price: 250,
        src: blueberryMargaritaImage,
        description:
          "Refreshing blueberry margarita with a perfect balance of sweet and tart. Made with fresh blueberries and served ice-cold. A delightful non-alcoholic beverage.",
        toppings: [
          "Blueberries",
          "Lime",
          "Ice",
          "Sugar Rim",
          "Mint",
          "Lemon Slice",
        ],
      },
      {
        id: 11,
        name: "chocolate milkshake",
        price: 220,
        src: chocolateMilkshakeImage,
        description:
          "Creamy and rich chocolate milkshake made with premium chocolate and fresh milk. Topped with whipped cream and chocolate drizzle. A classic favorite that never disappoints.",
        toppings: [
          "Whipped Cream",
          "Chocolate Sauce",
          "Chocolate Chips",
          "Cherry",
          "Caramel",
          "Vanilla Ice Cream",
        ],
      },
      {
        id: 12,
        name: "iced latte",
        price: 200,
        src: icedLatteImage,
        description:
          "Smooth and refreshing iced latte made with premium espresso and cold milk. Perfectly balanced and served over ice. A cool pick-me-up for any time of day.",
        toppings: [
          "Vanilla Syrup",
          "Caramel Drizzle",
          "Whipped Cream",
          "Cinnamon",
          "Ice",
          "Chocolate Powder",
        ],
      },
      {
        id: 13,
        name: "mint margarita",
        price: 250,
        src: mintMargaritaImage,
        description:
          "Cool and refreshing mint margarita with a burst of fresh mint flavor. Perfectly balanced with lime and a hint of sweetness. A revitalizing beverage.",
        toppings: [
          "Fresh Mint",
          "Lime",
          "Ice",
          "Sugar",
          "Lemon Slice",
          "Cucumber",
        ],
      },
      {
        id: 14,
        name: "orange margarita",
        price: 250,
        src: orangeMargaritaImage,
        description:
          "Zesty orange margarita with fresh orange juice and a tangy twist. Bright, citrusy, and incredibly refreshing. Perfect for a sunny day.",
        toppings: [
          "Orange Slice",
          "Lime",
          "Ice",
          "Sugar Rim",
          "Mint",
          "Lemon",
        ],
      },
      {
        id: 15,
        name: "sharbat",
        price: 180,
        src: sharbatImage,
        description:
          "Traditional sharbat, a sweet and refreshing drink made with natural fruit flavors. Cool, hydrating, and perfect for quenching your thirst.",
        toppings: [
          "Ice",
          "Mint",
          "Lemon",
          "Rose Water",
          "Sugar",
          "Basil Seeds",
        ],
      },
      {
        id: 16,
        name: "strawberry lemonade",
        price: 200,
        src: strawberryLemonadeImage,
        description:
          "Fresh strawberry lemonade made with real strawberries and freshly squeezed lemons. Sweet, tangy, and incredibly refreshing. A perfect summer drink.",
        toppings: [
          "Strawberries",
          "Lemon Slice",
          "Ice",
          "Mint",
          "Sugar",
          "Lime",
        ],
      },
      {
        id: 17,
        name: "strawberry margarita",
        price: 250,
        src: strawberryMargaritaImage,
        description:
          "Sweet and fruity strawberry margarita with fresh strawberries. A delightful blend of sweet and tart flavors. Served ice-cold for maximum refreshment.",
        toppings: [
          "Strawberries",
          "Lime",
          "Ice",
          "Sugar Rim",
          "Mint",
          "Lemon Slice",
        ],
      },
      {
        id: 18,
        name: "strawberry milkshake",
        price: 220,
        src: strawberryMilkshakeImage,
        description:
          "Creamy strawberry milkshake made with fresh strawberries and premium ice cream. Topped with whipped cream and fresh strawberry slices. A classic favorite.",
        toppings: [
          "Whipped Cream",
          "Strawberry Slices",
          "Chocolate Sauce",
          "Cherry",
          "Vanilla Ice Cream",
          "Strawberry Syrup",
        ],
      },
    ],
  };

  const getSubcategoryItems = (subcategory) => {
    return subcategoryItems[subcategory] || [];
  };

  const getItemQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "BREAKFAST":
        return "var(--jasmine)";
      case "DESSERTS":
        return "var(--china-rose)";
      case "BEVERAGES":
        return "var(--cool-gray)";
      default:
        return "var(--jasmine)";
    }
  };

  return (
    <>
      <Layout>
        <div className="menu-page">
          <h1 className="page-heading">MENU</h1>

          <CartIcon
            className="cart-icon"
            numberOfItems={cartItems.length}
            onClick={openCart}
          />

          <MenuCategories
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />

          {allCategories.map((category) => (
            <div
              key={category}
              ref={categoryRefs[category]}
              className="category-section"
            >
              {categoryBanners[category] && (
                <MenuBanner
                  imageSrc={categoryBanners[category]}
                  alt={`${category} banner`}
                />
              )}

              {subcategories[category] &&
                subcategories[category].map((subcategory, index) => (
                  <React.Fragment key={index}>
                    <MenuSubcategory text={subcategory} />
                    {getSubcategoryItems(subcategory).length > 0 && (
                      <MenuItemList
                        items={getSubcategoryItems(subcategory)}
                        getItemQuantity={getItemQuantity}
                        onAddToBasket={handleAddToBasket}
                        onItemClick={handleItemClick}
                        updateQuantity={updateQuantity}
                        cardColor={getCategoryColor(category)}
                      />
                    )}
                  </React.Fragment>
                ))}
            </div>
          ))}

          <MenuItemModal
            item={selectedItem}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddToBasket={handleAddToBasket}
          />
        </div>
      </Layout>
      <Cart
        items={cartItems}
        onDelete={onDelete}
        onBack={onBack}
        updateQuantity={updateQuantity}
        getItemQuantity={getItemQuantity}
        onClear={onClear}
        isOpen={isCartOpen}
      />
      <div ref={cartBgRef} className="cart-bg hidden" onClick={closeCart}></div>
    </>
  );
}

export default MenuPage;
