import { useEffect, useRef } from "react";
import useKey from "./CustomHooks/useKey";
const Navbar = ({ query, setQuery, movies }) => {
  const inputEl = useRef();

useKey("Enter",()=>{
 if(document.activeElement===inputEl.current) return;
     
        inputEl.current.focus();
        setQuery("");
})
  useEffect(() => {
    const callback = (e) => {
     
      
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
