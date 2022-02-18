import { Routes, Route, BrowserRouter } from "react-router-dom";
import News from  "./components/News"
import Navbar from "./components/Navbar";
import Events from "./components/Events"
import Home from "./components/Home";
import { ChakraProvider } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
import useQuery from "./hooks/useQuery"

function App() {
  const [events, setEvents] = useState([])
  const { data: world } = useQuery('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=YkWaNj24icDnkRr35VtclKozbOiwwANN')
  const { data: us } = useQuery('https://api.nytimes.com/svc/topstories/v2/us.json?api-key=YkWaNj24icDnkRr35VtclKozbOiwwANN')
  const { data: science } = useQuery('https://api.nytimes.com/svc/topstories/v2/science.json?api-key=YkWaNj24icDnkRr35VtclKozbOiwwANN')
  const { data: home } = useQuery('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=YkWaNj24icDnkRr35VtclKozbOiwwANN')
  const { data: arts } = useQuery('https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=YkWaNj24icDnkRr35VtclKozbOiwwANN')

  useEffect(() => {
      fetch('http://primike.github.io/data/events_300_rss.json')
      .then(res => res.json())
      .then(events => setEvents(events))
  }, [])

  let today = new Date()
  let dayDate = today.toISOString().split('T', 1)[0]
  let todayArray = events.filter(function (e) { return e.startdate === dayDate })
      
  return (
    <div className = "App">
      <BrowserRouter>
        <Navbar/>
        <ChakraProvider>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/news" element={<News arts = {arts} world = {world} science = {science} us = {us} home = {home}/>} />
              <Route path="/events" element={<Events events = {todayArray}/>} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;