import React, { useState } from "react";
import "./App.css";

function App() {
  // Use the empty background on Home
  const [backgroundImage, setBackgroundImage] = useState("/EmptyBackground.png");
  const [overlayImage, setOverlayImage] = useState(null);
  const [overlayText, setOverlayText] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [bgFade, setBgFade] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [isRecords, setIsRecords] = useState(false);
  const [overlayIsBanner, setOverlayIsBanner] = useState(false); // NEW
  const [selectedPerson, setSelectedPerson] = useState(null); // NEW

  const records = [
    { event: "Beer Mile", first: "Marcus, 6:36 - Season 5", second: "Marcus, 7:02 - Season 4", third: "John, 7:10 - Season 5" },
    { event: "Fastest to get Dressed & Undressed", first: "Marcus, 0:33 - Season 3", second: "Marcus, 0:35 - Season 5", third: "Dinh, 0:39 - Season 5" },
    { event: "Bench 80% Bodyweight for Reps", first: "Alex, 25 at 160lbs - Season 5", second: "Oscar, 21 at 175lbs - Season 5", third: "Will, 20 at 225lbs - Season 5" },
    { event: "Perfect 10", first: "David, Jarrod, Marcus, 10 - Season 5", second: "Will, 9 - Season 5", third: "Dinh, Nick, 8 - Season 5" },
    { event: "Oreos from Forehead to Mouth in 30s", first: "Dinh, 9 - Season 5", second: "Marcus, 7 - Season 5", third: "Ben, 5 - Season 5" },
    { event: "Fastest 2 Handstand Beers", first: "Oscar, 0:25 - Season 4", second: "Jarrod, 0:41 - Season 4", third: "Alex, 1:00 - Season 4" }
  ];

  // Map each person to their overlay image and MVP text
  const mvpByPerson = {
    marcus: { img: "/marcus.png", text: "Marcus 'The Trash Man' 2025 MVP" },
    jake:   { img: "/jake.png",   text: "Jake 'Jonk' Upfield 2021 MVP" },
    jarrod: { img: "/jarrod.png", text: "Jarrod 'Naughty Auty' Harkin 2022 MVP" },
    john:   { img: "/john.png",   text: "John 'John' 2023 MVP" },
    alex:   { img: "/alex.png",   text: "Alex 'Foreskinless' 2024 MVP" },
  };

  // Use PNG banners (transparent background)
  const bannerByPerson = {
    jake:   "/JakeBanner.png",
    jarrod: "/JarrodBanner.png",
    john:   "/JohnBanner.png",
    alex:   "/AlexBanner.png",
    marcus: "/MarcusBanner.png",
  };
  const peopleOrder = ["jake", "jarrod", "john", "alex", "marcus"];

  const handleBannerClick = (person) => {
    setBgFade(true);
    setTimeout(() => {
      setBackgroundImage("/EmptyBackground.png"); // MVP pages keep Empty background
      setBgFade(false);

      // Keep only this person's banner in its home-slot
      setSelectedPerson(person);

      // Show MVP center overlay (image + text)
      const mvp = mvpByPerson[person];
      if (mvp) {
        setOverlayImage(mvp.img);
        setOverlayText(mvp.text);
        setFadeIn(true);
      } else {
        setOverlayImage(null);
        setOverlayText("");
        setFadeIn(false);
      }

      setOverlayIsBanner(false);
      setIsRecords(false);
      setIsHome(false);
    }, 300);
  };

  const handleRecordsClick = () => {
    setBgFade(true);
    setTimeout(() => {
      setBackgroundImage("/EmptyBackground.png"); // Hall of Fame uses Empty background
      setBgFade(false);
      setSelectedPerson(null);
      setOverlayImage(null);
      setOverlayText("");
      setFadeIn(false);
      setIsHome(false);
      setIsRecords(true);
    }, 300);
  };

  const handleHomeClick = () => {
    setBgFade(true);
    setTimeout(() => {
      setBackgroundImage("/EmptyBackground.png");
      setBgFade(false);

      setSelectedPerson(null);       // restore all banners
      setOverlayImage(null);
      setOverlayIsBanner(false);
      setOverlayText("");
      setFadeIn(false);

      setIsRecords(false);
      setIsHome(true);
    }, 300);
  };

  return (
    <div
      className={`app-container${bgFade ? " bg-fade" : ""}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {!isRecords && (
        <div className="banner-container">
          {peopleOrder.map((p) => (
            <img
              key={p}
              src={bannerByPerson[p]}
              alt={`${p} banner`}
              className={`banner-img ${!isHome && selectedPerson !== p ? "hidden" : ""}`}
              draggable="false"
              onClick={isHome ? () => handleBannerClick(p) : undefined}
            />
          ))}
        </div>
      )}

      {/* Hall of Fame button on Home (image button) */}
      {isHome && (
        <img
          src="/HOFBanner.png"
          alt="Hall of Fame"
          className="floating-btn hof-btn"
          onClick={handleRecordsClick}
          draggable="false"
        />
      )}

      {/* Home button on ALL non-home pages (image button) */}
      {!isHome && (
        <img
          src="/homeBanner.png"
          alt="Home"
          className="floating-btn home-btn"
          onClick={handleHomeClick}
          draggable="false"
        />
      )}

      {/* Suppress centered overlay on MVP pages */}
      {overlayImage && !isRecords && (
        <div className={`overlay ${fadeIn ? "fade-in" : ""}`}>
          <div className="mvp-frame">
            <img src={overlayImage} alt="MVP" className="overlay-image mvp-img" />
          </div>
          {overlayText && <div className="overlay-text mvp-text">{overlayText}</div>}
        </div>
      )}

      {/* Records Page */}
      {isRecords && (
        <div className="records-panel">
          <h2>Hall of Fame</h2>
          <ul className="records-list">
            {records.map((r) => (
              <li key={r.event} className="record-item">
                <div className="event">{r.event}</div>
                <div className="places">
                  <div>1st: {r.first}</div>
                  <div>2nd: {r.second}</div>
                  <div>3rd: {r.third}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;