import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

const App = ({ dispatch, todos }) => {
  const [input, setInput] = useState("");

  return (
    <>
      <Grid
        justify="center"
        direction="column"
        alignItems="center"
        container
        spacing={3}
      >
        <Grid item xs={6}>
          <Typography variant="h1" color="textPrimary">
            Add a todo
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!input) {
                return;
              }
              dispatch(addTodo(input));
              setInput("");
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Todo goes here!"
                  value={input}
                  variant="outlined"
                  onChange={e => setInput(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" type="submit">
                  Add Todo
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <List>
            {todos.map(todo => (
              <ListItem key="todo.text">
                <Checkbox edge="start" tabIndex={-1} disableRipple />
                {todo.text}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
