import React, { useState } from "react";
import "./OurTeam.css";
import TeamMemberPopup from "./TeamMemberPopup";

function OurTeam() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const teamMembers = [
    {
      name: "Ahmed Afzal",
      image: "/assets/images/team/ahmed.JPG",
    },
    {
      name: "Anoosheh Arshad",
      image: "/assets/images/team/anoosheh.JPG",
    },
    {
      name: "Ushba Fatima",
      image: "/assets/images/team/ushba.JPG",
    },
  ];

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => {
      setSelectedMember(null);
    }, 300);
  };

  return (
    <>
      <div className="our-team-section">
        <h2 className="section-heading">our team</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="team-member"
              onClick={() => handleMemberClick(member)}
            >
              <div className="team-member-image-container">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="team-member-image"
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='18' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3E%3C/missing%3E%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <p className="team-member-name">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
      <TeamMemberPopup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        member={selectedMember}
      />
    </>
  );
}

export default OurTeam;

