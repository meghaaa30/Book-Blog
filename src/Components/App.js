import React from "react";
import Header from "./Header";
import SignUp from './SignUp';
import SignIn from './SignIn';
import { ReviewProvider } from "../Context/reviewContext";
import { AuthContext, AuthProvider } from "../Context/AuthContext";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import ReviewPage from "./Reviewpage";
import ReviewAdded from "./ReviewAdded";
import Discover from "./Discover";
import BookStrip from "./BookStrip";
import '../styles/Reviewitems.css';
import '../styles/Signout.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ReviewProvider>
          <AuthProvider>
            <Header />
            <Switch>
              <Route exact path="/" component={BookStrip} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route path="/discover" component={Discover} />
              <Route exact path="/reviews" component={ReviewPage} />
              <Route path="/add" render={() => (
                <AuthContext.Consumer>
                  {({ isAuth }) => (
                    isAuth ? <ReviewAdded /> : <Redirect to={{ pathname: "/sign-in", state: { from: "/add" } }} />
                  )}
                </AuthContext.Consumer>
              )} />
            </Switch>
          </AuthProvider>
        </ReviewProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
