import React, { useContext } from "react";
import { format } from "date-fns";
import { Rate } from "antd";

import styles from "./MovieCard.module.css";
import noPoster from "./no-poster-available-737x1024.jpg";

import { Movie } from "../../hooks/useMoviesFetch";
import { GenresContext } from "../../context/GenresContext";

type MovieCardProps = Movie & {
  setError: (error: string | null) => void;
  isRated?: boolean;
};

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  poster_path,
  title,
  release_date,
  genre_ids = [],
  overview,
  rating,
  setError,
  isRated,
}) => {
  const genres = useContext(GenresContext);

  const genreNames = genre_ids.map((genreId) => {
    const genre = genres.find((g) => g.id === genreId)?.name;
    return genre ? (
      <div key={genre} className={styles.genre}>
        {genre}
      </div>
    ) : null;
  });

  const trimString = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      const lastIndexBeforeSpace = text.lastIndexOf(" ", maxLength);
      return (
        text.slice(
          0,
          lastIndexBeforeSpace > -1 ? lastIndexBeforeSpace : maxLength,
        ) + "..."
      );
    }
    return text;
  };

  const onRateMovie = async (value: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/rating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({ value: value }),
        },
      );

      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const getColorRating = (rating: number): string => {
    if (rating >= 7) return "#66E900";
    if (rating >= 5) return "#E9D100";
    if (rating >= 3) return "#E97E00";
    return "#E90000";
  };

  return (
    <div className={styles.item}>
      <div>
        <img
          className={styles.image}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : noPoster
          }
          alt={title}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{title}</h1>
          {isRated && (
            <div
              className={styles.ratingBlock}
              style={{ borderColor: getColorRating(rating) }}
            >
              {rating}
            </div>
          )}
        </div>

        <p className={styles.releaseDate}>
          {release_date
            ? format(new Date(release_date), "MMMM d, yyyy")
            : "Date unknown"}
        </p>
        <div className={styles.genres}>
          {genreNames.length > 0 ? (
            genreNames
          ) : (
            <div className={styles.genre}> unknown</div>
          )}
        </div>
        <div className={styles.descr}>
          {overview ? trimString(overview, 185) : "Description not available"}
        </div>
        <div>
          <Rate
            className={styles.rate}
            count={10}
            allowHalf
            value={rating}
            onChange={onRateMovie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
