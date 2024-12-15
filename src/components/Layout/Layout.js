import { useEffect, useState } from "react";
import Navbar from "../navbar";
import Loading from "../Loading";
import ListBox from "../ListBox";
import WatchedBox from "../WatchedBox";
import MovieDetails from "../MovieDetails";
import Error from "../Error";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "42a9ab01";
export default function Layout() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(()=>{ return JSON.parse(localStorage.getItem("watched"))});
  const [watchedBoxOpen, setWatchedBoxOpen] = useState(true);
  const [listBoxOpen, setListBoxOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const handleSelectedMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };
  const watchedUserRating = watched.find((movie)=>movie.imdbId===selectedId)?.userRating
    const handleAddWatched = (movie)=>{
     setWatched((watched)=>[...watched,movie])
  }
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(1);
  const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(1);
  const handleRemove = (id)=>{
    setWatched(watched=>watched.filter((movie)=>movie.imdbId!==id))
      }

     
      useEffect(()=>{
        localStorage.setItem("watched",JSON.stringify(watched))
      },[watched])

        useEffect(() => {
          const controller = new AbortController();
          const fetchMovies = async () => {
            try {
              setIsLoading(true);
              setError("");
              const res = await fetch(
                `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                { signal: controller.signal }
              );
              if (!res.ok) throw new Error("Something went wrong");
              const data = await res.json();
              if (data.Response === "False") throw new Error("Movie not found");
              setMovies(data.Search);
              setIsLoading(false);
              setError("");
            } catch (err) {
              if (err.name !== "AbortError") {
                setError("Movie not found");
              }
            } finally {
              setIsLoading(false);
            }
          };
          if (!query.length) {
            setMovies([]);
            setError("");
            return;
          }
          handleCloseMovie();
          fetchMovies();
          return () => {
            controller.abort();
          };
        }, [setMovies, setIsLoading, setError, query]);
      
      
      

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
handleRemove={handleRemove}            avgImdbRating={avgImdbRating}
            avgUserRating={avgUserRating}
            avgRuntime={avgRuntime}
          />
        )}
      </div>
    
    </>
  );
}
