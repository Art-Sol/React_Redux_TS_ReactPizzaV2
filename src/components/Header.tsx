import React from "react";
import { Link, useLocation } from "react-router-dom";

import Search from "./Search";
import HeaderCartButton from "./HeaderCartButton";

import logoSvg from "../assets/img/pizza-logo.svg";

const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {pathname === "/cart" ? null : <Search />}
        {pathname === "/cart" ? null : <HeaderCartButton />}
      </div>
    </div>
  );
};

export default Header;
