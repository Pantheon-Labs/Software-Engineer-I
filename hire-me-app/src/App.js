import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import {
  Routes,
  Route
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Hi I'm Abraham
        </h1>
        <Navbar/>
      </header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/strengths" />
        <Route path="/passions" />
        <Route path="/whyme" />
      </Routes>
    </div>
  );
}

export default App;
