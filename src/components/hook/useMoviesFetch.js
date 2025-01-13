import { useState, useEffect } from "react";

const useMovieFetch = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const API_KEY = import.meta.env.VITE_API_KEY;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
        );

        if (!response.ok) {
          throw new Error(
            `Error! status: ${response.status} . Please try again later.`,
          );
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return { movies, isLoading, error };
};

export default useMovieFetch;
