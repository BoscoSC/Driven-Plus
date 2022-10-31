import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/");
  };

  function registerUser(event) {
    event.preventDefault();

    const URL =
      "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up";
    const body = {
      email: email,
      name: name,
      cpf: cpf,
      password: password,
    };

    const promise = axios.post(URL, body);

    promise.then(() => {
      alert("Cadastrado com sucesso");
      navigateToLogin();
    });

    promise.catch((err) => {
      alert(err.response.data.message);
    });
  }

  return (
    <Page>
      <FormWrapper onSubmit={registerUser}>
        <Input
          required
          type="name"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          required
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
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
        <Button type="submit">CADASTRAR</Button>
        <GoToRegister onClick={navigateToLogin}>
          Já possuí uma conta? Entre
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
