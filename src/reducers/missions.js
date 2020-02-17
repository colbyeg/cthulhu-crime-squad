const missions = (state, action) => {
  switch (action.type) {
    case "TASK":
      const tomorrow = new Date(state);
      tomorrow.setDate(state.getDate() + 1);
      return tomorrow;
    default:
      return state;
  }
};

export default missions;
