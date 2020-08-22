import React, { Component } from "react";
import classes from "./Charts.css";
import Chart from "./Chart/Chart";
import axios from "axios";
import Auxiliary from "../../HOC/Auxiliary";
class charts extends Component {
  state = {
    access_token: "",
    dates: [],
    ONEPP: null,
    TWOPP: null,
    THREEPP: null,
    FOURPP: null,
  };
  componentDidMount() {
    axios
      .get("https://ranktopp.herokuapp.com/accesstoken")
      .then((response) => {
        this.setState({ access_token: response.data });
        console.log("access token granted");
        axios.get("http://localhost:4000/pp").then((response) => {
          let curdates = response.data.map((val) => {
            return val.day;
          });
          let oPP = response.data.map((val) => {
            return val.oneDigitpp;
          });
          let tPP = response.data.map((val) => {
            return val.twoDigitpp;
          });
          let thPP = response.data.map((val) => {
            return val.threeDigitpp;
          });
          let fPP = response.data.map((val) => {
            return val.fourDigitpp;
          });

          this.setState({
            dates: curdates,
            ONEPP: oPP,
            TWOPP: tPP,
            THREEPP: thPP,
            FOURPP: fPP,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const rankMilestones = [1, 2, 3, 4];
    let rankCharts = null;
    if (this.state.ONEPP && this.state.access_token) {
      rankCharts = rankMilestones.map((num) => {
        let ppData;
        if (num === 1) {
          ppData = this.state.ONEPP;
        } else if (num === 2) {
          ppData = this.state.TWOPP;
        } else if (num === 3) {
          ppData = this.state.THREEPP;
        } else if (num === 4) {
          ppData = this.state.FOURPP;
        }

        return (
          <Chart
            milestone={num}
            key={num}
            accessToken={this.state.access_token}
            pp={ppData}
            dates={this.state.dates}
          ></Chart>
        );
      });
    }
    let lastdate = this.state.dates[this.state.dates.length - 1];
    let lastdatep = (
      <h1 style={{ textAlign: "center", color: "orange" }}>
        Last updated on: {lastdate} @ 12:00 UTC
      </h1>
    );
    return (
      <Auxiliary>
        {lastdatep}
        <div className={classes.charts}>{rankCharts}</div>
      </Auxiliary>
    );
  }
}

export default charts;
