import { useEffect } from "react";
const KEY = "42a9ab01";

const Fetch = (setMovies, setIsLoading, setError, query, handleCloseMovie) => {
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
          setError(err.message);
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
  }, [setMovies, setIsLoading, setError, query, handleCloseMovie]);
};

export default Fetch;
