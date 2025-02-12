import React from "react";
import { format } from "date-fns";

import styles from "./MovieCard.module.css";
import noPoster from "./no-poster-available-737x1024.jpg";

interface MovieCardProps {
  img: string | null;
  title: string;
  date?: string;
  genres?: number[];
  descr?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  img,
  title,
  date,
  genres = ["Action", "Drama"],
  descr,
}) => {
  const genre = genres.map((genre, index) => {
    return (
      <div key={genre} className={styles.genre}>
        {genre}
      </div>
    );
  });

  const trimString = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      const lastIndexBeforeSpace = text.lastIndexOf(" ", maxLength);
      return (
        text.slice(
          0,
          lastIndexBeforeSpace > 0 ? lastIndexBeforeSpace : maxLength,
        ) + "..."
      );
    }
    return text;
  };

  return (
    <div className={styles.item}>
      <img
        className={styles.image}
        src={img ? `https://image.tmdb.org/t/p/w500/${img}` : noPoster}
        alt={title}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.releaseDate}>
          {date ? format(new Date(date), "MMMM d, yyyy") : "Date unknown"}
        </p>
        <div className={styles.genres}>{genre}</div>
        <div className={styles.descr}>
          {descr ? trimString(descr, 185) : "Description not available"}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
