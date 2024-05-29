import React, { useContext } from "react";
import Header from "./Header";
import SignUp from './SignUp';
import SignIn from './SignIn';
import { ReviewProvider } from "../Context/reviewContext";
import { AuthContext, AuthProvider } from "../Context/AuthContext";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Reviews from "./Reviewpage";
import ReviewAdded from "./ReviewAdded";
import Discover from "./Discover";
import BookStrip from "./BookStrip";
import '../styles/Reviewitems.css';
import '../styles/Signout.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ReviewProvider>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={BookStrip} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route path="/discover" component={Discover} />
              <Route exact path="/reviews" component={Reviews} />
              <ProtectedRoute path="/add" component={ReviewAdded} />
            </Switch>
          </div>
        </ReviewProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/sign-in", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default App;
