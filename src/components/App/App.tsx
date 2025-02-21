import React, { useState, useEffect } from "react";
import { Alert, Input, Tabs } from "antd";
import { debounce } from "lodash";
import MovieList from "../MovieList";
import { GenresProvider } from "../../context/GenresContext";

import styles from "./App.module.css";

const { TabPane } = Tabs;

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentpage, setCurrentPage] = useState(1);
  const [errorSession, setErrorSession] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("search");

  const createGuestSession = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`,
      );
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("guest_session_id", data.guest_session_id);
      } else {
        throw new Error("Не удалось создать гостевую сессию");
      }
    } catch (error) {
      setErrorSession((error as Error).message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("guest_session_id")) {
      createGuestSession();
    }
  }, []);

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

  const debouncedSearch = debounce((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, 1500);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onChangeTab = (key: string) => {
    setCurrentTab(key);
  };

  return (
    <GenresProvider>
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
        {errorSession && (
          <Alert
            className={styles.alert}
            message="Ошибка"
            description={errorSession}
            type="warning"
            showIcon
          />
        )}
        <Tabs
          className={styles.tabs}
          activeKey={currentTab}
          onChange={onChangeTab}
        >
          <TabPane key="search" tab="Search">
            <Input
              className={styles.searchInput}
              placeholder="Type to search..."
              onChange={debouncedSearch}
            />
            <MovieList
              searchQuery={searchQuery}
              currentPage={currentpage}
              setCurrentPage={setCurrentPage}
            />
          </TabPane>
          <TabPane key="rated" tab="Rated">
            <MovieList
              searchQuery=""
              isRated={true}
              currentPage={currentpage}
              setCurrentPage={setCurrentPage}
            />
          </TabPane>
        </Tabs>
      </div>
    </GenresProvider>
  );
};

export default App;
