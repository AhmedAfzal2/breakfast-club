import React, { useRef } from "react";
import "./MobileController.css";

export default function MobileController({ controllerRef }) {
  const lastTouchTime = useRef(0);

  const handleTouchStart = (key) => (e) => {
    // e.preventDefault(); // Removed to avoid passive listener error
    lastTouchTime.current = Date.now();
    if (controllerRef.current) {
      controllerRef.current[key] = true;
    }
  };

  const handleTouchEnd = (key) => (e) => {
    // e.preventDefault(); // Removed to avoid passive listener error
    lastTouchTime.current = Date.now();
    if (controllerRef.current) {
      controllerRef.current[key] = false;
    }
  };

  // Also handle mouse events for testing on desktop
  const handleMouseDown = (key) => (e) => {
    if (Date.now() - lastTouchTime.current < 500) return; // Ignore emulated events
    e.preventDefault();
    if (controllerRef.current) {
      controllerRef.current[key] = true;
    }
  };

  const handleMouseUp = (key) => (e) => {
    if (Date.now() - lastTouchTime.current < 500) return; // Ignore emulated events
    e.preventDefault();
    if (controllerRef.current) {
      controllerRef.current[key] = false;
    }
  };

  const buttons = [
    { key: "w", label: "▲", className: "up" },
    { key: "a", label: "◀", className: "left" },
    { key: "s", label: "▼", className: "down" },
    { key: "d", label: "▶", className: "right" },
  ];

  return (
    <div
      className="mobile-controller"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="d-pad">
        {buttons.map((btn) => (
          <button
            key={btn.key}
            className={`d-pad-btn ${btn.className}`}
            onTouchStart={handleTouchStart(btn.key)}
            onTouchEnd={handleTouchEnd(btn.key)}
            onMouseDown={handleMouseDown(btn.key)}
            onMouseUp={handleMouseUp(btn.key)}
            onMouseLeave={handleMouseUp(btn.key)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
