import React from "react";
import { connect } from "react-redux";
import tasks from "../../../content/tasks";
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { setTask } from "../../../actions";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  table: {
    minWidth: 650
  }
}));
const CultistInfoPane = ({
  name,
  stats,
  task,
  occupation,
  picture,
  dispatch
}) => {
  const classes = useStyles();
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <Box paddingTop="32px">
        <Grid container direction="row" spacing={3} justify="space-between">
          <Grid item>
            <Typography variant="h3" component="h3">
              {name}
            </Typography>
            <Typography variant="h6" component="h6" gutterBottom>
              {occupation}
            </Typography>
            <Typography variant="h6" component="h6" gutterBottom>
              Current Task: {task}
            </Typography>
          </Grid>
          <Grid item>
            <img alt="" src={picture + "128x128.png"} />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={3} justify="space-between">
          <Grid item>
            <Typography variant="h5" component="h5" gutterBottom>
              Stats:
            </Typography>
            {Object.entries(stats).map(([key, value]) => (
              <li key={key}>{key + ": " + value}</li>
            ))}
          </Grid>
          {/* mission tasks go here */}
          <Grid item>
            <Typography variant="h5" component="h5" gutterBottom>
              Missions:
            </Typography>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="mission"
                name="mission"
                value={task}
                onChange={({ target: { value } }) =>
                  dispatch(setTask(name, value))
                }
              >
                {tasks.map(({ name, key }) => (
                  <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio color="primary" />}
                    label={name}
                    labelPlacement="start"
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default connect()(CultistInfoPane);
