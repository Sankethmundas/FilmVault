import React from 'react'

function MovieCard({poster_path,name}) {
  return (
    <div className='h-[40vh] w-[150px] bg-cover bg-center rounded-xl hover:scale-110 duration-300 hover-cursor-pointer ml-5' style={{backgroundImage : `url(https://image.tmdb.org/t/p/original/${poster_path})`}}>
      <div className='text-white text-xl text-center w-full p-2 bg-gray-900/60 bg-cover'>
        {name}
      </div>
    </div>
  )
}

export default MovieCard
