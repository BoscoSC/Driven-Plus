import { useContext } from "react";
import { ContextApp } from "./Context";

const useApp = () => {
  const context = useContext(ContextApp);

  return context;
}

export default useApp;
