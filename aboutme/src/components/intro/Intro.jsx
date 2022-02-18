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
              <p> I go to music festivals, hikes, <br></br> and I especially love sleeping.</p>
              <br></br>
              <br></br>
              <h1> Speciality </h1>
              <p> Front-end developer, Node.JS, React, HTML, <br></br> CSS, JS </p>
            </div>
                 
        </div>
    </div>
  )
}
