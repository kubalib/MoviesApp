import React from "react";
import MovieCard from "../MovieCard";
import useMovieFetch from "../../hooks/useMoviesFetch";
import { Spin, Alert } from "antd";

import styles from "./MovieList.module.css";

const MovieList = () => {
  const { movies, isLoading, error } = useMovieFetch("return");

  if (isLoading) {
    return <Spin tip="Loading movies..." fullscreen />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className={styles.movies__list}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          img={movie.poster_path}
          title={movie.title}
          date={movie.release_date}
          descr={movie.overview}
        />
      ))}
    </div>
  );
};

export default MovieList;
