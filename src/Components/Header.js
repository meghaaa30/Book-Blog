import React from "react";
import logo from "../images/logo.jpg";
import BookStrip from "./BookStrip";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import AddReview from "./ReviewAdded"
import Review from "../Context/Reviewss"
import Discover from "./Discover";
import ReviewAdded from "./ReviewAdded";
function Header() {

  return (
    <>
   
    <BrowserRouter>
      <div className="app-root-1">
        <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
          <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
            <div className="header-left-4"></div>
            <NavLink to="/"><img className="header-logo-11" src={logo} alt="" /></NavLink>
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
              <NavLink to="/add">Add Review</NavLink>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <NavLink to="/about">About Us</NavLink>
            </button>
          </div>
        </header>
      </div>
      <Switch>
        <Route exact path="/">
          {/* <img className="bottom-space" src={homeImage} alt="" /> */}
          <BookStrip /> 
        </Route>
        <Route path="/add"><ReviewAdded></ReviewAdded></Route>
        <Route path="/discover"><Discover></Discover></Route>
        {/* // <Route path="/add"></Route>
        // <Route path="/about"></Route> */ }
  
      </Switch>
    </BrowserRouter>
    
    </>
  );
}

export default Header;
