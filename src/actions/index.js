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
export const clearSummary = () => ({
  type: "CLEAR_SUMMARY"
});
export const addToSummary = newSummary => ({
  type: "ADD_TO_SUMMARY",
  payload: newSummary
});

export const doJob = cultist => {
  return dispatch => {
    dispatch(addMoney(cultist.stats.INT * 10));
    dispatch(
      addToSummary(
        `${cultist.name} worked today and gained $${cultist.stats.INT *
          10} for the cult.`
      )
    );
  };
};

export const research = cultist => {
  return dispatch => {
    const insight = cultist.stats.INT * 2;
    dispatch(gainKnowledge(insight));
    dispatch(loseSanity(cultist, insight));
    dispatch(
      addToSummary(
        `${cultist.name} gained ${insight} knowledge for the cult, but lost ${insight} sanity.`
      )
    );
  };
};
export const buyArtifact = cultist => {
  return (dispatch, getState) => {
    const cost = 50 - cultist.stats.WILL * 2;
    if (cost <= getState().cultResources.money) {
      dispatch(gainKnowledge(50));
      dispatch(addMoney(cost * -1));
      dispatch(
        addToSummary(
          `${cultist.name} bought an artifact and spent $${cost}. The cult gained 50 profane knowledge.`
        )
      );
    } else {
      dispatch(
        addToSummary(
          `${cultist.name} tried to buy an artifact but was too broke. Maybe next time!`
        )
      );
    }
  };
};

export const confirmMissions = () => {
  return (dispatch, getState) => {
    dispatch(clearSummary());
    getState().cultists.forEach(cultist => {
      switch (cultist.task) {
        case "DO_JOB":
          dispatch(doJob(cultist));
          break;
        case "RESEARCH":
          dispatch(research(cultist));
          break;
        case "BUY_ARTIFACT":
          dispatch(buyArtifact(cultist));
          console.log("dispatched artifact");
          break;
        default:
          break;
      }
    });
    dispatch(tomorrow());
  };
};
