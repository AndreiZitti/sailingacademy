import React from 'react';
import './Navbar.css'; // Import your styles
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

export default Navbar;
