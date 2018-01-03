import {
  CHANGE_MAINPAGE
} from '../Actions/types';

// This is only slice of whole app state, related to this reducer.....
const INITIAL_STATE = {
  page: ''
};

export default ( state=INITIAL_STATE, action ) => {
  switch (action.type) {
    case CHANGE_MAINPAGE:
// 	   console.log("This is change main page ");
       return { ...state, page: action.page }

    default:
      /*
      We will just return the state. Return the initial state when nothing changes
      hence no re-rendering.
      */
      return state
  }
};
