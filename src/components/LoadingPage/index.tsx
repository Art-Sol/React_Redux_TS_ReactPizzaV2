import React from "react";

import styles from "./LoadingPage.module.scss";

export const LoadingPage: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.header}>
        <h1>Переходим на стрницу...</h1>
        <p className={styles.description}>Страница уже вот вот отобразится</p>
      </div>
    </div>
  );
};
