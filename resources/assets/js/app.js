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
import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import DialogBox from './components/Overlay';

render(
  <Router history={browserHistory}>
      <Route path="/" component={Master} >
        <Route path="/display-item" component={DisplayItem} />
        <Route path="/add-item" component={CreateItem} />
        <Route path="/edit/:id" component={EditItem} />

        <Route path="/projects" component={Projects} />
        <Route path="/users" component={Users} />
        <Route path="/tasks" component={Tasks} />

        <Route path="/tasks/project/:id" component={Tasks} />
        <Route path="/tasks/user/:id" component={Tasks} />

        <Route path="/add-project" component={CreateProject} />
        <Route path="/edit-project/:id" component={EditProject} />
        <Route path="/add-user" component={CreateUser} />
        <Route path="/edit-user/:id" component={EditUser} />
        <Route path="/add-task" component={CreateTask} />
        <Route path="/edit-task/:id" component={EditTask} />
//         <Route path="/show-dia" component={DialogBox} />
      </Route>
    </Router>,
        document.getElementById('example'));
