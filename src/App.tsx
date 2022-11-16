import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import Main from "./pages/Main";
import { LoadingPage } from "./components";

import "./scss/app.scss";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart"*/ "./pages/Cart")
);
const Product = React.lazy(
  () => import(/* webpackChunkName: "Product"*/ "./pages/Product")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound"*/ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Product />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingPage />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
