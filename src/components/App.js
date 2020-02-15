import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  Grid
} from "@material-ui/core";
import ManagementTabs from "./Management";

const App = ({ dispatch, todos }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return <ManagementTabs />;
};

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
