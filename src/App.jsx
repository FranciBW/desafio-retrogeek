import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import CartPage from "./pages/CartPage";

import { UserContext } from "./context/UserContext";

export default function App() {
  const { token } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/create"
          element={
            token ? <CreateProductPage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/cart"
          element={token ? <CartPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <Footer />
    </>
  );
}
