import React from 'react';
import './Navbar.css'; // Import your styles
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
 
const cursorStyle = {
    cursor: `url(${process.env.PUBLIC_URL}/images/Cursor3.png), auto`
  };
function Navbar({ children }) {
  return (
    <nav style={cursorStyle}>
      {children}
    </nav>
  );
}
export function DropdownMenu() {
  return (
    <div className="dropdown-content">
      <Link activeClass="active" to="Rent" spy={true} smooth={true} offset={-70} duration={500}>Rent</Link>
      <Link activeClass="active" to="Courses" spy={true} smooth={true} offset={-70} duration={500}>Courses</Link>
      <Link activeClass="active" to="Membership" spy={true} smooth={true} offset={-70} duration={500}>Membership</Link>
      <Link activeClass="active" to="Contact" spy={true} smooth={true} offset={-70} duration={500}>Contact</Link>
    </div>
  );
}
export default Navbar;;
