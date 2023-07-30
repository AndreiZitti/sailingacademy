import React from 'react';
import { Link } from 'react-scroll';

function HomeLinks() {
  return (
    <>
      <Link activeClass="active" to="Rent" spy={true} smooth={true} offset={-70} duration={500}>Rent</Link>
      <Link activeClass="active" to="Courses" spy={true} smooth={true} offset={-70} duration={500}>Courses</Link>
      <Link activeClass="active" to="Membership" spy={true} smooth={true} offset={-70} duration={500}>Membership</Link>
      <Link activeClass="active" to="Contact" spy={true} smooth={true} offset={-70} duration={500}>Contact</Link>
    </>
  );
}

export default HomeLinks;
