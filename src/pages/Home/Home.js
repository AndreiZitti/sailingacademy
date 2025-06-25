import React, { useState, useEffect } from "react";
import { IconButton, Fade, useScrollTrigger } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HeroSection from "./HeroSection";
import HomeCards from "./sections/HomeCards";
import Footer from "../../components/Footer";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import "../../App.css";
import "./HeroSection.css";

function Home() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 15000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const trigger = useScrollTrigger({
    threshold: 50,
    disableHysteresis: true,
  });

  return (
    <div className="site-background">
      <LanguageSwitcher />
      <HeroSection />
      <HomeCards />

      <Fade in={showArrow && !trigger}>
        <IconButton
          className={`custom-icon-btn ${
            showArrow && !trigger ? "bouncing" : ""
          }`}
          style={{
            position: "fixed",
            left: "50%",
            zIndex: 20,
          }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            setShowArrow(false);
          }}
        >
          <ArrowDropDownIcon style={{ fontSize: "150px", color: "white" }} />
        </IconButton>
      </Fade>

      <Footer />
    </div>
  );
}

export default Home;
