import React from "react";
import Routes from "./routes.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

const styles = {
  position: "relative",
  minHeight: "100vh",
};

const App = () => {
  return (
    <div style={styles}>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
