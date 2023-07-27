import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar,{DropdownMenu} from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/LoginPage';
import AboutUs from './components/pages/AboutUs';
import News from './components/pages/News';
import { ReactComponent as LoginIcon } from './sailor-hat.svg'; // Replace './assets/login_icon.svg' with the actual path to your SVG file


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
          <RouterLink to="/about-us">About Us</RouterLink>
          <RouterLink to="/login">
  <LoginIcon style={{width: "30px", height: "30px"}} />
</RouterLink>
 </Navbar>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/news" element={ <News /> } />
          <Route path="/about-us" element={ <AboutUs /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
