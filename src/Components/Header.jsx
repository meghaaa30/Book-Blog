import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

function Header() {

  return (
    <BrowserRouter forceRefresh={true}>
      <div>
        <header>
          <div>
            <button>
              <Link to="/">Home</Link>
            </button>
            <button>
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
