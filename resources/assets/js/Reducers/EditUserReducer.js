import {
  EDIT_USER, 
  UPDATE_USERS 
} from '../Actions/types';

// This is only slice of whole app state, related to this reducer.....
const INITIAL_STATE = {
  name: '',
  email: ''
};

export default ( state=INITIAL_STATE, action ) => {
  switch (action.type) {
    case EDIT_USER:
       return { ...state,
       	 name: action.name,
       	 email: action.email
       }

    case UPDATE_USERS:
	// this will reset this reducers state to blank....
		console.log("clear  edit user state");
       return INITIAL_STATE;

    default:
      /*
      We will just return the state. Return the initial state when nothing changes
      hence no re-rendering.
      */
      return state
  }
};
