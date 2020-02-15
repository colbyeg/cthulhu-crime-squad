import React, { useState } from "react";
import {
  makeStyles,
  Drawer,
  CssBaseline,
  Typography,
  List,
  ListItem,
  ListItemText
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
  }
}));

export default function CultistsDrawer() {
  const classes = useStyles();

  const cultists = [{ name: "Evan" }, { name: "Colby" }];

  const [selectedCultist, setSelectedCultist] = useState(0);

  const CultistPane = props => <Typography>Name: {props.name}</Typography>;

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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <CultistPane name={cultists[selectedCultist].name} />
      </main>
    </div>
  );
}
