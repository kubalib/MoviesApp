import { useState, useEffect } from "react";
import { TabsEnum } from "../components/App/App";

export interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
  overview: string;
  genre_ids?: number[];
  rating: number;
  vote_average: number;
}

interface TypeReturn {
  // структуру возвращаемых данных из хука
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  setError: (error: string | null) => void;
}

const useMovieFetch = (
  query: string,
  page: number,
  currentTab: TabsEnum,
): TypeReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const API_KEY = import.meta.env.VITE_API_KEY;
      let url = `https://api.themoviedb.org/3/`;

      if (currentTab === TabsEnum.RATED) {
        const guestSessionId = localStorage.getItem("guest_session_id");
        if (guestSessionId) {
          url += `guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}`;
        } else {
          setError("Не удалось получить информацию о сессии.");
          return;
        }
      } else {
        url += `search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
      }

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });

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
  }, [query, page, currentTab]);

  return { movies, isLoading, error, setError, totalResults };
};

export default useMovieFetch;
