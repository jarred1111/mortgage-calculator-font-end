import React from 'react';
import axios from "axios";

import "../../css/CalList.css";

import CallListOut from './CallListOut';

class CalList extends React.Component {

  state = {
    data: ""
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/calList`)
      .then(res => {
        var resJson = res.data;

        this.setState({data: resJson});
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error.response);
   });
  }

  render() {
    return (
      <div id="containerDiv">
        <div id="tableDiv">
          <h2 id="header">Previous deposites:</h2>
          <CallListOut item={this.state.data}/>
        </div>
      </div>
    )
  }
}

export default CalList;