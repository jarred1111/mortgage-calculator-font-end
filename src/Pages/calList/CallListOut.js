import React from "react";
import "../../css/CalList.css";

import CallListOutRow from "./CalListOutRow";

class CallListOut extends React.Component {
  render() {
    let arr = [];
    let arrN = this.props.item;
    let keyCounter = 0;

    for (var i = 0; i < arrN.length; i++) {
      arr[i] = arrN[i];
    }

    if (arr !== null) {
      return (
        <table id="t02" width="1000px">
          <thead>
            <tr>
              <th>Bond Term</th>
              <th>Name</th>
              <th>Loan amount</th>
              <th>Interest</th>
              <th>Monthly payments</th>
              <th>Deposite</th>
            </tr>
          </thead>
          <tbody>
            {arr.map(item => (
              <CallListOutRow item={item} key={++keyCounter}/>
            ))}
          </tbody>
        </table>
      );
    } else {
      return <td>There are no records</td>;
    }
  }
}

export default CallListOut;
