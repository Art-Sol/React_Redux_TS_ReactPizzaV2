import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.header}>
      <h1>
        Ничего не найдено... <span>:(</span>
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует в нашем интернет магазине
      </p>
    </div>
  );
};

export default NotFoundBlock;
