import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import GlobalStyle from "./global";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import SubscriptionsPage from "./SubscriptionsPage";
import SubscriptionPage from "./SubscriptionPage";
import HomePage from "./HomePage";

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");

    if (tokenLocalStorage) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/subscriptions/:id" element={<SubscriptionPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
