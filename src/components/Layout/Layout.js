import { useState } from "react";
import Navbar from "../navbar";
import Loading from "../Loading";
import ListBox from "../ListBox";
import WatchedBox from "../WatchedBox";
import { tempMovieData } from "../MovieData";
import { tempWatchedData } from "../MovieData";
import MovieDetails from "../MovieDetails";
import Fetch from "../Fetch";
import Error from "../Error";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export default function Layout() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [watchedBoxOpen, setWatchedBoxOpen] = useState(true);
  const [listBoxOpen, setListBoxOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  Fetch(setMovies, setIsLoading, setError, query);
  const handleSelectedMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />
      <div className="main">
        {isLoading && <Loading />}
        {!isLoading && !error && (
          <ListBox
            listBoxOpen={listBoxOpen}
            setListBoxOpen={setListBoxOpen}
            movies={movies}
            handleSelectedMovie={handleSelectedMovie}
          />
        )}
        {error && <Error message={error} />}
        {selectedId ? (
          <MovieDetails
            selectedId={selectedId}
            onCloseMovie={handleCloseMovie}
          />
        ) : (
          <WatchedBox
            setWatchedBoxOpen={setWatchedBoxOpen}
            watchedBoxOpen={watchedBoxOpen}
            watched={watched}
            setWatched={setWatched}
            avgImdbRating={avgImdbRating}
            avgUserRating={avgUserRating}
            avgRuntime={avgRuntime}
          />
        )}
      </div>
    
    </>
  );
}
