import React, {Component} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import DialogBox from './Overlay';
import { connect } from 'react-redux';
import {changeMainPage} from '../Actions';
import * as actions from '../Actions';

class Master extends Component {

  constructor(props) {
      super(props);
      this.state = {page: ''};
//       this.handlePageChange = this.handlePageChange.bind(this);
      this.onPageChange = this.onPageChange.bind(this);
  }

	// Its is not called for initial render.....
	componentDidUpdate(prevProps, prevState) {
// 		console.log("Master comp updates ");
	}
	
  // go to given page as root....
//   handlePageChange(page) {
// 	  browserHistory.push('/'+page);
//   }
	
  onPageChange(e) {
  	var newPage = e.target.dataset.page;
	// dispatch an action from here .....which will update the state of the app....
	this.props.changeMainPage(newPage, true)
  }

  render(){
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li data-page="projects" onClick={this.onPageChange}>Projects</li>
              <li data-page="users" onClick={this.onPageChange}>Users</li>
              <li data-page="tasks" onClick={this.onPageChange}>Tasks</li>
              <li data-page="search" onClick={this.onPageChange}>Search</li>
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

const mapStateToProps = state => {
  return {
    page: state.mainpage_reducer.page
  }
}

// Pass it as the first argument to our connect function.
// this will wrap all actionCreators with dispatch method, so that they can be called automatically....
// like this.props.actionCreator1()  
// see https://github.com/reactjs/react-redux/blob/master/docs/api.md
export default connect(mapStateToProps, actions)(Master);
// export default Master;

// navigate to /projects after load......
setTimeout(() => browserHistory.push('/projects'), 0);