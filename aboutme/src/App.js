import Topbar from "./components/topbar/Topbar";
import Intro from "./components/intro/Intro"
import Portfolio from "./components/portfolio/Portfolio"
import Work from "./components/work/Work"
import Testimonials from "./components/testimonials/Testimonials"
import "./app.scss"

function App() {
  return (
    <div>
  
    <div className="sections">
      <Topbar />
      <Intro />
      <Portfolio/>
      <Work/>
      <Testimonials/>
    </div>


    </div>
    
  )
}

export default App