import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaMoneyBillWave } from "react-icons/fa";

import useApp from "../context/useApp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function SubscriptionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    token,
    optionSelected,
    setOptionSelected,
    perks,
    setPerks,
    image,
    setImage,
  } = useApp();
  const { name, price } = optionSelected;
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(URL, config);

    promise.then((answer) => {
      console.log(answer.data);
      setOptionSelected(answer.data);
      setPerks(answer.data.perks);
      setImage(answer.data.image);
    });
  }, []);

  function singPlan(e) {
    e.preventDefault();

    const URL =
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions";
    // const body = {
    //   membershipId: id,
    //   cardName: cardName,
    //   cardNumber: cardNumber,
    //   securityNumber: securityNumber,
    //   expirationDate: expirationDate,
    // };
    const body = {
      membershipId: id,
      cardName: cardName,
      cardNumber: cardNumber,
      securityNumber: 123,
      expirationDate: expirationDate,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.post(URL, body, config);

    promise.then(() => {
      navigate("/home");
    });

    promise.cath((err) => {
      console.log(err.response.data.message);
    });
  }

  return (
    <Page>
      <GoBack>
        <FaArrowLeft onClick={() => navigate("/subscriptions")} />
      </GoBack>
      <Membership>
        <img src={image} alt="" />
        <h1>{name}</h1>
      </Membership>

      <MembershipSummary>
        <div>
          <HiOutlineClipboardList />
          <h2>Benefícios: </h2>
        </div>

        {perks.map((item, index) => (
          <p key={index}>
            {index + 1}. {item.title}
          </p>
        ))}

        <div>
          <FaMoneyBillWave />
          <h2>Preco: </h2>
        </div>

        <p>R$ {price} cobrados mensalmente</p>
      </MembershipSummary>

      <Forms>
        <Input
          required
          type="text"
          placeholder="Nome impresso no cartão"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />

        <Input
          required
          type="text"
          placeholder="Digitos do cartão"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <InputWrapper>
          <Input
            required
            type="number"
            placeholder="Código de segurança"
            value={securityNumber}
            onChange={(e) => setSecurityNumber(e.target.value)}
          />

          <Input
            required
            type="text"
            placeholder="Validade"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </InputWrapper>

        <Button onClick={handleOpen}>ASSINAR</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Tem certeza que deseja assinar o plano Driven Plus (R$ {price})?
            </Typography>
            <WrapperButtons>
              <Cancel onClick={handleClose}>Não</Cancel>
              <Confirm onClick={singPlan}>SIM</Confirm>
            </WrapperButtons>
          </Box>
        </Modal>
      </Forms>
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
  position: relative;
`;

const GoBack = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;

  svg {
    cursor: pointer;
    font-size: 32px;
    color: #ffffff;
  }
`;

const Membership = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h1 {
    font-weight: 700;
    font-size: 32px;
    color: #ffffff;
  }
`;

const MembershipSummary = styled.div`
  width: 70%;

  div {
    display: flex;
    align-items: center;
    gap: 5px;
    line-height: 40px;
  }

  h2 {
    font-size: 16px;
    color: #ffffff;
  }

  p {
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }

  svg {
    font-size: 20px;
    color: #ff4791;
  }
`;

const Forms = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  input {
    width: calc(40% - 5px);
  }
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

const WrapperButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 16px;
`;

const Cancel = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #ffffff;
  width: 95px;
  height: 52px;
  background: #cecece;
  border-radius: 8px;
`;

const Confirm = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #ffffff;
  width: 95px;
  height: 52px;
  background: #ff4791;
  border-radius: 8px;
  font-weight: 700;
`;
