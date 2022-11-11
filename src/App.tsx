import { Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import Main from "./pages/Main";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";

import "./scss/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
