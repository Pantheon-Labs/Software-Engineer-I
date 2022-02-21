import './App.css';
import Home from './Home';
import { Link } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Hi I'm Abraham
        </h1>
        <Link className='link' to="/aboutme">About Me</Link>
        <Link className='link' to="/strengths">My strengths</Link>
        <Link className='link' to="/passions">My passions</Link>
        <Link className='link' to="/whyme">Why I want to Join you</Link>
      </header>
      <Home/>
    </div>
  );
}

export default App;
