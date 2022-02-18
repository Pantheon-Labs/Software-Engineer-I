import './Portfolio.scss'

export default function portfolio() {
  return (
    <div className='portfolio' id='portfolio'>
        <h1>Portfolio</h1>
            <ul>
              <li className='active'>Featured</li>
              <li>React </li>
              <li>Fundamentals of CS</li>
              <li>Featured</li>
            </ul>

            <div className="container">
                <div className='item'>
                  <img 
                  src=""
                  alt=""
                  />
                  <h3>Tamagachi Project</h3>
                </div>
                </div>
            <div className="container">
                <div className='item'>
                  <img 
                  src=""
                  alt=""
                  />
                  <h3>Exotic Animals</h3>
                </div>
                </div>
            <div className="container">
                <div className='item'>
                  <img 
                  src=""
                  alt=""
                  />
                  <h3>Tamagachi Project</h3>
                </div>    
            </div>
    </div>
  )
}
