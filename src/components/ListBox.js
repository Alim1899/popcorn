import React from "react";
const ListBox = ({ listBoxOpen, setListBoxOpen, movies }) => {
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setListBoxOpen((open) => !open)}
      >
        {listBoxOpen ? "–" : "+"}
      </button>
      {listBoxOpen && (
        <ul className="list">
          {movies?.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListBox;
