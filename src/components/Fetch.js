import { useEffect } from "react";
const KEY = "42a9ab01";

const Fetch = (setMovies, setIsLoading, setError,query) => {
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("")
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if(!query.length){
      setMovies([])
      setError("")
      return
    }
    fetchMovies();
  }, [setMovies, setIsLoading, setError,query]);

};

export default Fetch;
