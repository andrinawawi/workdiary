import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRowUser from './TableRowUser';

class Users extends Component {
  constructor(props) {
       super(props);
       console.log(props);
       
       this.state = {value: '', users: ''};
     }
     componentDidMount(){
       axios.get('/user')
       .then(response => {
         this.setState({ users: response.data });
       })
       .catch(function (error) {
         console.log(error);
       })
     }
     tabRow(){
       if(this.state.users instanceof Array){
         return this.state.users.map(function(object, i){
             return <TableRowUser obj={object} key={i} />;
         })
       }
     }

  render(){
    return (
      <div>
        <h1>Team Members</h1>

        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/add-user">Add User to Team</Link>
          </div>
        </div><br />

        <table className="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
        </table>
    </div>
    )
  }
}

Users.defaultProps = {  
    isProject: true  
}  

export default Users;
