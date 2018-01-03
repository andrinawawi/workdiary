import {browserHistory} from 'react-router';

import * as types from './types';

/* show projects fetched from server, save projects, user for later use....*/
export const showProjects = (data) => {
  return {
    type: types.SHOW_PROJECTS,
    payload: "projects",
    projects: data.projects,
    users: data.users,
    reload: !!data.reload
  };
}

export const showProject = (id) => {
  return {
    type: types.SHOW_PROJECT,
    payload: id
  };
}

export const createProject = () => {
  return {
    type: types.CREATE_PROJECT,
    payload: {}
  };
}

// only reload if required.....e.g. Cancel from CreateProject won't
// require listing reload.....
export const updateProjectList = (reload, samePage) => {
	if (!samePage) {
		// after project add/edit, navigate to project listing....
	  browserHistory.goBack();
	}

  return {
    type: types.UPDATE_PROJECTS,
    reload: !!reload
  };
}

export const editProject = (data) => {
  return {
    type: types.EDIT_PROJECT,
    project_id: data.id,
    name: data.name,
    description: data.description
  };
}
