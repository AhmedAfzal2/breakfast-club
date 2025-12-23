import React from "react";
import "./Loading.css";

function Loading({ message = "Loading..." }) {
  return (
    <div className="loading-container">
      <video 
        src="/assets/HomePage/loading.mp4" 
        className="loading-video"
        autoPlay
        loop
        muted
        playsInline
      />
      <p className="loading-text">{message}</p>
    </div>
  );
}

export default Loading;

