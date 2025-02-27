import React from "react";
import MovieCard from "../MovieCard";
import useMovieFetch from "../../hooks/useMoviesFetch";
import { Spin, Alert, Pagination } from "antd";

import styles from "./MovieList.module.css";
import { TabsEnum } from "../App/App";

interface MovieListProp {
  searchQuery: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isRated?: boolean;
  currentTab: TabsEnum;
}

const MovieList: React.FC<MovieListProp> = ({
  searchQuery,
  currentPage,
  setCurrentPage,
  currentTab,
}) => {
  const { movies, isLoading, error, setError, totalResults } = useMovieFetch(
    searchQuery || "world",
    currentPage,
    currentTab,
  );

  if (isLoading) {
    return <Spin tip="Loading movies..." fullscreen />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  if (!movies.length) {
    return (
      <Alert
        className={styles.alert}
        message="По вашему запросу результаты не найдены"
        type="info"
        showIcon
      />
    );
  }

  return (
    <>
      <div className={styles.list}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} setError={setError} />
        ))}
      </div>
      <Pagination
        className={styles.pagination}
        current={currentPage}
        total={totalResults}
        pageSize={20}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
      />
    </>
  );
};

export default MovieList;
