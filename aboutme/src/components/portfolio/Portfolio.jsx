import './Portfolio.scss'
import React from 'react'

export default function portfolio() {
  return (
    <div className='portfolio' id='portfolio'>
        <h1>Portfolio</h1>
            <ul>
              <li className='active'>Featured</li>
              <li>React </li>
              <li>Fundamentals of CS</li>
            </ul>

            <div className="container">
                <div className='item'>
                <a href="https://github.com/kenliii/thegame">
                  <img 
                  src="images/yourself.png"
                  alt=""
                  />
                </a>
                </div>
                </div>
            <div className="container">
                <div className='item'>
                <a href="https://github.com/kenliii/project-two/tree/master">
                  <img 
                  src="images/airbnb.png"
                  alt=""
                  />
               </a>
                </div>
                </div>
            <div className="container">
                <div className='item'>
                <a href="https://github.com/kenliii/explore">
                  <img 
                  src="images/real.png"
                  alt=""
                  />
                </a>
                  
                </div>    
            </div>
    </div>
  )
}
