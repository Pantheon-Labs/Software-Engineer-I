import { Link } from "react-router-dom";

function Navbar() {
    return(
        <div className ='header'>
            <h4 className = "title"> Primike's NYC guide</h4>
            <nav className = "tabs">
                <ul className = "nav">
                    <li className = 'links'><Link to="/">Home</Link></li>
                    <li className = 'links'><Link to="/news">News</Link></li>
                    <li className = 'links'><Link to="/events">Park Events</Link></li>
                    <li className = 'links'><Link to="/extras">Extras</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar