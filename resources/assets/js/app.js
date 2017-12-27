// app.js

require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import 'react-select/dist/react-select.css';

import Master from './components/Master';
import CreateItem from './components/CreateItem';
import DisplayItem from './components/DisplayItem';
import EditItem from './components/EditItem';
import Projects from './components/Projects';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';
import Users from './components/Users';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import DialogBox from './components/Overlay';

render(
  <Router history={browserHistory}>
      <Route path="/" component={Master} >
        <Route path="/projects" component={Projects} />
        <Route path="/users" component={Users} />
        <Route path="/tasks" component={DisplayItem} />
        <Route path="/display-item" component={DisplayItem} />
        <Route path="/add-item" component={CreateItem} />
        <Route path="/edit/:id" component={EditItem} />
        <Route path="/add-project" component={CreateProject} />
        <Route path="/edit-project/:id" component={EditProject} />
        <Route path="/add-user" component={CreateUser} />
        <Route path="/edit-user/:id" component={EditUser} />
//         <Route path="/show-dia" component={DialogBox} />
      </Route>
    </Router>,
        document.getElementById('example'));
