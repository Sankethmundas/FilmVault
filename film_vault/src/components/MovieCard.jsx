function MovieCard({ poster_path, name, movieObj, handleAddToWatchlist,handleRemoveWatchlist,watchlist = [] }) {
  
  const doesContain = (movieObj) => {
      for(let i = 0 ; i < watchlist.length ; i++){
        if(watchlist[i].id == movieObj.id){
          return true;
        }
      }
      return false;
  } 

  return (

    <div className='h-[40vh] w-[150px] bg-cover bg-center rounded-xl flex flex-col justify-between items-end hover:scale-110 duration-300 hover-cursor-pointer ml-5' style={{backgroundImage : `url(https://image.tmdb.org/t/p/original/${poster_path})`}}>
      {
        doesContain(movieObj) ? <button type='button' onClick={() => handleRemoveWatchlist(movieObj)} aria-label={`Remove ${name} from watchlist`} className='flex m-4 justify-center items-center h-8 w-8 rounded-lg bg-gray-900/60'>
        &#10060;</button>
        :
        <button type='button' onClick={() => handleAddToWatchlist(movieObj)} aria-label={`Add ${name} to watchlist`} className='flex m-4 justify-center items-center h-8 w-8 rounded-lg bg-gray-900/60'>
        &#128525;
      </button>
      }
      <div className='text-white text-xl text-center w-full p-2 bg-gray-900/60 bg-cover'>
        {name}
      </div>
    </div>
  )
}

export default MovieCard
