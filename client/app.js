import React from "react";
import Routes from "./routes.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
