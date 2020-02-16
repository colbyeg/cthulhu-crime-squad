import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  Drawer,
  CssBaseline,
  Typography,
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
  Paper,
  Box,
  Avatar
} from "@material-ui/core";

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

export default function CultistsDrawer() {
  const classes = useStyles();

  const cultists = [
    {
      name: "Evan",
      stats: ["STR: 8", "INT: 10", "DEX: 5", "WILL: 1", "WORTHINESS: 7"],
      task: "Sacrificing",
      occupation: "Con man",
      picture: "demonghost"
    },
    {
      name: "Colby",
      stats: ["STR: 2", "INT: 7", "DEX: 2", "WILL: 8", "WORTHINESS: 3"],
      task: "Researching",
      occupation: "Museum Assistant",
      picture: "cultist"
    }
  ];

  const [selectedCultist, setSelectedCultist] = useState(0);

  const CultistPane = ({ name, stats, task, occupation, picture }) => {
    return (
      <div style={{ width: "100%", minHeight: "100vh" }}>
        <Box border paddingTop="32px">
          <Grid container direction="row" spacing={3} justify="space-between">
            <Grid item>
              <Typography variant="h3" component="h3">
                {name}
              </Typography>
              <Typography variant="h6" component="h6" gutterBottom>
                {occupation}
              </Typography>
              <Typography variant="h7" component="h7" gutterBottom>
                Current Task: {task}
              </Typography>
            </Grid>
            <Grid item>
              <img src={picture + "128x128.png"} />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={3} justify="space-between">
            <Grid item>
              <Typography variant="h5" component="h5" gutterBottom>
                Stats:
              </Typography>
              {stats.map(stat => (
                <li key={stat}>{stat}</li>
              ))}
            </Grid>
            {/* mission tasks go here */}
            <Grid item>
              <Typography variant="h5" component="h5" gutterBottom>
                Missions:
              </Typography>
              {stats.map(stat => (
                <li key={stat}>{stat}</li>
              ))}
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  };

  const CultistTable = ({ cultists }) => (
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
              <TableCell>{cultist.task}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

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
              <img src={c.picture + "32x32.png"} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <CultistPane {...cultists[selectedCultist]} />
      <Drawer variant="permanent" anchor="bottom">
        <CultistTable cultists={cultists} />
      </Drawer>
    </div>
  );
}
