import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar,{DropdownMenu} from './components/Navbar';
import Home from './pages/Home/Home';
import Login from './pages//Login/LoginPage';
import AboutUs from './pages/AboutUs/AboutUs';
import News from './pages/News/News';
import { ReactComponent as LoginIcon } from './Assets/sailor-hat.svg'; // Replace './assets/login_icon.svg' with the actual path to your SVG file
import ContactUs from './pages/ContactUs/ContactUs';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar>
        <div className="dropdown">
          <RouterLink to="/">Home</RouterLink>
          <DropdownMenu />
        </div>
          <RouterLink to="/news">News</RouterLink>
          <RouterLink to="/contact-us">Contact Us</RouterLink>
          <RouterLink to="/about-us">About Us</RouterLink>
          <RouterLink to="/login">
  <LoginIcon style={{width: "30px", height: "30px"}} />
</RouterLink>
 </Navbar>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/news" element={ <News /> } />
          <Route path="/contact-us" element={ <ContactUs /> } />
          <Route path="/about-us" element={ <AboutUs /> } />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
