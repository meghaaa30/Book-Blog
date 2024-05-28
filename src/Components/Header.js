import React, { useContext, useState } from "react";
import logo from "../assets/images/logo.jpg";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsAuth(false);
    history.push('/');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="app-root-1">
      <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
        <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
          <div className="header-left-4"></div>
          <NavLink to="/"><img className="header-logo-11" src={logo} alt="logo" /></NavLink>
          <div className="header-vertical-9"></div>
          <NavLink to="/">
            <h5 className="Typography-root header-logo-text">Book-Blog</h5>
          </NavLink>
          <div className="header-empty-6"></div>
          <div className="header-space-8"></div>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <NavLink to="/discover">Discover</NavLink>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <NavLink to={{ pathname: "/add", state: { from: history.location.pathname } }}>Add Review</NavLink>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <NavLink to="/about">About Us</NavLink>
          </button>
          {isAuth && (
            <button
              className="ButtonBase-root Button-root Button-text header-navButtons-3 logout-button"
              onClick={handleLogout}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {!isHovered && <LogoutIcon />}
              {isHovered && <span className="logout-text">Sign Out</span>}
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
