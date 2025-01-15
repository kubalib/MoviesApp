import { useState, useEffect } from "react";

interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
  overview: string;
  genres: number[];
}

interface TypeReturn {
  // структуру возвращаемых данных из хука
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
}

const useMovieFetch = (query: string): TypeReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return { movies, isLoading, error };
};

export default useMovieFetch;
