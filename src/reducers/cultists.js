const cultists = (state = [], action) => {
  switch (action.type) {
    case "ADD_CULTIST":
      return [...state, action.payload];
    case "LOSE_SANITY":
      return [
        ...state.filter(cultist => cultist.name !== action.cultist.name),
        {
          ...action.cultist,
          stats: {
            ...action.cultist.stats,
            SAN: action.cultist.stats.SAN - action.sanity
          }
        }
      ];
    case "SET_TASK":
      const cultist = state.filter(cultist => cultist.name === action.name)[0];
      return [
        ...state.filter(cultist => cultist.name !== action.name),
        { ...cultist, task: action.task }
      ];
    default:
      return state;
  }
};

export default cultists;
