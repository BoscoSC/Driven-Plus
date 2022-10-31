import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useApp from "../context/useApp";

export default function SubscriptionsPage() {
  const navigate = useNavigate();
  const { token } = useApp();
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const URL =
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(URL, config);

    promise.then((answer) => {
      setMemberships(answer.data);
    });
  }, []);

  return (
    <Page>
      <h1>Escolha seu Plano</h1>
      {memberships.map((item) => (
        <Option
          key={item.id}
          onClick={() => navigate(`/subscriptions/${item.id}`)}
        >
          <img src={item.image} alt="" />
          <p>R$ {item.price}</p>
        </Option>
      ))}
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
  padding: 20px 50px;
  box-sizing: border-box;

  h1 {
    font-weight: 700;
    font-size: 32px;
    color: #ffffff;
  }
`;

const Option = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 3px solid #7e7e7e;
  border-radius: 12px;
  height: 180px;
  width: 100%;

  p {
    font-weight: 700;
    font-size: 24px;
    color: #ffffff;
  }
`;
