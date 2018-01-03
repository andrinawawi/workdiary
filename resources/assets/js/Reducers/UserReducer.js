import {
  CHANGE_MAINPAGE,
  SHOW_USERS,
  UPDATE_USERS
} from '../Actions/types';

// This is only slice of whole app state, related to this reducer.....
const INITIAL_STATE = {
  users: [],
  reload: true
};

export default ( state=INITIAL_STATE, action ) => {
  switch (action.type) {
    case CHANGE_MAINPAGE:
	   console.log("This is change main page in User Reducer, required to SET reload prop only");
       return { ...state, reload: !!action.reload }

    case SHOW_USERS:
	// this will reset reload props to false....
       return { ...state, users: action.users, reload: !!action.reload }

    case UPDATE_USERS:
	// this will reset reload props to input....
       return { ...state, reload: !!action.reload }

    default:
      /*
      We will just return the state. Return the initial state when nothing changes
      hence no re-rendering.
      */
      return state
  }
};
