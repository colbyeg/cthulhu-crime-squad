import React, { useState } from "react";
import {
  makeStyles,
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Modal
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

const getModalStyle = () => {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const ManagementTabs = ({ dispatch, money, time, knowledge, summary }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(3);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleBasesButtonClick = () => {
    dispatch(confirmMissions());
    handleOpen();
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
            onClick={handleBasesButtonClick}
          >
            Confirm Missions and Advance
          </Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">Summary of {time.toDateString()} </h2>
              {summary.map(sentence => (
                <li key={sentence}>{sentence}</li>
              ))}
            </div>
          </Modal>
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

const mapStateToProps = ({
  cultResources: { money },
  missions: { summary },
  time,
  knowledge
}) => ({
  money,
  summary,
  time,
  knowledge
});

export default connect(mapStateToProps)(ManagementTabs);
