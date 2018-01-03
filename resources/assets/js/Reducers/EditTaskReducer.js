import {
  EDIT_TASK, 
  UPDATE_TASKS 
} from '../Actions/types';

// This is only slice of whole app state, related to this reducer.....
const INITIAL_STATE = {
  description: '',
  status: '',
  end_date: '',
  project_id: '',
  assigned_user_id: ''
};

export default ( state=INITIAL_STATE, action ) => {
  switch (action.type) {
    case EDIT_TASK:
	   console.log("This is Edit TASKS Reducer ");
	   console.dir(action);
       return { ...state,
       	 description: action.description,
       	 status: action.status,
       	 end_date: action.end_date,
       	 assigned_user_id: action.assigned_user_id,
       	 project_id: action.project_id
       }

    case UPDATE_TASKS:
	// this will reset this reducers state to blank....
		console.log("clear task edit state");
       return INITIAL_STATE;

    default:
      /*
      We will just return the state. Return the initial state when nothing changes
      hence no re-rendering.
      */
      return state
  }
};
