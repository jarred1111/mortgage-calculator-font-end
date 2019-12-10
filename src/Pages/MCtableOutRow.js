import React from 'react';

class MCtableOutRow extends React.Component {
  render() {
    var json = this.props.item;
    let keyCounter = 0;

      var arr = [];
      Object.keys(json).forEach(function(key) {
        arr.push(json[key]);
      });

      var valList = arr.map(function(theVal){
        return <td key={++keyCounter}>{Math.round(theVal * 100)/ 100}</td>;
      })

    return <tr>{valList}</tr>
  }
}

export default MCtableOutRow;