import { Routes, Route } from "react-router-dom";
import Home from  "./components/Home"
import Navbar from "./components/Navbar";
import Events from "./components/Events"
import Extras from "./components/Extras"
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div className = "App">
      <ChakraProvider>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/extras" element={<Extras/>} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;