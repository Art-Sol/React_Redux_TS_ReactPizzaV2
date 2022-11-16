import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Pizza } from "../redux/pizzas/types";

import {
  withLayout,
  PizzaBlockForProductPage,
  SkeletonProduct,
} from "../components";

const Product: React.FC = () => {
  const [currentPizza, setCurrentPizza] = React.useState<Pizza>();
  const { id } = useParams();
  const navigate = useNavigate();

  const PizzaBlockWithProductPageLayout = withLayout(PizzaBlockForProductPage); // using Higher-Order Component (HOC)

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
    return (
      <div className="container">
        <div className="product-pizza">
          <SkeletonProduct />
        </div>
      </div>
    );
  }

  return <PizzaBlockWithProductPageLayout {...currentPizza} />;
};

export default Product;
