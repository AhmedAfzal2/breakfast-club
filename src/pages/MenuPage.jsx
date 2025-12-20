import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import MenuCategories from "../components/menu/MenuCategories";
import MenuSubcategory from "../components/menu/MenuSubcategory";
import MenuBanner from "../components/menu/MenuBanner";
import MenuItemList from "../components/menu/MenuItemList";
import MenuItemModal from "../components/menu/modal/MenuItemModal";
import CartIcon from "../components/menu/CartIcon";
import Cart from "../components/cart/Cart";
import { menuApi } from "../services/menuApi";
import "../App.css";
import "./MenuPage.css";
import breakfastBanner from "/assets/images/banner-images/breakfast.png";
import dessertBanner from "/assets/images/banner-images/dessert.png";
import beveragesBanner from "/assets/images/banner-images/beverages.png";

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

  // Menu items will be fetched from API
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const items = await menuApi.getAllMenuItems();
        // Convert MongoDB _id to id for compatibility
        const itemsWithId = items.map((item) => ({
          ...item,
          id: item._id || item.id,
        }));
        setMenuItems(itemsWithId);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching menu items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const getSubcategoryItems = (subcategory) => {
    return menuItems.filter((item) => item.subcategory === subcategory);
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

          {loading && (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <p>Loading menu items...</p>
            </div>
          )}

          {error && (
            <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
              <p>Error loading menu items: {error}</p>
              <p>Make sure your server is running on http://localhost:3001</p>
            </div>
          )}

          {!loading && !error && allCategories.map((category) => (
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
