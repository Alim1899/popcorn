import { useEffect, useRef } from "react";
const Navbar = ({ query, setQuery, movies }) => {
  const inputEl = useRef();
  useEffect(() => {
    const callback = (e) => {
      if(document.activeElement===inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    };
    document.addEventListener("keydown", callback);
    return ()=>document.addEventListener('keydown',callback)
  }, [setQuery]);
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
};

export default Navbar;
