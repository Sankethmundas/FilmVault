import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Movies from './components/Movies'
import Watchlist from './components/Watchlist'
import {BrowserRouter, Route, Routes} from 'react-router'
import './App.css'
import Banner from './components/Banner'

function App() {
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem('moviesApp')
    return savedWatchlist ? JSON.parse(savedWatchlist) : []
  })

  const handleAddToWatchlist = (movieObj) => {
    setWatchlist((currentWatchlist) => [...currentWatchlist, movieObj])
  }

  const handleRemoveWatchlist = (movieObj) => {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieObj.id),
    )
  } 

  useEffect(()=>{
    localStorage.setItem('moviesApp', JSON.stringify(watchlist))
  }, [watchlist])

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<> <Banner/> <Movies handleAddToWatchlist={handleAddToWatchlist} handleRemoveWatchlist={handleRemoveWatchlist} watchlist={watchlist}/></>}/>
          <Route path='/watchlist' element = {<Watchlist watchlist={watchlist} handleRemoveWatchlist={handleRemoveWatchlist} setWatchlist={setWatchlist}/>}/>
        </Routes>
      </BrowserRouter>
      
    </>  
  );

}

export default App;
