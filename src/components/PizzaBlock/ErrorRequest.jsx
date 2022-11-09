import React from "react";

const ErrorRequest = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>Данные не подгрузились 😕</h2>
      <p>
        Вероятнее всего, произошел сбой на сервере.
        <br />
        Наши специалисты уже устроняют неисправность. Приносим свои извенения.
      </p>
    </div>
  );
};

export default ErrorRequest;
