import {browserHistory} from 'react-router';

import * as types from './types';


/* show projects fetched from server, save projects, user for later use....*/
export const showUsers = (data) => {
  return {
    type: types.SHOW_USERS,
    users: data.users,
    reload: !!data.reload
  };
}

export const createUser = () => {
  return {
    type: types.CREATE_USER,
  };
}

// only reload if required.....e.g. Cancel from CreateUser won't
// require listing reload.....
export const updateUserList = (reload, samePage) => {
	if (!samePage) {
		// after user add/edit, navigate to user listing....
		browserHistory.goBack();
	}

	return {
		type: types.UPDATE_USERS,
		reload: reload
	};
}

export const editUser = (data) => {
  return {
    type: types.EDIT_USER,

	name: data.name,
	email: data.email
  };
}
