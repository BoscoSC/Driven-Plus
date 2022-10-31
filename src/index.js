import ReactDOM from "react-dom";
import App from "./components/App";
import { ContextProvider } from "./context/Context";

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.querySelector(".root")
);
