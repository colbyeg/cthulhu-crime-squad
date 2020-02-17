export const addMoney = payload => ({
  type: "ADD_MONEY",
  payload
});

export const tomorrow = () => ({
  type: "TOMORROW"
});

export const gainKnowledge = payload => ({
  type: "GAIN_KNOWLEDGE",
  payload
});

export const setTask = (name, task) => ({
  type: "SET_TASK",
  name,
  task
});

export const loseSanity = (cultist, sanity) => ({
  type: "LOSE_SANITY",
  cultist,
  sanity
});

export const doJob = cultist => {
  return dispatch => {
    dispatch(addMoney(cultist.stats.INT * 10));
  };
};

export const research = cultist => {
  return dispatch => {
    const insight = cultist.stats.INT * 2;
    dispatch(gainKnowledge(insight));
    dispatch(loseSanity(cultist, insight));
  };
};

export const confirmMissions = () => {
  return (dispatch, getState) => {
    getState().cultists.forEach(cultist => {
      switch (cultist.task) {
        case "DO_JOB":
          dispatch(doJob(cultist));
          break;
        case "RESEARCH":
          dispatch(research(cultist));
          break;
        default:
          break;
      }
    });
    dispatch(tomorrow());
  };
};
