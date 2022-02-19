import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Strength from "./components/Strength";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <About />
      <Strength />
    </div>
  );
}

export default App;
