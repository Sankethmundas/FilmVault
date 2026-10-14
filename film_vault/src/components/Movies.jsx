import React from 'react'
import MovieCard from './MovieCard'

const Movies = () => {
  return (
    <>
        <div className='p-5'>
            <div className='text-2xl text-center font-bold m-5'>Trending Movies</div>
        </div>
        <div className='flex flex-row flex-wrap justify-around'>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
        </div>
    </>
    
  )
}

export default Movies
