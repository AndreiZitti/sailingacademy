import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import RegistrationWrapper from "./pages/Registration/RegistrationWrapper";
import Rent from "./pages/Rent/Rent";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // path to your i18n.js

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="App">
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/registration" element={<RegistrationWrapper />} />
            <Route path="/rent" element={<Rent />} />
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;
