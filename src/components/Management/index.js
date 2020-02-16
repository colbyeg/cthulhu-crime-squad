import React, { useState } from "react";
import {
  makeStyles,
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography
} from "@material-ui/core";

import CultistsDrawer from "./Cultists";
import Mission from "./Mission";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

export default function ManagementTabs() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Cultists" />
          <Tab label="Bases" />
          <Tab label="Sacrifices" />
          <Tab label="Missions" />
        </Tabs>
      </AppBar>
      <TabPanel value={selectedTab} index={0}>
        <CultistsDrawer />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
        <Mission />
      </TabPanel>
    </div>
  );
}
