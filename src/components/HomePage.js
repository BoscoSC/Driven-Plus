import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { FaUserCircle } from "react-icons/fa";

import useApp from "../context/useApp";

export default function HomePage() {
  const navigate = useNavigate();
  const { token, name, image, perks } = useApp();

  function deletePlan(e) {
    e.preventDefault();

    const URL =
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.delete(URL, config);

    promise.then(() => {
      navigate("/subscriptions");
    });
  }

  return (
    <Page>
      <FaUserCircle />
      <img src={image} alt="" />

      <Top>Olá, {name}</Top>

      <Content>
        {perks.map((item, index) => (
          <Button key={index} href={item.link}>
            {item.title}
          </Button>
        ))}
      </Content>

      <Bottom>
        <ChangeButton onClick={() => navigate("/subscriptions")}>
          Mudar plano
        </ChangeButton>
        <CancelButton onClick={deletePlan}>Cancelar plano</CancelButton>
      </Bottom>
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
  justify-content: flex-start;
  position: relative;

  img {
    position: absolute;
    top: 40px;
    left: 40px;
    width: 100px;
  }

  svg {
    position: absolute;
    top: 25px;
    right: 25px;
    color: #ffffff;
    font-size: 40px;
  }
`;

const Top = styled.h1`
  margin: 100px 0 60px 0;
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Bottom = styled.div`
  width: 100%;
  position: fixed;
  bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Button = styled.a`
  cursor: pointer;
  width: 80%;
  background: #ff4791;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChangeButton = styled.button`
  cursor: pointer;
  width: 80%;
  background: #ff4791;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  height: 52px;
  text-align: center;
`;

const CancelButton = styled.button`
  cursor: pointer;
  width: 80%;
  background: #ff4747;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  height: 52px;
  text-align: center;
`;
