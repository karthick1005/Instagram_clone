import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Pages/Component/Sidebar/sidebar.jsx";
import { ToastContainer } from "react-toastify";
const style = {
  global: (props) => ({
    body: {
      bg: mode("black", "#000000")(props),
      color: mode("white", "white")(props),
    },
  }),
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, style });
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      {/* <ChakraProvider theme={t heme}> */}

      <App />
      {/* </ChakraProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
