import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

function NavbarComponent() {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Navbar dark expand="md">
      <RouterLink className="navbar-brand navbar-link" to="/">
        Sailing Academy
      </RouterLink>

      <Nav className="ml-auto w-100" navbar>
        <RouterLink
          className="nav-link d-none d-md-block navbar-link"
          to="/registration"
        >
          {t("Membership")}
        </RouterLink>
        <RouterLink
          className="nav-link d-none d-md-block navbar-link"
          to="/rent"
        >
          {t("Services")}
        </RouterLink>
        <RouterLink
          className="nav-link d-none d-md-block navbar-link"
          to="/contact-us"
        >
          {t("Contact Us")}
        </RouterLink>

        {/* Mobile view dropdown */}
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-md-none">
          <DropdownToggle nav caret>
            {t("Menu")}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={RouterLink} to="/">
              {t("Home")}
            </DropdownItem>

            <DropdownItem tag={RouterLink} to="/registration">
              {t("Membership")}
            </DropdownItem>
            <DropdownItem tag={RouterLink} to="/rent">
              {t("Services")}
            </DropdownItem>
            <DropdownItem tag={RouterLink} to="/contact-us">
              {t("Contact Us")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
