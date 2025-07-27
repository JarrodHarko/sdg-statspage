import React, { useState } from "react";
import "./App.css";

function App() {
  const [backgroundImage, setBackgroundImage] = useState("/court-background.png");
  const [overlayImage, setOverlayImage] = useState(null);
  const [overlayText, setOverlayText] = useState("");


  const handleBannerClick = (person) => {
    setBackgroundImage("/court-background-nobanners.png");

    if (person === "marcus") {
      setOverlayImage("/marcustransparent.png");
      setOverlayText("Marcus 2025 MVP");
    }
    // Add more `if` statements here for other banners like alex, john, etc.
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="banner-container">
        <div className="banner" onClick={() => handleBannerClick("marcus")}></div>
        <div className="banner" onClick={() => handleBannerClick("alex")}></div>
        <div className="banner" onClick={() => handleBannerClick("john")}></div>
        <div className="banner" onClick={() => handleBannerClick("jake")}></div>
        <div className="banner" onClick={() => handleBannerClick("jarrod")}></div>
      </div>

      {overlayText && (
        <div className="overlay-text">
          {overlayText}
        </div>
      )}

      {overlayImage && (
        <div className="overlay-wrapper">
          <img src={overlayImage} alt="Overlay" className="overlay-image" />
        </div>
      )}
    </div>
  );
}

export default App;
