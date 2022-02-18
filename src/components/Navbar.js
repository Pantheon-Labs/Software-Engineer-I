import { Link } from "react-router-dom";
import { Image } from 'semantic-ui-react'

function Navbar() {
    return(
        <div className ='header'>
            <h4 className = "title"> 
                <Image src='https://pbs.twimg.com/profile_images/1355961670603051021/0vnhG6MZ_400x400.jpg' size='tiny' circular />
                Primike's NYC guide
            </h4>
            <nav className = "tabs">
                <ul className = "nav">
                    <li className = 'links'><Link to="/">Home</Link></li>
                    <li className = 'links'><Link to="/news">News</Link></li>
                    <li className = 'links'><Link to="/events">Park Events</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar