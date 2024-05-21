import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SignUp from './SignUp';
import SignIn from './SignIn';
import { ReviewProvider } from "../Context/reviewContext";
import { BrowserRouter, Route } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import ReviewPage from "./Reviewpage";
import '../styles/Reviewitems.css';

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <div className="App">
        <ReviewProvider>
          <Header />

          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/reviews" component={ReviewPage} />

          <Footer />
        </ReviewProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;