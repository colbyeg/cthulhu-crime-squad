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
      return state.map(cultist => {
        if (cultist.name !== action.name) {
          return cultist;
        }
        return { ...cultist, task: action.task };
      });
    //   const cultist = state.filter(cultist => cultist.name === action.name)[0];
    //   return [
    //     ...state.filter(cultist => cultist.name !== action.name),
    //     { ...cultist, task: action.task }
    //   ];
    default:
      return state;
  }
};

export default cultists;
