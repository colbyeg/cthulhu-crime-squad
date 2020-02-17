import React from "react";
import { connect } from "react-redux";

import ManagementTabs from "./management";

const App = ({ dispatch, todos }) => <ManagementTabs />;

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
