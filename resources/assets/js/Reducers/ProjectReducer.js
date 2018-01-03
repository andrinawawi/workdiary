import {
  CHANGE_MAINPAGE,
  SHOW_PROJECTS,
  UPDATE_PROJECTS
} from '../Actions/types';

// This is only slice of whole app state, related to this reducer.....
const INITIAL_STATE = {
  projects: [],
  users: [],
  reload: true
};

export default ( state=INITIAL_STATE, action ) => {
  switch (action.type) {
    case CHANGE_MAINPAGE:
	   console.log("This is change main page in Project Reducer, required for reload prop only");
//     	console.log(state);
       return { ...state, reload: !!action.reload }

    case UPDATE_PROJECTS:
	   console.log("This is for project listing in Project Reducer");
//     	console.log(state);
       return { ...state, reload: !!action.reload }

    case SHOW_PROJECTS:
	// this will reset reload props to false....
       return { ...state, projects: action.projects, users: action.users,
       		reload: !!action.reload }

    default:
      /*
      We will just return the state. Return the initial state when nothing changes
      hence no re-rendering.
      */
      return state
  }
};
