import { useState } from "react";
import Navbar from "../navbar";
import Loading from "../Loading";
import ListBox from "../ListBox";
import WatchedBox from "../WatchedBox";
import MovieDetails from "../MovieDetails";
import Error from "../Error";
import { useMovies } from "../CustomHooks/useMovies";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export default function Layout() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorage([],'watched');

  const [watchedBoxOpen, setWatchedBoxOpen] = useState(true);
  const [listBoxOpen, setListBoxOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const handleSelectedMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };
  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;
  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(1);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(1);
  const handleRemove = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  };

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
            onAddWatched={handleAddWatched}
            watched={watched}
            watchedUserRating={watchedUserRating}
          />
        ) : (
          <WatchedBox
            setWatchedBoxOpen={setWatchedBoxOpen}
            watchedBoxOpen={watchedBoxOpen}
            watched={watched}
            handleRemove={handleRemove}
            avgImdbRating={avgImdbRating}
            avgUserRating={avgUserRating}
            avgRuntime={avgRuntime}
          />
        )}
      </div>
    </>
  );
}
