/**
 * Created by jacob.mendt@pikobytes.de on 24.04.19.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { createMuiTheme } from "@material-ui/core/styles";

// For defining better theme colors have a look at:
//
// https://material-ui.com/style/color/
// https://material.io/tools/color/#!/?view.left=0&view.right=1&primary.color=F77439&secondary.color=f4a13b
export const theme = createMuiTheme({
  overrides: {},
  palette: {
    primary: {
      light: "#58a5f0",
      main: "#0277bd",
      dark: "#004c8c",
      contrastText: "#ffffff",
      text: "#ffffff"
    },
    secondary: {
      light: "#efdcd5",
      main: "#bcaaa4",
      dark: "#8c7b75",
      contrastText: "#000000",
      text: "#000000"
    }
  },
  typography: {
    fontSize: 12,
    useNextVariants: true
  }

});
