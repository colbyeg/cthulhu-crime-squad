import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#cecece"
    },
    secondary: {
      main: "#8c1119"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#303030"
    }
  },
  typography: {
    fontFamily: ["Roboto Mono", "monospace"]
  }
});

export default theme;
