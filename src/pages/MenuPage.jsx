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
  const bannerRefs = {
    BREAKFAST: useRef(null),
    DESSERTS: useRef(null),
    BEVERAGES: useRef(null),
  };
  const isScrollingRef = useRef(false);
  const lastScrollY = useRef(0);

  // Menu items will be fetched from API
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Measure header and menu categories height and set CSS variables
  useEffect(() => {
    const updateHeights = () => {
      const header = document.querySelector('.header');
      const menuCategories = document.querySelector('.menu-categories');
      
      if (header) {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      }
      
      if (menuCategories) {
        const categoriesHeight = menuCategories.offsetHeight;
        document.documentElement.style.setProperty('--menu-categories-height', `${categoriesHeight}px`);
      }
    };

    // Initial measurement with multiple attempts to ensure elements are rendered
    updateHeights();
    
    // Update on resize
    window.addEventListener('resize', updateHeights);
    
    // Also update after delays to ensure elements are fully rendered
    const timeoutId1 = setTimeout(updateHeights, 100);
    const timeoutId2 = setTimeout(updateHeights, 300);
    const timeoutId3 = setTimeout(updateHeights, 500);

    return () => {
      window.removeEventListener('resize', updateHeights);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, [loading]);

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

  // Intersection Observer to detect which category banner is in view
  useEffect(() => {
    // Don't set up observer until menu items are loaded
    if (loading) return;

    let scrollTimeout;
    let scrollHandler = null;

    // Function to determine which category banner is in view
    const updateActiveCategory = () => {
      if (isScrollingRef.current) return;

      const currentScrollY = window.scrollY || window.pageYOffset;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      const categories = ["BREAKFAST", "DESSERTS", "BEVERAGES"];
      const viewportHeight = window.innerHeight;
      
      let activeCategory = null;
      let closestDistance = Infinity;

      // Check each banner to see if it's in the viewport
      categories.forEach((category) => {
        const bannerRef = bannerRefs[category];
        if (!bannerRef?.current) return;

        const rect = bannerRef.current.getBoundingClientRect();
        
        if (isScrollingDown) {
          // When scrolling down: banner is active when its top enters the viewport
          if (rect.top >= 0 && rect.top <= viewportHeight * 0.3 && rect.bottom > 0) {
            const distance = rect.top;
            if (distance < closestDistance) {
              closestDistance = distance;
              activeCategory = category;
            }
          }
        } else {
          // When scrolling up: banner is active when we're past it or it's in the upper viewport
          if (rect.top <= viewportHeight * 0.3 && rect.bottom > 0) {
            const distance = Math.abs(rect.top - viewportHeight * 0.2);
            if (distance < closestDistance) {
              closestDistance = distance;
              activeCategory = category;
            }
          }
        }
      });

      // Update category if found
      if (activeCategory) {
        setSelectedCategory((prevCategory) => {
          return activeCategory !== prevCategory ? activeCategory : prevCategory;
        });
      }
    };

    // Small delay to ensure refs are attached
    const timeoutId = setTimeout(() => {
      // Listen to scroll events
      scrollHandler = () => {
        if (!isScrollingRef.current) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            updateActiveCategory();
          }, 50);
        }
      };

      window.addEventListener('scroll', scrollHandler, { passive: true });
      
      // Initial check
      updateActiveCategory();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(scrollTimeout);
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [loading, menuItems]);

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

          <MenuCategories
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />

          <CartIcon
            className="cart-icon"
            numberOfItems={cartItems.length}
            onClick={openCart}
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
                  ref={bannerRefs[category]}
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
