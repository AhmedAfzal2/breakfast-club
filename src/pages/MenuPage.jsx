import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import MenuCategories from "../components/menu/MenuCategories";
import MenuSubcategory from "../components/menu/MenuSubcategory";
import MenuBanner from "../components/menu/MenuBanner";
import MenuItemList from "../components/menu/MenuItemList";
import "../App.css";
import "./MenuPage.css";
import hotBreakfastBanner from "/assets/images/banner-images/hotbreakfast.png";
import healthyBanner from "/assets/images/banner-images/healthybreakfast.png";
import pancakeImage from "/assets/images/menu-items/breakfast/hot-breakfast/pancake.png";
import crepesImage from "/assets/images/menu-items/breakfast/hot-breakfast/crepes.png";
import frenchToastImage from "/assets/images/menu-items/breakfast/hot-breakfast/frenchtoast.png";
import waffleImage from "/assets/images/menu-items/breakfast/hot-breakfast/waffle.png";

function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToBasket = (item) => {
    console.log("Added to basket:", item);
    // Handle adding to basket logic here
  };

  // Subcategories for each category
  const subcategories = {
    "BREAKFAST": ["Hot Breakfast", "Healthy", "Light Breakfast"],
    "DESSERTS": [],
    "BEVERAGES": []
  };

  // Banner images for subcategories
  const subcategoryBanners = {
    "Hot Breakfast": hotBreakfastBanner,
    "Healthy": healthyBanner
  };

  // Menu items for each subcategory
  const subcategoryItems = {
    "Hot Breakfast": [
      {
        id: 1,
        title: "pancake",
        price: 300,
        imageSrc: pancakeImage
      },
      {
        id: 2,
        title: "crepes",
        price: 300,
        imageSrc: crepesImage
      },
      {
        id: 3,
        title: "french toast",
        price: 300,
        imageSrc: frenchToastImage
      },
      {
        id: 4,
        title: "waffle",
        price: 300,
        imageSrc: waffleImage
      }
    ]
  };

  const getSubcategories = () => {
    return subcategories[selectedCategory] || [];
  };

  const getSubcategoryItems = (subcategory) => {
    return subcategoryItems[subcategory] || [];
  };

  return (
    <Layout>
      <div className="menu-page">
        <h1 className="page-heading">MENU</h1>
        
        <MenuCategories onCategorySelect={handleCategorySelect} />
        
        {selectedCategory && getSubcategories().map((subcategory, index) => (
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
                onAddToBasket={handleAddToBasket}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
}

export default MenuPage;

