import React from 'react';

class CallListOutRow extends React.Component {
  render() {
    let json = this.props.item;
    let keyCounter = 0;
    
      var arr = [];
      Object.keys(json).forEach(function(key) {
        if (key !== 'id') {
          arr.push(json[key]);
        }
      });

      var valList = arr.map(function(theVal){
        if (!isNaN(theVal)) {
          return <td key={++keyCounter}>{Math.round(theVal * 100)/ 100}</td>;
        } else {
          return <td key={++keyCounter}>{theVal}</td>;
        }
      })

    return <tr>{valList}</tr>
  }
}

export default CallListOutRow;