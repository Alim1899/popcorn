import { useState } from "react";
import Navbar from "../navbar";
import ListBox from "../ListBox";
import WatchedBox from "../WatchedBox";
import { tempMovieData } from "../MovieData";
import { tempWatchedData } from "../MovieData";
import StarRating from "../Stars/StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function Layout() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [watchedBoxOpen, setWatchedBoxOpen] = useState(true);
  const [listBoxOpen, setListBoxOpen] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />
      <div className="main">
        <ListBox
          listBoxOpen={listBoxOpen}
          setListBoxOpen={setListBoxOpen}
          movies={movies}
        />
        <WatchedBox
          setWatchedBoxOpen={setWatchedBoxOpen}
          watchedBoxOpen={watchedBoxOpen}
          watched={watched}
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
        />
      </div>
      <StarRating
        maxRating={5}
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}/>

    </>
  );
}
