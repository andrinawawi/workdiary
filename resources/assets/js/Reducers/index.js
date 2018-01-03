import { combineReducers } from 'redux';
import ChangeMainPageReducer from './ChangeMainPageReducer';
import ProjectReducer from './ProjectReducer';
import EditProjectReducer from './EditProjectReducer';
import TaskReducer from './TaskReducer';
import EditTaskReducer from './EditTaskReducer';

export default combineReducers({
  // the keys here are going to be the property of state that we are producing.
  mainpage_reducer: ChangeMainPageReducer,
  project_reducer: ProjectReducer,
  edit_project_reducer: EditProjectReducer,
  task_reducer: TaskReducer,
  edit_task_reducer: EditTaskReducer
});
