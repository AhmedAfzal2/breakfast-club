// src/components/HomePage/DishesSection.jsx

import React, { useState, forwardRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DishesSection.css'; 
// --- ASSUMED IMPORTS ---
import OrderIcon from '/assets/HomePage/menu.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// -----------------------


// --- DUMMY DATA FOR FEATURED DISHES ---
const dummyDishes = [
    { id: 0, name: "Fluffy Buttermilk Pancakes", description: "Our classic stack with fresh berries and maple syrup.", image: "/assets/images/Food/pancake.png" },
    { id: 1, name: "Sweet Strawberrry Milkshake", description: "Creamy, sweet strawberry milkshake with whipped cream and cherry toppings", image: "/assets/images/Food/strawberry_milkshake.png" },
    { id: 2, name: "Waffles", description: "Hot waffles with authentic maple syrup topping", image: "/assets/images/Food/waffles.png" },
    { id: 3, name: "Hot Chocolate" , description: "Rich hot chocolate topped with whipped cream and marshmallows", image: "/assets/images/Food/hot_chocolate.png" },
    { id: 4, name: "Cinammon Rolls", description: "Freshly baked cinnamon rolls with icing drizzle", image: "/assets/images/Food/cinnamon_rolls.png" },
    { id: 5, name: "hen", description: "hen image", image: "/assets/images/hen.png" },
]
// ----------------------------------------

const DishCard = React.memo(({ dish, index, isHighlighted }) => { 
    return (
        <div className={`dish-card load-animation ${isHighlighted ? 'highlighted' : ''}`}>
            <div className="dish-image-wrapper">
                <img src={dish.image} alt={dish.name} className="dish-image" />
            </div>
            <div className="dish-info">
                <h3 className="dish-name">{dish.name}</h3>
                <p className="dish-description">{dish.description}</p>
            </div>
        </div>
    );
});


const DishesSection = forwardRef((props, ref) => {
    
    const [startIndex, setStartIndex] = useState(0); 
    const navigate = useNavigate();
    const dishCount = dummyDishes.length;
    const maxStartIndex = dishCount - 1; 
    const [isMobile, setIsMobile] = useState(false); 

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- NAVIGATION LOGIC ---
    const nextDishes = () => {
        if (startIndex < maxStartIndex) { 
            setStartIndex(prev => prev + 1);
        }
    };

    const prevDishes = () => {
        if (startIndex > 0) {
            setStartIndex(prev => prev - 1);
        }
    };
    function translateValuea(index) {
        return `calc(
            (-38%) * ${index} 
            - 30px
        )`;
    }
    let translateValue;
    if (isMobile) {
        translateValue = `calc(-100% * ${startIndex})`;
    } else if(startIndex===0)
        translateValue = "0px"
    else if (startIndex === 1)
        translateValue = "-30px";
    else if (startIndex === dummyDishes.length - 1)
        translateValue = `calc((-38%) * ${startIndex -2} - 60px)`;
    else
        translateValue = translateValuea(startIndex-1);
    
    // The highlighted card is always the one visually in the center position (startIndex + 1).
    const highlightedIndex = startIndex;
    // Get the currently highlighted dish content
    const currentHighlightedDish = dummyDishes[highlightedIndex];


    return (
        <section className="dishes-section" ref={ref}>

            <div className="dishes-content-left">
                <h2 className="section-title">TOP DISHES OF THE SEASON</h2>
                <p className="section-subtitle">
                    A curated selection of our customer favorites, highlighting our current top dishes. 
                    Scroll through to see <span style={{color: "var(--china-rose)"}}>what's cookin' good lookin'</span>
                </p>
                <div className="dishes-footer-cta">
                    <button className="btn-menu" onClick={() => navigate('/menu')}>
                        <img src={OrderIcon} alt="View Full Menu" />
                    </button>
                </div>
            </div>
            
            {/* --- RIGHT COLUMN: Carousel --- */}
            <div className="dishes-carousel-column">
                <div className="carousel-container">
                    {/* Dishes Carousel Track: Transform applied for sliding effect */}
                    <div 
                        className="dishes-carousel" 
                        style={{ transform: `translateX(${translateValue})` }}
                    >
                        {/* Use the original dummyDishes list */}
                        {dummyDishes.map((dish, index) => (
                            <DishCard 
                                key={dish.id} 
                                dish={dish} 
                                index={index} // Passed for potential debug/future use
                                // Highlight the item that is CURRENTLY at the center position
                                isHighlighted={index === highlightedIndex}
                            />
                        ))}
                    </div>
                </div>
                <div className="carousel-navigation">
                    {/* Left Arrow Button */}
                    <button 
                        className="carousel-nav-btn prev" 
                        onClick={prevDishes} 
                        disabled={startIndex === 0}
                    >
                        <ChevronLeft className="chevron" />
                    </button>
                    
                    {/* Right Arrow Button */}
                    <button 
                        className="carousel-nav-btn next" 
                        onClick={nextDishes} 
                        // Disable when moving further would expose white space on the right
                        disabled={startIndex >= maxStartIndex}
                    >
                        <ChevronRight className="chevron"/>
                    </button>
                </div>
            </div>
        </section>
    );
});

DishesSection.displayName = 'DishesSection'; 
export default DishesSection;