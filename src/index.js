/**
 * Created by jacob.mendt@pikobytes.de on 15.03.19.
 *
 * This file is subject to the terms and conditions defined in
 * file "LICENSE.txt", which is part of this source code package.
 */
import React from "react";
import ReactDOM from "react-dom";
import { detect } from "detect-browser";
import "typeface-roboto";
import {MuiThemeProvider} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./theme";
import App from "./App";
import "./index.scss";

// Element Id of the app container. The content of this element is replaced with
// the application rendered content.
const APP_CONTAINER_ID = "root";

// fallback behavior in case the user uses firefox
const browserNameIE = detect().name === "ie";
if (browserNameIE) {
  const containerEl = document.getElementById(APP_CONTAINER_ID);
  const defaultMsg =
    "Haben Sie anschließend immer noch Probleme wenden Sie sich bitte an <a href=\"mailto:info@pikobytes.de\" title=\"Contact Email\">info@pikobytes.de</a>.";
  const customMsg = browserNameIE
    ? "<h2>Fehlende Browser Unterstüzung</h2><div>Die Anwendung unterstützt keinen Internet Explorer. Bitte wechseln Sie zu einem neueren Browser wie Chrome, Firefox, Edge, Opera oder Safari. "
    : "<h2>Fehlende WebGL Unterstüzung</h2><div>Ihr Browser unterstützt kein WebGL. Bitte wechseln Sie zu einer neueren Browser-Version von Chrome, Firefox, Edge, Opera oder Safari. ";
  const msg = document.createElement("h1");
  msg.innerHTML = `<div class="missing-browser-support">${customMsg}${defaultMsg}</div></div>`;
  containerEl.innerHTML = "";
  containerEl.appendChild(msg);
} else {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </MuiThemeProvider>,
    document.getElementById(APP_CONTAINER_ID),
  );
}
