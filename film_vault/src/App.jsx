import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Navbar from './components/Navbar'
import Movies from './components/Movies'
import Watchlist from './components/Watchlist'
import {BrowserRouter, Route, Routes} from 'react-router'
import './App.css'
import Banner from './components/Banner'

function App() {
  return(
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<> <Banner/> <Movies/></>}/>
          <Route path='/watchlist' element = {<Watchlist/>}/>
        </Routes>
      </BrowserRouter>
      
    </>  
    
  );
}

export default App;
