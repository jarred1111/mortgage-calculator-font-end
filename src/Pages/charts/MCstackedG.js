import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class MCstackedG extends Component {
	constructor(props) {
		super(props);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {

    //Processing the data for the graph
    var json = this.props.item;
    var arr = [];
    var arrLoan = [];
    if(json !== null) {

      //Pushes each data object 
      Object.keys(json).forEach(function(key) {
        arr.push(json[key]);
        arrLoan.push(json[key]);
      });

      for(var i = 0; i < arr.length; i++) {
        var theObj = arr[i];
        var theObjLoan = arrLoan[i];
        var index = i;
        var theVal;
				var theValLoan;
				
        Object.keys(theObj).forEach(function(key) {
          if (key === 'interestPaid') 
          theVal = { label: index, y: arr[index][key] }
        });

        Object.keys(theObjLoan).forEach(function(keytwo) {
          if (keytwo === 'principalPaid')  
          theValLoan = { label: index, y: arrLoan[index][keytwo] }
        });

        arr[index] = theVal;
        arrLoan[index] = theValLoan
      }
    }

		const options = {
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Loan and interest Payments comparison per " + this.props.timeFrame + " in " + this.props.type,
				fontFamily: "verdana"
			},
			axisY: {
				title: this.props.type + " of payment allocation",
				prefix: ""
      },
      axisX: {
				title: "Payment allocation",
				prefix: ""
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [
			{
				type: "stackedColumn",
				name: "Interest Paid",
				showInLegend: true,
				dataPoints: arr
			},
			{
				type: "stackedColumn",
				name: "Loan Amount Paid",
				showInLegend: true,
				dataPoints: arrLoan
			}]
		}
		
		return (
		<div>
	    <h1>React Stacked Column Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
		</div>
		);
	}
}

export default MCstackedG;