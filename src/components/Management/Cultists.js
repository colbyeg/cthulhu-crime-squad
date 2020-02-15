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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
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

  const cultists = [{ name: "Evan" }, { name: "Colby" }];

  const [selectedCultist, setSelectedCultist] = useState(0);

  const CultistPane = props => <Typography>Name: {props.name}</Typography>;

  const CultistTable = ({ cultists }) => (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cultist Name</TableCell>
            <TableCell align="right">Cultist Task</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cultists.map(cultist => (
            <TableRow key={cultist.name}>
              <TableCell component="th" scope="row">
                {cultist.name}
              </TableCell>
              {/* <TableCell align="right">{cultist.task}</TableCell> */}
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
        <List>
          {cultists.map((c, i) => (
            <ListItem key={c.name} onClick={() => setSelectedCultist(i)} button>
              <ListItemText primary={c.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Grid container spacing={1} direction="column">
        <Grid item>
          {/* <main className={classes.content}>*/}
          <div className={classes.toolbar} />
          <CultistPane name={cultists[selectedCultist].name} />
          {/* </main> */}
        </Grid>
        <Grid item>
          <CultistTable cultists={cultists} />
        </Grid>
      </Grid>
    </div>
  );
}
