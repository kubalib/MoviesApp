import React, { useState, useEffect } from "react";
import { Alert, Input } from "antd";
import { debounce } from "lodash";
import MovieList from "../MovieList";

import styles from "./App.module.css";

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentpage, setCurrentPage] = useState(1);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(true);
    const updateOfflineStatus = () => setIsOnline(false);

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOfflineStatus);
    //добавление очистки - обязатлеьно удалить слушатели
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOfflineStatus);
    };
  }, []);

  const debouncedSearch = debounce((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 1500);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className={styles.movies}>
      {!isOnline && (
        <Alert
          className={styles.alert}
          message="Нет интернет соединения."
          description="Проверьте подключение и повторите попытку."
          type="error"
          showIcon
        />
      )}
      <Input
        className={styles.searchInput}
        placeholder="Type to search..."
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      <MovieList
        searchQuery={searchQuery}
        currentPage={currentpage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
