import "./Intro.scss"

export default function intro() {
  return (
    <div className='intro' id='intro'>
        <div className="left">
          <div className="imgContainer">
            <img src="images/IMG_1052.jpeg" alt=""/>
          </div>
        </div>
        <div className="right">
            <div className="wrapper">
              <h1> Hi! </h1>
              <p> Welcome to my page,</p>
              <p> my names Ken, I am currently a student studying <br></br> software engineering with General Assembly. <br></br>I am currently 21 years old, I live in Seattle WA </p>
              <br></br>
              <br></br>
              <h1>Hobbies!</h1>
              <p> I go to music festivals, hikes, <br></br> and i especially love sleeping.</p>
            </div>
                  <a href="portfolio">
                    <img src="a" alt="" />
                  </a>
        </div>
    </div>
  )
}
