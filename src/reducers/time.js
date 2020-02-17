const time = (state, action) => {
  switch (action.type) {
    case "TOMORROW":
      const tomorrow = new Date(state);
      tomorrow.setDate(state.getDate() + 1);
      return tomorrow;
    default:
      return state || new Date(1928, 1, 1);
  }
};

export default time;
