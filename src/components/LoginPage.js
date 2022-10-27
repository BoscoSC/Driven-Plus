import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/sign-up");
  };

  return (
    <Page>
      <Logo src={logo} alt="" />
      <FormWrapper>
        <Input required type="email" placeholder="E-mail" />
        <Input required type="password" placeholder="Senha" />
        <Button>ENTRAR</Button>
        <GoToRegister onClick={navigateToRegister}>
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
  width: 70%;
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
  width: 70%;
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
