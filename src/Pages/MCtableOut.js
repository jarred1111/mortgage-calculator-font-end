import React from "react";

import MCtableOutRow from "./MCtableOutRow";

class MCtableOut extends React.Component {
  render() {
    var json = this.props.item;
    let keyCounter = 0;

    if (json !== null) {
      var arr = [];
      Object.keys(json).forEach(function(key) {
        arr.push(json[key]);
      });
      return (
        <table id="t01">
          <thead>
            <tr>
              <th>{this.props.timeFrame}</th>
              <th>Interest as {this.props.type}</th>
              <th>Loan amount as {this.props.type}</th>
              <th>Amount owed</th>
            </tr>
          </thead>

          <tbody>
            {arr.map(item => (
              <MCtableOutRow item={item} key={++keyCounter}/>
            ))}
          </tbody>
        </table>
      );
    } else {
      return <p>Please enter the above variables</p>;
    }
  }
}

export default MCtableOut;
