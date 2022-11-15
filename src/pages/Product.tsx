import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Pizza } from "../redux/pizzas/types";

const Product: React.FC = () => {
  const [currentPizza, setCurrentPizza] = React.useState<Pizza>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchCurrentPizza(id); // eslint-disable-next-line
  }, []);

  const fetchCurrentPizza = async (pizzaId: string | undefined) => {
    if (id) {
      const url = `https://63613cd267d3b7a0a6c1cb49.mockapi.io/items/${pizzaId}`;

      try {
        const { data } = await axios.get<Pizza>(url);
        setCurrentPizza(data);
      } catch (error) {
        alert(
          "Такой пиццы нет в магазине. Вы будете перенаправлены на главную страницу"
        );
        navigate("/");
      }
    }
  };

  if (!currentPizza) {
    return <>Загрузка...</>;
  }

  const { imageUrl, price, title } = currentPizza;

  return (
    <div className="container">
      <img src={imageUrl} alt="" />
      <h2>{title}</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus maiores
        saepe nobis optio deserunt iure voluptatum, eveniet dolorum, ea, tempora
        voluptate porro facere labore vitae tempore. Eligendi corporis maiores
        consequuntur!
      </p>
      <h4>{price} ₽</h4>
    </div>
  );
};

export default Product;
