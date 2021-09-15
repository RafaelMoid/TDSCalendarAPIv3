import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./global.scss";
import App from "./App";
import { AuthProvider } from "./components/providers/auth";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <ChakraProvider resetCSS={false}>
          <App> 
            <script  src="https://apis.google.com/js/api.js"></script>
          </App>
        </ChakraProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
