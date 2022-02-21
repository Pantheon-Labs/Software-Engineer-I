import React, { Component } from "react";
import { Link } from "react-router-dom"


class Navbar extends Component {
    render() {
        return(
            <div>
                <Link className='link' to="/">About Me</Link> |   
                <Link className='link' to="/strengths">My strengths</Link> |   
                <Link className='link' to="/passions">My passions</Link> |  
                <Link className='link' to="/why">Why I want to join you</Link> |
                <Link className='link' to="/pina-colada">Piña Colada</Link>
            </div>
        )
    }
}
export default Navbar;