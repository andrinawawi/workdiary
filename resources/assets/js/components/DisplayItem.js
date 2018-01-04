import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
// import TableRow from './TableRow';

class DisplayItem extends Component {
  constructor(props) {
       super(props);
       this.state = {value: '', items: ''};
     }
     componentDidMount(){
       axios.get('/items')
       .then(response => {
         this.setState({ items: response.data });
       })
       .catch(function (error) {
         console.log(error);
       })
     }

  render(){
    return (
      <div>
        <h1>Items</h1>

        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/add-item">Create Item</Link>
          </div>
        </div><br />

        <table className="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Item Name</td>
                <td>Item Price</td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    )
  }
}
export default DisplayItem;
