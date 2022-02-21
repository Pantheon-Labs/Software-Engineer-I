import React, { Component } from "react";
import { Link } from "react-router-dom"


class Navbar extends Component {
    render() {
        return(
            <div>
                <Link className='link' to="/">About Me</Link>
                <Link className='link' to="/strengths">My strengths</Link>
                <Link className='link' to="/passions">My passions</Link>
                <Link className='link' to="/whyme">Why I want to Join you</Link>
            </div>
        )
    }
}
export default Navbar;