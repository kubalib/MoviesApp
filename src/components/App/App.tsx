import React, { useState, useEffect } from "react";
import { Alert } from "antd";
import MovieList from "../MovieList";

import styles from "./App.module.css";

const App = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

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
      <MovieList />
    </div>
  );
};

export default App;
