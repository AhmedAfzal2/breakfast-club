import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import MenuCategories from "../components/menu/MenuCategories";
import MenuSubcategory from "../components/menu/MenuSubcategory";
import MenuBanner from "../components/menu/MenuBanner";
import MenuItemList from "../components/menu/MenuItemList";
import MenuItemModal from "../components/menu/modal/MenuItemModal";
import CartIcon from "../components/menu/CartIcon";
import Cart from "../components/cart/Cart";
import { useCart } from "../components/menu/CartContext";
import { menuApi } from "../services/menuApi";
import "../App.css";
import "./MenuPage.css";
import breakfastBanner from "/assets/images/banner-images/breakfast.png";
import dessertBanner from "/assets/images/banner-images/dessert.png";
import beveragesBanner from "/assets/images/banner-images/beverages.jpg";

function MenuPage() {
  const ctx = useCart();
  const [selectedCategory, setSelectedCategory] = useState("BREAKFAST");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartBgRef = useRef();
  const categoryRefs = {
    BREAKFAST: useRef(null),
    DESSERTS: useRef(null),
    BEVERAGES: useRef(null),
  };
  const isScrollingRef = useRef(false);

  // Menu items will be fetched from API
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // prevent scrolling when cart open
  useEffect(() => {
    if (isCartOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [isCartOpen]);

  // Intersection Observer to detect which category is in view
  useEffect(() => {
    // Only set up observer after menu items are loaded
    if (loading || error) return;

    const observers = [];
    let timeoutId;
    let scrollTimeoutId;

    // Function to find the most visible category
    const findMostVisibleCategory = () => {
      if (isScrollingRef.current) return;

      const categories = ["BREAKFAST", "DESSERTS", "BEVERAGES"];
      let maxVisibility = 0;
      let mostVisibleCategory = null;

      categories.forEach((category) => {
        const ref = categoryRefs[category];
        if (!ref?.current) return;

        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibility =
          visibleHeight / Math.min(viewportHeight, rect.height);

        // Check if banner is in viewport (top portion)
        if (
          rect.top <= viewportHeight * 0.5 &&
          rect.bottom >= 0 &&
          visibility > maxVisibility
        ) {
          maxVisibility = visibility;
          mostVisibleCategory = category;
        }
      });

      if (mostVisibleCategory) {
        setSelectedCategory(mostVisibleCategory);
      }
    };

    // Scroll event listener as fallback
    const handleScroll = () => {
      if (scrollTimeoutId) clearTimeout(scrollTimeoutId);
      scrollTimeoutId = setTimeout(findMostVisibleCategory, 100);
    };

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
                if (rect.top <= window.innerHeight * 0.5 && rect.top >= -200) {
                  setSelectedCategory(category);
                }
              }
            });
          },
          {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
            rootMargin: "-10% 0px -50% 0px",
          }
        );

        observer.observe(ref.current);
        observers.push({ observer, element: ref.current });
      });

      // Add scroll listener as fallback
      window.addEventListener("scroll", handleScroll, { passive: true });
      // Initial check
      findMostVisibleCategory();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(scrollTimeoutId);
      window.removeEventListener("scroll", handleScroll);
      observers.forEach(({ observer, element }) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [loading, error, menuItems]);

  const onPlace = () => {
    console.log("place", ctx.cartItems);
    //USHAB DO
    // u can access cart items by doing ctx.cartItems
    // also it should navigate to home page

    // leev this
    ctx.onClear();
    closeCart();
  };

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

  const openCart = () => {
    setIsCartOpen(true);
    cartBgRef.current.classList.remove("hidden");
  };

  const closeCart = () => {
    setIsCartOpen(false);
    cartBgRef.current.classList.add("hidden");
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
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Measure header and menu categories height and set CSS variables
  useEffect(() => {
    const updateHeights = () => {
      const header = document.querySelector(".header");
      const menuCategories = document.querySelector(".menu-categories");

      if (header) {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty(
          "--header-height",
          `${headerHeight}px`
        );
      }

      if (menuCategories) {
        const categoriesHeight = menuCategories.offsetHeight;
        document.documentElement.style.setProperty(
          "--menu-categories-height",
          `${categoriesHeight}px`
        );
      }
    };

    // Initial measurement
    updateHeights();

    // Update on resize
    window.addEventListener("resize", updateHeights);

    // Also update after a short delay to ensure elements are rendered
    const timeoutId = setTimeout(updateHeights, 100);

    return () => {
      window.removeEventListener("resize", updateHeights);
      clearTimeout(timeoutId);
    };
  }, []);

  const getSubcategoryItems = (subcategory) => {
    return menuItems.filter((item) => item.subcategory === subcategory);
  };

  return (
    <>
      <Layout>
        <div className="menu-page">
          <h1 className="page-heading">MENU</h1>

          <MenuCategories
            onCategorySelect={handleCategorySelect}
            onClick={openCart}
            selectedCategory={selectedCategory}
          />

          {/* <CartIcon className="cart-icon" onClick={openCart} /> */}

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

          {!loading &&
            !error &&
            allCategories.map((category) => (
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
                          onItemClick={handleItemClick}
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
          />
        </div>
      </Layout>
      <Cart isOpen={isCartOpen} onBack={closeCart} onPlace={onPlace} />
      <div ref={cartBgRef} className="cart-bg hidden" onClick={closeCart}></div>
    </>
  );
}

export default MenuPage;
