const missions = (state = { summary: [] }, action) => {
  switch (action.type) {
    case "CLEAR_SUMMARY":
      return { ...state, summary: [] };
    case "ADD_TO_SUMMARY":
      return { ...state, summary: [...state.summary, action.payload] };
    default:
      return state;
  }
};

export default missions;
