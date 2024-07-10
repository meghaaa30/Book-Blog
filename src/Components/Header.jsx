import React, { useContext, useState } from "react";
import logo from "../assets/images/logo.jpg";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Header() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsAuth(false);
    history.push('/');
    // closeMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="app-root-1">
      <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
        <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
          <div className="header-left-4"></div>
          <button className="ButtonBase-root" onClick={closeMenu}><NavLink to="/"><img className="header-logo-11" src={logo} alt="logo" /></NavLink></button>
          <div className="header-vertical-9"></div>
          <button className="ButtonBase-root Button-text header-navButtons-3" onClick={closeMenu}><NavLink to="/">
            <h5 className="Typography-root header-logo-text">Book-Blog</h5>
          </NavLink></button>
          <div className="header-empty-6"></div>
          <div className="header-space-8"></div>
          <button className="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <div className={`nav-links ${isMenuOpen ? 'open' : 'close'}`}>
            <hr className="nav-divider" />
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3" onClick={closeMenu}>
              <NavLink to="/discover">Discover</NavLink>
            </button>
            <hr className="nav-divider" />
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3" onClick={closeMenu}>
              <NavLink to={{ pathname: "/add", state: { from: history.location.pathname } }}>Add Review</NavLink>
            </button>
            <hr className="nav-divider" />
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3" onClick={closeMenu}>
              <NavLink to="/about">About Us</NavLink>
            </button>
            <hr className="nav-divider" />
            {isAuth && (
              <>
                <button
                  className="ButtonBase-root Button-root Button-text header-navButtons-3"
                  onClick={() => { handleLogout(); closeMenu(); }}
                >
                  {<LogoutIcon />}

                </button>
                {/* <hr className="nav-divider" /> */}
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
