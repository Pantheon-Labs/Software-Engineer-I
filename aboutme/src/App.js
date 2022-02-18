import Topbar from "./components/topbar/Topbar";
import Intro from "./components/intro/Intro"
import Portfolio from "./components/portfolio/Portfolio"
import Work from "./components/work/Work"
import Testimonials from "./components/testimonials/Testimonials"
import Contact from "./components/contact/Contact"

function App() {
  return (
    <div>
  <Topbar />
    <div className="sections">
      <Intro />
      <Portfolio/>
      <Work/>
      <Testimonials/>
      <Contact/>
    </div>


    </div>
    
  )
}

export default App