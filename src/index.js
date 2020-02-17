import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

const store = createStore(
  rootReducer,
  {
    cultResources: { money: 0 },
    time: new Date(1928, 1, 1),
    cultists: [
      {
        name: "Evan",
        stats: { STR: 8, INT: 10, DEX: 5, WILL: 1, WORTHINESS: 7, SAN: 100 },
        task: "DO_JOB",
        occupation: "Con man",
        picture: "demonghost"
      },
      {
        name: "Colby",
        stats: { STR: 2, INT: 7, DEX: 2, WILL: 8, WORTHINESS: 3, SAN: 100 },
        task: "DO_JOB",
        occupation: "Museum Assistant",
        picture: "cultist"
      }
    ],
    knowledge: 0,
    missions: {
      summary: []
    }
  },
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
