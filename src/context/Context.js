import { createContext } from "react";
import { useState } from "react";

export const ContextApp = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [perks, setPerks] = useState([]);
  const [optionSelected, setOptionSelected] = useState({});

  return (
    <ContextApp.Provider
      value={{
        token,
        setToken,
        name,
        setName,
        optionSelected,
        setOptionSelected,
        perks,
        setPerks,
        image,
        setImage,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
