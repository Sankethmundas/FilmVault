import { useState } from "react";
import genreids from "../Utility/genre"

const Watchlist = ({ watchlist, handleRemoveWatchlist, setWatchlist }) => {

  const [search,setSearch] = useState(``)
  const [currentGenre, setCurrentgenre] = useState('All genres')
  const genreList = [
    'All genres',
    ...new Set(
      watchlist
        .map((movieObj) => genreids[movieObj.genre_ids[0]])
        .filter(Boolean),
    ),
  ]

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleFilter = (genre) =>{
    setCurrentgenre(genre)
  }

  const sortIncreasing = () =>{
    const increaseSort = [...watchlist].sort((movieA,movieB) =>{
      return movieA.vote_average - movieB.vote_average
    })

    setWatchlist(increaseSort)
  }

  const sortDecreasing = () =>{
    const DecreaseSort = [...watchlist].sort((movieA,movieB) =>{
      return movieB.vote_average - movieA.vote_average
    })

    setWatchlist(DecreaseSort)
  }

  return (
    <>

      <div className="flex justify-center flex-wrap m-4">

        {genreList.map((genre)=>{
          return <div onClick={() => handleFilter(genre)} className={currentGenre==genre ? "flex bg-blue-400 rounded-xl w-[9rem] h-[3rem] justify-center items-center text-white font-bold mx-4" : "flex bg-gray-400/50 rounded-xl w-[9rem] h-[3rem] justify-center items-center text-white font-bold mx-4"}>{genre}</div>
        })}
        {/* <div className=" flex bg-gray-400/50 rounded-xl w-[9rem] h-[3rem] justify-center items-center text-white font-bold mx-4">Action</div>
        <div className=" flex bg-gray-400/50 rounded-xl w-[9rem] h-[3rem] justify-center items-center text-white font-bold">Action</div> */}


      </div>
      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search for Movies..."
          className="h-[3rem] w-[18rem] bg-gray-200 px-4"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 m-8" >
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div className="p-2" onClick={sortIncreasing}><i class="fa-solid fa-arrow-up"></i></div>
                <div className="p-2">Ratings</div>
                <div className="p-2" onClick={sortDecreasing}><i class="fa-solid fa-arrow-down"></i></div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.filter((obj) => {
              if(currentGenre == 'All genres'){
                return true
              }else{
                return genreids[obj.genre_ids[0]] == currentGenre
              }
            }).filter((movieObj)=>{
              return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())
            }).map((movie) => (
              <tr className="border-b-2" key={movie.id}>
                <td className="flex items-center px-6 py-4">
                  {movie.poster_path && (
                    <img
                      className="h-[6rem] w-[10rem]"
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                      alt={movie.title || movie.original_title}
                    />
                  )}
                  <div className="mx-10">{movie.title || movie.original_title}</div>
                </td>
                <td>{movie.vote_average}</td>
                <td>{movie.popularity}</td>
                <td>{genreids[movie.genre_ids[0]]}</td>
                <td>
                  <button
                    type="button"
                    className="text-red-800"
                    px-10
                    onClick={() => handleRemoveWatchlist(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Watchlist;
