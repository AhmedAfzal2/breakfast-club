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
import hotBreakfastBanner from "/assets/images/banner-images/hotbreakfast.png";
import healthyBanner from "/assets/images/banner-images/healthybreakfast.png";
import pancakeImage from "/assets/images/menu-items/breakfast/hot-breakfast/pancake.png";
import crepesImage from "/assets/images/menu-items/breakfast/hot-breakfast/crepes.png";
import frenchToastImage from "/assets/images/menu-items/breakfast/hot-breakfast/frenchtoast.png";
import waffleImage from "/assets/images/menu-items/breakfast/hot-breakfast/waffle.png";

function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("BREAKFAST");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartBgRef = useRef();

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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

  // Subcategories for each category
  const subcategories = {
    BREAKFAST: ["Hot Breakfast", "Healthy", "Light Breakfast"],
    DESSERTS: [],
    BEVERAGES: [],
  };

  // Banner images for subcategories
  const subcategoryBanners = {
    "Hot Breakfast": hotBreakfastBanner,
    Healthy: healthyBanner,
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
  };

  const getSubcategories = () => {
    return subcategories[selectedCategory] || [];
  };

  const getSubcategoryItems = (subcategory) => {
    return subcategoryItems[subcategory] || [];
  };

  const getItemQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
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

          {selectedCategory &&
            getSubcategories().map((subcategory, index) => (
              <React.Fragment key={index}>
                <MenuSubcategory text={subcategory} />
                {subcategoryBanners[subcategory] && (
                  <MenuBanner
                    imageSrc={subcategoryBanners[subcategory]}
                    alt={`${subcategory} banner`}
                  />
                )}
                {getSubcategoryItems(subcategory).length > 0 && (
                  <MenuItemList
                    items={getSubcategoryItems(subcategory)}
                    getItemQuantity={getItemQuantity}
                    onAddToBasket={handleAddToBasket}
                    onItemClick={handleItemClick}
                    updateQuantity={updateQuantity}
                  />
                )}
              </React.Fragment>
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
