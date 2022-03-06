import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "styles";
import reportWebVitals from "./reportWebVitals";
import { theme } from "styles";
import "@fontsource/roboto";

import App from "containers/App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
