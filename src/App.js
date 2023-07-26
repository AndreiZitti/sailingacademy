import React from 'react';
import { Link } from 'react-scroll';
import './App.css';
import Cards from './components/Cards';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <Navbar>
        <Link activeClass="active" to="Rent" spy={true} smooth={true} offset={-70} duration={500}
                      

        >Rent</Link>
        <Link activeClass="active" to="Courses" spy={true} smooth={true} offset={-70} duration={500}>Courses</Link>
        <Link activeClass="active" to="Membership" spy={true} smooth={true} offset={-70} duration={500}>Membership</Link>
        <Link activeClass="active" to="Contact" spy={true} smooth={true} offset={-70} duration={500}>Contact</Link>

      </Navbar>

      <Home />
    </div>
  );
}

export default App;
