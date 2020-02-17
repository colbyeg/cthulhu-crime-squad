import React, { useState } from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import CultistInfoPane from "./CultistInfoPane";
import tasks from "../../../content/tasks";

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

const CultistTable = ({ cultists }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cultist Name</TableCell>
            <TableCell>Task</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cultists.map(cultist => (
            <TableRow key={cultist.name}>
              <TableCell component="th" scope="row">
                {cultist.name}
              </TableCell>
              <TableCell>{tasks[cultist.task].name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CultistsDrawer = ({ cultists }) => {
  const classes = useStyles();

  const [selectedCultist, setSelectedCultist] = useState(0);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Your Cult:
            </ListSubheader>
          }
        >
          {cultists.map((c, i) => (
            <ListItem key={c.name} onClick={() => setSelectedCultist(i)} button>
              <ListItemText primary={c.name} />
              <img alt="" src={c.picture + "32x32.png"} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <CultistInfoPane {...cultists[selectedCultist]} />
      <Drawer variant="permanent" anchor="bottom">
        <CultistTable cultists={cultists} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = ({ cultists }) => ({
  cultists
});

export default connect(mapStateToProps)(CultistsDrawer);
