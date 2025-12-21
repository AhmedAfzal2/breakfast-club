import React, { useState, useEffect } from "react";
import { ChevronLeft, X } from "lucide-react";
import Game from "../../../components/reservation/game/Game";
import Button from "../../../components/Button";
import ConfirmationPopup from "../../../components/ConfirmationPopup";
import tables from "../../../components/reservation/game/tables";
import "./SelectTablePopup.css";

function SelectTablePopup({ 
  isOpen, 
  onClose, 
  selectedDate, 
  selectedTime, 
  reservedTables = [],
  selectedTables = [],
  onTableSelect,
  onTableDeselect,
  onContinue
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [gameEnable, setGameEnable] = useState(false);
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false);
  const [showTableValidationPopup, setShowTableValidationPopup] = useState(false);

  // Calculate max guests based on selected tables
  const calculateMaxGuests = () => {
    if (selectedTables.length === 0) return 0;
    return selectedTables.reduce((total, table) => total + table.capacity, 0);
  };

  // Get table counts by capacity
  const getTableCounts = () => {
    const counts = {};
    selectedTables.forEach((table) => {
      counts[table.capacity] = (counts[table.capacity] || 0) + 1;
    });
    return counts;
  };

  const maxGuests = calculateMaxGuests();

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // Enable game when popup opens and date/time are selected
      if (selectedDate && selectedTime) {
        setGameEnable(true);
      }
    }
  }, [isOpen, selectedDate, selectedTime]);

  const handleBackClick = () => {
    setIsClosing(true);
    setGameEnable(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsClosing(false);
      if (onClose) {
        onClose();
      }
    }, 500); // Match animation duration
  };

  const isDateAndTimeSelected = () => {
    return selectedDate && selectedTime;
  };

  const handleContinueClick = () => {
    // Validate that at least one table is selected
    if (selectedTables.length === 0) {
      setShowTableValidationPopup(true);
      return;
    }
    
    // If tables are selected, call the onContinue handler
    // This will open the contact info popup
    if (onContinue) {
      onContinue();
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`mobile-select-table-popup ${isClosing ? 'slide-down' : ''}`}>
      <div className="mobile-popup-header">
        <button className="mobile-popup-back-button" onClick={handleBackClick}>
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="mobile-popup-content">
        <label className="heading section-label mobile-popup-heading">select table</label>
        <div className={`mobile-table-game-container ${!isDateAndTimeSelected() ? "disabled" : ""}`}>
          {!isDateAndTimeSelected() && (
            <div className="mobile-table-game-overlay">
              <span className="mobile-overlay-message">
                Please select date and time
              </span>
            </div>
          )}
          <Game
            onSelect={onTableSelect}
            onUnselect={onTableDeselect}
            enabled={gameEnable}
            reservedTables={reservedTables}
          />
        </div>

        {/* How to Play Section */}
        <div className="mobile-how-to-play-section">
          <h3 className="heading section-label mobile-how-to-play-heading">
            how to play
            <span
              className="mobile-help-icon"
              onClick={() => setIsHelpPopupOpen(!isHelpPopupOpen)}
            >
              ?
              {/* Desktop inline popup - only show when open */}
              {isHelpPopupOpen && (
                <div className="mobile-help-popup">
                  <div className="mobile-help-popup-content">
                    <h4 className="mobile-help-popup-title">Game Instructions</h4>
                    <ul className="mobile-help-popup-list">
                      <li>
                        <strong>WASD</strong> - Move character
                      </li>
                      <li>
                        <strong>E</strong> - Reserve table (when at table)
                      </li>
                      <li>
                        <strong>F</strong> - Unreserve table (when at table)
                      </li>
                      <li>
                        Selected tables will appear in reservation details
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </span>
          </h3>
          <div className="mobile-slot-line" />
        </div>

        {/* Help Popup Overlay - Mobile Only */}
        {isHelpPopupOpen && (
          <div className="mobile-help-popup-overlay" onClick={() => setIsHelpPopupOpen(false)}>
            <div className="mobile-help-popup-container" onClick={(e) => e.stopPropagation()}>
              <button 
                className="mobile-help-popup-close"
                onClick={() => setIsHelpPopupOpen(false)}
              >
                <X size={24} />
              </button>
              <div className="mobile-help-popup-content">
                <h4 className="mobile-help-popup-title">Game Instructions</h4>
                <ul className="mobile-help-popup-list">
                  <li>
                    <strong>WASD</strong> - Move character
                  </li>
                  <li>
                    <strong>E</strong> - Reserve table (when at table)
                  </li>
                  <li>
                    <strong>F</strong> - Unreserve table (when at table)
                  </li>
                  <li>
                    Selected tables will appear in reservation details
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Reservation Details Section */}
        <div className="mobile-reservation-details-section">
          <h3 className="heading section-label mobile-reservation-details-heading">
            reservation details
          </h3>
          <div className="mobile-slot-line" />
          <div className="mobile-reservation-info">
            {selectedTables.length > 0 ? (
              <>
                <div className="mobile-table-numbers">
                  <span className="mobile-reservation-label">Selected Tables: </span>
                  <span className="mobile-table-ids">
                    {selectedTables.map((table, index) => (
                      <React.Fragment key={table.id}>
                        <span>Table {table.id} ({table.capacity}-seater)</span>
                        {index < selectedTables.length - 1 && (
                          <span className="mobile-bullet">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
                <div className="mobile-table-summary">
                  <span className="mobile-reservation-label">Total Guests: </span>
                  <span>{maxGuests}</span>
                </div>
                <div className="mobile-table-breakdown">
                  {(() => {
                    const counts = getTableCounts();
                    const breakdown = [];
                    if (counts[2]) {
                      breakdown.push(`${counts[2]} x 2-seater${counts[2] > 1 ? 's' : ''}`);
                    }
                    if (counts[4]) {
                      breakdown.push(`${counts[4]} x 4-seater${counts[4] > 1 ? 's' : ''}`);
                    }
                    return breakdown.length > 0 ? breakdown.join(' • ') : '';
                  })()}
                </div>
              </>
            ) : (
              <span>No tables selected</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Continue Button Section - Fixed at bottom */}
      <div className="mobile-popup-button-section">
        <Button text="continue" onClick={handleContinueClick} />
      </div>
      
      <ConfirmationPopup
        isOpen={showTableValidationPopup}
        onClose={() => setShowTableValidationPopup(false)}
        type="error-table"
      />
    </div>
  );
}

export default SelectTablePopup;

