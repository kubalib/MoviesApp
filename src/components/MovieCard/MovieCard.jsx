import React from "react";
import { format } from "date-fns";
// import { Spin } from "antd";

import noPoster from "./no-poster-available-737x1024.jpg";

const MovieCard = ({
  img,
  title,
  date,
  genres = ["Action", "Drama"],
  descr,
}) => {
  const genre = genres.map((genre, index) => {
    return (
      <div key={index} className="movies__genre">
        {genre}
      </div>
    );
  });

  const trimString = (text) => {
    if (text.length > 185) {
      const lastIndexBeforeSpace = text.lastIndexOf(" ", 185);
      return text.slice(0, lastIndexBeforeSpace) + "...";
    }
    return text;
  };

  return (
    <div className="movies__item">
      <img
        className="movies__img"
        src={img ? `https://image.tmdb.org/t/p/w500/${img}` : noPoster}
        alt={title}
      />
      <div className="movies__content">
        <h1 className="movies__title">{title || "Title not available"}</h1>
        <p className="movies__releaseDate">
          {date ? format(new Date(date), "MMMM d, yyyy") : "Date unknown"}
        </p>
        <div className="movies__genres">{genre}</div>
        <div className="movies__descr">
          {descr ? trimString(descr) : "Description not available"}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
