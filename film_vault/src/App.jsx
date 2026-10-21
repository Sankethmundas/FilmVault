import { useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Movies from './components/Movies'
import Watchlist from './components/Watchlist'
import {BrowserRouter, Route, Routes} from 'react-router'
import './App.css'
import Banner from './components/Banner'

function App() {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedWatchlist = localStorage.getItem('moviesApp')
      const parsedWatchlist = savedWatchlist ? JSON.parse(savedWatchlist) : []
      return Array.isArray(parsedWatchlist) ? parsedWatchlist : []
    } catch (error) {
      console.error('Unable to load the saved watchlist', error)
      return []
    }
  })

  const watchlistRef = useRef(watchlist)

  const updateWatchlist = (update) => {
    const nextWatchlist =
      typeof update === 'function' ? update(watchlistRef.current) : update

    watchlistRef.current = nextWatchlist
    try {
      localStorage.setItem('moviesApp', JSON.stringify(nextWatchlist))
    } catch (error) {
      console.error('Unable to save the watchlist', error)
    }
    setWatchlist(nextWatchlist)
  }

  const handleAddToWatchlist = (movieObj) => {
    updateWatchlist((currentWatchlist) =>
      currentWatchlist.some((movie) => movie.id === movieObj.id)
        ? currentWatchlist
        : [...currentWatchlist, movieObj],
    )
  }

  const handleRemoveWatchlist = (movieObj) => {
    updateWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieObj.id),
    )
  }

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<> <Banner/> <Movies handleAddToWatchlist={handleAddToWatchlist} handleRemoveWatchlist={handleRemoveWatchlist} watchlist={watchlist}/></>}/>
          <Route path='/watchlist' element = {<Watchlist watchlist={watchlist} handleRemoveWatchlist={handleRemoveWatchlist} setWatchlist={updateWatchlist}/>}/>
        </Routes>
      </BrowserRouter>
      
    </>  
  );

}

export default App;
