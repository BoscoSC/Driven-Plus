import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import useApp from "../context/useApp";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const { setToken, setName } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [membership, setMembership] = useState("");
  const navigate = useNavigate();

  function loginUser(event) {
    event.preventDefault();

    const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login";
    const body = {
      email: email,
      password: password,
    };

    const promise = axios.post(URL, body);

    promise.then((answer) => {
      localStorage.setItem("token", answer.data.token);
      setToken(answer.data.token);
      setName(answer.data.name);
      setMembership(answer.data.membership);
      if (membership !== null) {
        navigate("/subscriptions")();
      } else {
        navigate("/home")();
      }
    });

    promise.catch((error) => {
      alert(error.response.data.message);
    });
  }

  return (
    <Page>
      <Logo src={logo} alt="" />
      <FormWrapper onSubmit={loginUser}>
        <Input
          required
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">ENTRAR</Button>
        <GoToRegister onClick={() => navigate("/sign-up")}>
          Não possuí uma conta? Cadastre-se
        </GoToRegister>
      </FormWrapper>
    </Page>
  );
}

const Page = styled.div`
  background: #0e0e13;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Logo = styled.img``;

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Input = styled.input`
  background: #ffffff;
  width: 80%;
  height: 55px;
  padding: 18px 15px;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 14px;

  ::placeholder {
    color: #7e7e7e;
    font-size: 14px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  background: #ff4791;
  color: #ffffff;
  width: 80%;
  height: 55px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
`;

const GoToRegister = styled.p`
  cursor: pointer;
  color: #ffffff;
  font-size: 14px;
  text-decoration: underline;
`;
