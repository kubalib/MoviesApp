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
  totalResults: number;
}

const useMovieFetch = (query: string, page: number): TypeReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const API_KEY = import.meta.env.VITE_API_KEY;
      try {
        // console.log("Запрос:", query, "Страница:", page);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
        );

        if (!response.ok) {
          throw new Error(
            `Error! status: ${response.status} . Please try again later.`,
          );
        }

        const data = await response.json();
        setMovies(data.results);
        setTotalResults(data.total_results);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [query, page]);

  return { movies, isLoading, error, totalResults };
};

export default useMovieFetch;
