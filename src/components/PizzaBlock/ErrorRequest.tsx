import React from "react";

export const ErrorRequest: React.FC = () => {
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
