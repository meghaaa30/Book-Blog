import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Review from "../Context/Reviewss";
function App() {
  return (
    <div className="App">
       <Review>
      <Header />
      {/* <Footer /> */}
    </Review>
    </div>
  );
}

export default App;

