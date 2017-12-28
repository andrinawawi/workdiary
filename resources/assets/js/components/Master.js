import React, {Component} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import DialogBox from './Overlay';

class Master extends Component {

	// Its is not called for initial render.....
	componentDidUpdate(prevProps, prevState) {
// 		console.log("Master comp updates ");
	}
	
  render(){
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/tasks">Tasks</Link></li>
            </ul>
          </div>
      </nav>
          <div>
              {this.props.children}
          </div>
      </div>
    )
  }
}

export default Master;

// navigate to /projects after load......
setTimeout(() => browserHistory.push('/projects'), 0);
