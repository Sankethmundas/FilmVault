import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

const Movies = ({ handleAddToWatchlist, handleRemoveWatchlist, watchlist }) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    setPageNo((currentPage) => Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    setPageNo((currentPage) => currentPage + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=584bfa725ac43b6d505cd0c6cad05078&language=en-US&page=${pageNo}`,
      )
      .then(function (res) {
        setMovies(res.data.results);
      });
  }, [pageNo]);
  return (
    <>
      <div className="p-5">
        <div className="text-2xl text-center font-bold m-5">
          Trending Movies
        </div>

        <div className="flex flex-row flex-wrap justify-around gap-8">
          {movies.map((movieObj) => {
            return (
              <MovieCard
                key={movieObj.id}
                poster_path={movieObj.poster_path}
                name={movieObj.original_title}
                movieObj={movieObj}
                handleAddToWatchlist={handleAddToWatchlist}
                handleRemoveWatchlist={handleRemoveWatchlist}
                watchlist={watchlist}
              />
            );
          })}
        </div>
        <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext} />
      </div>
    </>
  );
};

export default Movies;

//https://api.themoviedb.org/3/movie/popular?api_key=584bfa725ac43b6d505cd0c6cad05078&language=en-US&page=1
