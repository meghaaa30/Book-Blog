import React from "react";
import logo from "../images/logo.jpg";
import homeImage from "../images/home.png"
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

function Header() {

  return (
    <BrowserRouter forceRefresh={true}>
      <div className="app-root-1">
        <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
          <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
            <div className="header-left-4"></div>
            <Link to="/"><img className="header-logo-11" src={logo} alt="" /></Link>
            <div className="header-vertical-9"></div>
            <Link to="/">
              <h5 className="Typography-root header-logo-text">Book-Blog</h5>
            </Link>
            <div className="header-empty-6"></div>
            <div className="header-space-8"></div>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/discover">Discover</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/add">Add Review</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/about">About Us</Link>
            </button>
          </div>
        </header>
      </div>
      <Switch>
        <Route exact path="/">
          <img className="bottom-space" src={homeImage} alt="" />
        </Route>
        {/* <Route path="/discover"></Route>
        <Route path="/add"></Route>
        <Route path="/about"></Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Header;
