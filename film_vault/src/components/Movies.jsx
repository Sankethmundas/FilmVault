import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'

const Movies = () => {

  const [movies, setMovies] = useState([]);
  useEffect(()=>{
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=584bfa725ac43b6d505cd0c6cad05078&language=en-US&page=1').then(function(res){
      setMovies(res.data.results)
    })
  })
  return (
    <>
        <div className='p-5'>
            <div className='text-2xl text-center font-bold m-5'>Trending Movies</div>
        </div>
        <div className='flex flex-row flex-wrap justify-around gap-8'>
          {movies.map((movieObj) => {
            return <MovieCard poster_path={movieObj.poster_path} name={movieObj.original_title}/>
          })}
        </div>
    </>
    
  )
}

export default Movies

//https://api.themoviedb.org/3/movie/popular?api_key=584bfa725ac43b6d505cd0c6cad05078&language=en-US&page=1