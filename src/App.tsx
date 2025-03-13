import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import RegisterForm from "./components/Auth/RegisterForm";
import ProductForm from "./components/Products/ProductForm";
import ProductList from "./components/Products/ProductList";
import Home from "./components/Home/Home";
import LoginForm from "./components/Auth/LoginForm";
import Cart from "./components/cart/Cart";
import Profile from "./components/User/Profile";
import Navbar from "./components/Layout/Navbar";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthModal from "./components/Auth/AuthModal";

const App = () => {
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const openModal = (type: "login" | "register" | null) => setAuthModal(type);
  const closeModal = () => setAuthModal(null);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <LoginForm switchAuthModal={openModal} onClose={closeModal} />
              }
            />
            <Route
              path="/register"
              element={<RegisterForm onClose={closeModal} />}
            />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <ToastContainer />
          <AuthModal
            type={authModal ?? "login"} 
            open={!!authModal} 
            onClose={closeModal}
            switchAuthModal={openModal}
          />
        </>
      </Router>
    </Provider>
  );
};

export default App;
