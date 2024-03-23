import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

function Header() {

  return (
    <BrowserRouter forceRefresh={true}>
      <div className="app-root-1">
        <header className="Paper-root AppBar-root AppBar-colorPrimary Paper-elevation4">
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
            <button>
              <Link to="/bestsellers">Bestsellers</Link>
            </button>
            <button>
              <Link to="/genre">Genre </Link>
            </button>
          </div>
        </header>
      </div>
      {/* <Switch>
        <Route exact path="/"></Route>
        <Route path="/discover"></Route>
        <Route path="/bestsellers"></Route>
        <Route path="/genre"></Route>
      </Switch> */}
    </BrowserRouter>
  );
}

export default Header;
