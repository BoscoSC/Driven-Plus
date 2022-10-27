import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyle from "./global";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
