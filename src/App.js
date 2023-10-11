import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/LoginPage';
import AboutUs from './pages/AboutUs/AboutUs';
import News from './pages/News/News';
import ContactUs from './pages/ContactUs/ContactUs';
import Placeholder from './pages/Placeholder/Placeholder';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // path to your i18n.js



function App() {
    return (
        <I18nextProvider i18n={i18n}>
        <Router>
            <div className="App">
                <NavbarComponent />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/events" element={<Placeholder />} />
                    <Route path="/test" element={<News />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/about-us" element={<AboutUs />} />
                </Routes>
            </div>

            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet"/>
        </Router>
        </I18nextProvider>
    );
}

export default App;
