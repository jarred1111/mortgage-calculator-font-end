import React, { Component } from "react";
import axios from "axios";

import "../css/MortageCalculator.css";

import MCtableOut from './MCtableOut';
import MCstackedG from './charts/MCstackedG';

class MortageCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purPri: 0.0,
      purPriMess: "You can only enter numbers with no spaces!",
      bondTerm: 0,
      bondTermMess: "You can only enter numbers with no spaces!",
      dep: 0.0,
      depMess: "You can only enter numbers with no spaces!",
      iRate: 0,
      iRateMess: "You can only enter numbers with no spaces!",
      chartType: "percentage",
      chartTimeFrame: "Month",

      calName: "",
      saveMessage: "",

      theRes: "",
      theMonthAddRes: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      purchasePrice: this.state.purPri,
      bondTerm: this.state.bondTerm,
      deposite: this.state.dep,
      interestRate: this.state.iRate,
      timeFrame: this.state.chartTimeFrame,
      dataType: this.state.chartType

    };

    axios.post(`http://localhost:8080/mortageCalculator`, data)
      .then(res => {
        var resJson = res.data;
        this.setState({ theRes: resJson.YourMPayment });
        this.setState({theMonthAddRes: resJson.theMonthAdd})
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error.response);
   });
  };

  handleSave = event => {
    event.preventDefault();

    const data = {
      calName: this.state.calName,
      purchasePrice: this.state.purPri,
      bondTerm: this.state.bondTerm,
      deposite: this.state.dep,
      interestRate: this.state.iRate,
      timeFrame: this.state.chartTimeFrame,
      dataType: this.state.chartType
    };

    axios.post(`http://localhost:8080/calSave`, data)
      .then(res => {
        var resJson = res.data;
        this.setState({ saveMessage: resJson.Message });
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error.response);
   });
  };

  render() {

    return (
      <div id="containerDiv">
        <div id="inputDiv">
          <h2>Calculator</h2>
          <p id="errorMessage">{this.state.erroMess}</p>
          <form onSubmit={this.handleSubmit}>
            <p id="labelText">
              Please Enter the purchase price: <b id="errorMessage"></b>
            </p>
            <input
              type="text"
              name="purPri"
              value={this.state.purPri}
              onChange={this.handleInputChange}
              className="inputFeild"
            ></input>

            <p id="labelText">
              Please Enter the bond term: (in years) <b id="errorMessage"></b>
            </p>
            <input
              type="text"
              name="bondTerm"
              value={this.state.bondTerm}
              onChange={this.handleInputChange}
              className="inputFeild"
            ></input>

            <p id="labelText">
              Please Enter your deposit: <b id="errorMessage"></b>
            </p>
            <input
              type="text"
              name="dep"
              value={this.state.dep}
              onChange={this.handleInputChange}
              className="inputFeild"
            ></input>

            <p id="labelText">
              Please enter the fixed interest rate: (as a percentage)
              <b id="errorMessage"></b>
            </p>
            <input
              type="text"
              name="iRate"
              value={this.state.iRate}
              onChange={this.handleInputChange}
              className="inputFeild"
            ></input>

            <p id="labelText">
              Please select the data type you want to view the stats in
              <b id="errorMessage"></b>
            </p>

            <select className="inputFeild" name="chartType" onChange={this.handleInputChange} value={this.state.chartType}>
              <option value="percentage">Percentage</option>
              <option value="currency">Amount</option>
            </select>

            <p id="labelText">
              Please select time frame you want to view your stats in
              <b id="errorMessage"></b>
            </p>
            <select className="inputFeild" name="chartTimeFrame" onChange={this.handleInputChange} value={this.state.chartTimeFrame}>
              <option value="year">Year</option>
              <option value="Month">Month</option>
            </select>

            <br></br>
            <button type="submit" name="Calculate" className="submitButton">
              Calculate
            </button>
          </form>
        </div>

        <div id="arrow-up">
          <div id="theResLeft">
            <h1 id="resHeading">Your monthly payment is:</h1>
            <p id="labelTextAmount">R {this.state.theRes}</p>
            <p>* please note the amount calculated is excluding the annual property tax payment, annual property insurance cost and the private mortgage insurance payment.</p>
          
          <form  onSubmit={this.handleSave}>  
            <h2>Please give your calculation a name</h2>
            <p id="Message">{this.state.saveMessage}</p>

            <input
              type="text"
              name="calName"
              value={this.state.calName}
              onChange={this.handleInputChange}
              className="inputFeild"
            ></input>

          <br></br>
            <button type="submit" name="SaveData" className="submitButton">
              Save your Calculation
            </button>
          </form>

          </div>
          <div id="theResRight">
            <div id="tableContainer">
              <MCtableOut item={this.state.theMonthAddRes} type={this.state.chartType} timeFrame={this.state.chartTimeFrame}/>
            </div>
          </div>
          <div id="chartDiv">
            <MCstackedG item={this.state.theMonthAddRes} type={this.state.chartType} timeFrame={this.state.chartTimeFrame}/>
          </div>
        </div>
        <div id="filler"></div>
      </div>
    );
  }
}

export default MortageCalculator;
