const knowledge = (state = 0, action) => {
  switch (action.type) {
    case "GAIN_KNOWLEDGE":
      return state + action.payload;

    default:
      return state;
  }
};

export default knowledge;
