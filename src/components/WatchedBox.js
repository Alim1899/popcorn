const WatchedBox = ({
  setWatchedBoxOpen,
  watchedBoxOpen,
  watched,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  handleRemove
}) => {
  
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setWatchedBoxOpen((open) => !open)}
      >
        {watchedBoxOpen ? "–" : "+"}
      </button>
      {watchedBoxOpen && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>

          <ul className="list">
            {watched.map((movie) => (
              <li key={movie.imdbId}>
                <img src={movie.poster||''} alt={`${movie.title} poster`} />
                <h3>{movie.title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating||''}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating||''}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.runtime||0} min</span>
                  </p>
                </div>
                <button
  className="btn-delete"
  onClick={() => handleRemove(movie.imdbId)} 
>X</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default WatchedBox;
