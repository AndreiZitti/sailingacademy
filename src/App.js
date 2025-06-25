import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import RegistrationWrapper from "./pages/Registration/RegistrationWrapper";
import TestView from "./pages/Registration/TestView";
import Rent from "./pages/Rent/Rent";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // path to your i18n.js

function App() {
  useEffect(() => {
    // Add Google Fonts to document head
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "true";
    document.head.appendChild(preconnect2);

    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="App">
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/registration" element={<RegistrationWrapper />} />
            <Route path="/registration-test" element={<TestView />} />
            <Route path="/rent" element={<Rent />} />
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;
