import React, { createContext, useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
}

export const GenresContext = createContext<Genre[]>([]);

export const GenresProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const API_KEY = import.meta.env.VITE_API_KEY;

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
        );
        const data = await res.json();
        //   console.log(data);
        setGenres(data.genres);
      } catch (error) {
        console.error("Ошибка загрузки жанров", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  );
};
