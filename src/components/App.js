import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

import ManagementTabs from "./Management";

const App = ({ dispatch, todos }) => <ManagementTabs />;

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
