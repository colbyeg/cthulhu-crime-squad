import React, { useState } from "react";
import {
  makeStyles,
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";

import CultistsDrawer from "./cultists/Cultists";
import Mission from "./Mission";
import { confirmMissions } from "../../actions";

const TabPanel = ({ children, value, index }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

const ManagementTabs = ({ dispatch, money, time, knowledge }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(3);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Cultists" />
          <Tab label="Bases" />
          <Tab label="Sacrifices" />
          <Tab label="Missions" />
          <Tab disabled label={time.toDateString()} />
          <Tab disabled label={"funds: $" + money} />
          <Tab disabled label={"profane knowledge: " + knowledge} />
        </Tabs>
      </AppBar>
      <TabPanel value={selectedTab} index={0}>
        <CultistsDrawer />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Box paddingTop="32px">
          {/* Hello I am your monies: {money}*/}

          {/*<Button onClick={() => dispatch(addMoney(1))}>
            Click me for monies
          </Button>*/}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(confirmMissions())}
          >
            Confirm Missions and Advance
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
        <Mission />
      </TabPanel>
    </div>
  );
};

const mapStateToProps = ({ cultResources: { money }, time, knowledge }) => ({
  money,
  time,
  knowledge
});

export default connect(mapStateToProps)(ManagementTabs);
