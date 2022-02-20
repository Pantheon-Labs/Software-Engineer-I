import React from "react";

import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Strength from "./components/Strength";
import Testimonial from "./components/Testimonial";
import Poll from "./components/Poll";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <About />
      <Strength />
      <Testimonial />
      <Poll />
    </div>
  );
}

export default App;
