import {
  CHANGE_MAINPAGE,
  SHOW_TASKS,
  UPDATE_TASKS,
  SHOW_TASK,
  EDIT_TASK,
  CREATE_TASK,
  DELETE_TASK  
} from '../Actions/types';

// This is only slice of whole app state, related to this reducer.....
const INITIAL_STATE = {
  tasks: [],
  reload: true
};

export default ( state=INITIAL_STATE, action ) => {
  switch (action.type) {
    case CHANGE_MAINPAGE:
	   console.log("This is change main page in Task Reducer, required for reload prop only");
//     	console.log(state);
       return { ...state, reload: !!action.reload }

    case SHOW_TASKS:
	// this will reset reload props to false....
       return { ...state, tasks: action.tasks, reload: !!action.reload }

    case UPDATE_TASKS:
	// this will reset reload props to input....
       return { ...state, reload: !!action.reload }

    case DELETE_TASK:
			console.log("This is for delete task, listing reload. Since it already on same url");
// 			console.log(state);
       return { ...state, reload: true}

    default:
      /*
      We will just return the state. Return the initial state when nothing changes
      hence no re-rendering.
      */
      return state
  }
};
