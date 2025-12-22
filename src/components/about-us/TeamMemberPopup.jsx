import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "./TeamMemberPopup.css";

function TeamMemberPopup({ isOpen, onClose, member }) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen && member) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (!isOpen && shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, member, shouldRender]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!shouldRender || !member) return null;

  const teamMemberData = {
    "Ahmed Afzal": {
      description: "only making this website for the chickens. (he will try to put rain and green plants somehow)",
      email: "aafzal.bese23seecs@seecs.edu.pk"
    },
    "Anoosheh Arshad": {
      description: "senior front end developer, react is on ventilator since she launched.",
      email: "aarshad.bese23seecs@seecs.edu.pk"
    },
    "Ushba Fatima": {
      description: "only here for the food. (she eats 5 calories daily)",
      email: "ufatima.bese23seecs@seecs.edu.pk"
    }
  };

  const memberInfo = teamMemberData[member.name] || {
    description: "Team member at Breakfast Club.",
    email: "team@breakfastclub.com"
  };

  return (
    <div className={`team-member-popup-overlay ${isClosing ? 'fade-out' : ''}`} onClick={handleClose}>
      <div className={`team-member-popup ${isClosing ? 'slide-down' : 'slide-up'}`} onClick={(e) => e.stopPropagation()}>
        <div className="team-member-popup-header">
          <div className="team-member-popup-top-section">
            <div className="team-member-popup-image-container">
              <img 
                src={member.image} 
                alt={member.name}
                className="team-member-popup-image"
              />
            </div>
            <h3 className="team-member-popup-name">meet {member.name.toLowerCase()}</h3>
          </div>
          <button className="team-member-popup-close" onClick={handleClose}>
            <X size={24} color="var(--gamboge)" />
          </button>
        </div>
        
        <div className="team-member-popup-content">
          <div className="team-member-popup-line"></div>
          <p className="team-member-popup-description">{memberInfo.description}</p>
        </div>
        
        <a href={`mailto:${memberInfo.email}`} className="team-member-popup-email">
          email: {memberInfo.email}
        </a>
      </div>
    </div>
  );
}

export default TeamMemberPopup;

