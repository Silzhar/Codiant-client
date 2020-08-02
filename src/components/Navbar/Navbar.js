import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useEffect } from 'react';
import MenuMobile from "../MenuMobile"
import { selectIsAuthenticated } from "../../features/authenticateSlice";

import "./style.scss";
const logo = "https://res.cloudinary.com/uyscuty/image/upload/v1594842561/codiant_ldccdm.png"

function Navbar() {
  const myIsAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <div className="Navbar">
      <img
        className="Navbar__image"
        alt="Codiant logo"
        src={logo}
      />
      <MenuMobile/>
      <div className="Navbar__linkcontainer">
        {/* <div className="Navbar__link"><Link to="/">Home</Link></div> */}
        {!myIsAuthenticated ? (
          <div className="Navbar__link">
            <Link to="/user">Login</Link>
          </div>
        ) : (
          <React.Fragment>
            <div className="Navbar__link">
              <Link to="/courses">Courses</Link>
            </div>
            <div className="Navbar__link">
              <Link to="/user">My Area</Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Navbar;
