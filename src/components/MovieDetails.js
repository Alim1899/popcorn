import { useEffect, useState } from "react";
import StarRating from "./Stars/StarRating";
import Loading from "./Loading";
const MovieDetails = ({ selectedId, onCloseMovie }) => {
  const KEY = "42a9ab01";
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    Title: title,

    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      } finally {
      }
    };
    getMovieDetails();
  }, [selectedId, setMovie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}IMDb
              </p>
            </div>
          </header>
          <section>
            <StarRating maxRating={10} size={36} />
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
