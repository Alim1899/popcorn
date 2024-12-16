import { useEffect, useState } from "react";
const KEY = "42a9ab01";
export const useMovies = (query) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    // callback?.();
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
    if (query.length<3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);
  return {movies,isLoading,error}
};
