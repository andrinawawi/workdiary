import {browserHistory} from 'react-router';

import {
  TEXT_CHANGED,
  CHANGE_MAINPAGE
} from './types';

export const textChanged = (text) => {
  return {
    type: TEXT_CHANGED,
    payload: text
  };
}

export const changeMainPage = (page, reload) => {
  browserHistory.push('/'+page);

  return {
    type: CHANGE_MAINPAGE,
    page: page,
    reload: !!reload
  };
}

