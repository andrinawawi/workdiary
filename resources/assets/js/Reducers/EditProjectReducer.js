import {
  EDIT_PROJECT,
  UPDATE_PROJECTS
} from '../Actions/types';

// This is only slice of whole app state, related to this reducer.....
const INITIAL_STATE = {
  name: '',
  description: ''
};

export default ( state=INITIAL_STATE, action ) => {
  switch (action.type) {
    case EDIT_PROJECT:
// 	   console.log("This is Edit Project Reducer ");
       return { ...state, name: action.name, description: action.description}

    case UPDATE_PROJECTS:
	// this will reset this reducers state to blank....required to update renderer next time....
		console.log("clear project edit state");
       return INITIAL_STATE;

    default:
      /*
      We will just return the state. Return the initial state when nothing changes
      hence no re-rendering.
      */
      return state
  }
};
