import {browserHistory} from 'react-router';

import * as types from './types';


/* show projects fetched from server, save projects, user for later use....*/
export const showTasks = (data) => {
  return {
    type: types.SHOW_TASKS,
    tasks: data.tasks,
    reload: !!data.reload
  };
}

export const createTask = () => {
  return {
    type: types.CREATE_TASK,
  };
}

// only reload if required.....e.g. Cancel from CreateTask won't
// require listing reload.....
export const updateTaskList = (reload, samePage) => {
	if (!samePage) {
		// after task add/edit, navigate to task listing....
		browserHistory.goBack();
	}

	return {
		type: types.UPDATE_TASKS,
		reload: reload
	};
}

export const editTask = (data) => {
  return {
    type: types.EDIT_TASK,

	description: data.task.description,
	project_id: data.task.project_id,
	assigned_user_id: data.task.assigned_user_id,
	status: data.task.status,
	end_date: data.task.end_date
  };
}
