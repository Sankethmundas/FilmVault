import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

const Movies = ({ handleAddToWatchlist, handleRemoveWatchlist, watchlist }) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handlePrev = () => {
    setLoading(true);
    setPageNo((currentPage) => Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    if (pageNo < totalPages) {
      setLoading(true);
      setPageNo((currentPage) => currentPage + 1);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/api/popular", {
        params: { page: pageNo },
        signal: controller.signal,
      })
      .then((res) => {
        setError("");
        setMovies(res.data.results);
        setTotalPages(Math.min(res.data.total_pages || 1, 500));
      })
      .catch((requestError) => {
        if (!axios.isCancel(requestError)) {
          setError(
            requestError.response?.data?.error ||
              "Unable to load movies. Please try again later.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [pageNo]);
  return (
    <>
      <div className="p-5">
        <div className="text-2xl text-center font-bold m-5">
          Trending Movies
        </div>

        {error && (
          <p role="alert" className="text-center text-red-700">
            {error}
          </p>
        )}

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
        {loading && <p className="text-center">Loading movies...</p>}
        <Pagination
          pageNo={pageNo}
          handlePrev={handlePrev}
          handleNext={handleNext}
          canGoPrev={pageNo > 1 && !loading}
          canGoNext={pageNo < totalPages && !loading}
        />
      </div>
    </>
  );
};

export default Movies;
