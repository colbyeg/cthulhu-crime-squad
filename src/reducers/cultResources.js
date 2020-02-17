const cultResources = (state = { money: 0 }, action) => {
  switch (action.type) {
    case "ADD_MONEY":
      return {
        ...state,
        money: state.money + action.payload
      };

    default:
      return state;
  }
};

export default cultResources;
