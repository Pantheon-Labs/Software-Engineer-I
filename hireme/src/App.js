import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Strength from "./components/Strength";
import Testimonial from "./components/Testimonial";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <About />
      <Strength />
      <Testimonial />
    </div>
  );
}

export default App;
