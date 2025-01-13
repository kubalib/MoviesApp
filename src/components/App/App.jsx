import React, { useState, useEffect } from "react";
import { Alert } from "antd";

import MovieList from "../MovieList";

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  if (!isOnline) {
    return (
      <Alert
        message="Сеть недоступна. Проверьте подключение."
        type="warning"
        showIcon
      />
    );
  }

  return (
    <div className="movies">
      <MovieList />
    </div>
  );
};

export default App;
