import { LOAD_USER, LOAD_PLAYINGUSER } from "./../actionTypes";
var initialUsers = { user: [], PlayingUser: [] };

var userReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case LOAD_USER: {
      return { ...state, user: action.Users };
    }
    case LOAD_PLAYINGUSER: {
      return { ...state, PlayingUser: action.Users };
    }
    default:
      return state;
  }
};
export default userReducer;
