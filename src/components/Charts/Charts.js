import React, {Component} from 'react';
import classes from './Charts.css';
import Chart from './Chart/Chart';
import axios from 'axios';
import Auxiliary from '../../HOC/Auxiliary';
import Spinner from "../UI/Spinner";

class charts extends Component {
  state = {
    access_token: '',
    dates: [],
    ONEPP: null,
    TWOPP: null,
    THREEPP: null,
    FOURPP: null,
    oneMonthlyPP: null,
    twoMonthlyPP: null,
    threeMonthlyPP: null,
    fourMonthlyPP: null,
    loaded: false,
  };
  componentDidMount () {
    axios
      .get ('https://ranktopp.herokuapp.com/accesstoken')
      .then (response => {
        this.setState ({access_token: response.data});
        console.log ('access token granted');
        // https://ranktopp.herokuapp.com/pp
        // http://localhost:4000/pp

        // make a get request to our backend for the pp data for last 20 days
        axios.get ('https://ranktopp.herokuapp.com/pp').then (response => {
          let curdates = response.data.map (val => {
            return val.day.slice(0, -4) // strip out the last 4 chars, which is the year so we only display date in the graph
          });
          let oPP = response.data.map (val => {
            return val.oneDigitpp;
          });
          let tPP = response.data.map (val => {
            return val.twoDigitpp;
          });
          let thPP = response.data.map (val => {
            return val.threeDigitpp;
          });
          let fPP = response.data.map (val => {
            return val.fourDigitpp;
          });

          curdates = curdates.reverse ();
          oPP = oPP.reverse ();
          tPP = tPP.reverse ();
          thPP = thPP.reverse ();
          fPP = fPP.reverse ();
          this.setState ({
            dates: curdates,
            ONEPP: oPP,
            TWOPP: tPP,
            THREEPP: thPP,
            FOURPP: fPP,
          });
        });
      })
      .catch (error => {
        console.log (error);
      });

    // also make a request for monthly pp data as well
    // 'https://ranktopp.herokuapp.com/monthlypp'
    axios.get ('https://ranktopp.herokuapp.com/monthlypp').then(response => {
      console.log(response);
      
      let oPP = response.data.map (val => {
        return val.oneDigitpp;
      });
      let tPP = response.data.map (val => {
        return val.twoDigitpp;
      });
      let thPP = response.data.map (val => {
        return val.threeDigitpp;
      });
      let fPP = response.data.map (val => {
        return val.fourDigitpp;
      });
      let dates = response.data.map (val => {
        return val.day.substring(0, 3); // always 1st day of month btw so lets just indicate the month and not the day
      })

      this.setState ({
        monthlyDates: dates,
        oneMonthlyPP: oPP,
        twoMonthlyPP: tPP,
        threeMonthlyPP: thPP,
        fourMonthlyPP: fPP,
      });
    });
  }
  render () {
    const rankMilestones = [1, 2, 3, 4];
    let content = <Spinner></Spinner>;

    // if the data has finished loading in
    if (this.state.ONEPP && this.state.access_token) {
      content = rankMilestones.map (num => {
        let ppData;
        let monthlyppData;

        if (num === 1) {
          ppData = this.state.ONEPP;
          monthlyppData = this.state.oneMonthlyPP;
        } else if (num === 2) {
          ppData = this.state.TWOPP;
          monthlyppData = this.state.twoMonthlyPP;
        } else if (num === 3) {
          ppData = this.state.THREEPP;
          monthlyppData = this.state.threeMonthlyPP;
        } else if (num === 4) {
          ppData = this.state.FOURPP;
          monthlyppData = this.state.fourMonthlyPP;
        }
        let len = ppData.length;
        let weeklyDelta = ppData[len - 1] - ppData[len - 8];
        let weeklyRounded = weeklyDelta.toFixed (2);
        let monthlyDelta = ppData[len - 1] - ppData[Math.max (0, len - 31)];
        let monthlyRounded = monthlyDelta.toFixed (2);
        return (
          <Chart
            milestone={num}
            key={num}
            accessToken={this.state.access_token}
            pp={ppData}
            monthlypp = {monthlyppData}
            monthlydates = {this.state.monthlyDates}
            dates={this.state.dates}
            weeklyChange={weeklyRounded}
            monthlyChange={monthlyRounded}
          />
        );
      });
    }
    let lastdatep = (
      <h1 id="test" style={{textAlign: 'center', color: 'orange'}}>
          {/* countdown till next update */}
      </h1>
    );
    return (
      <Auxiliary>
        {lastdatep}
        <div className={classes.charts}>{content}</div>
      </Auxiliary>
    );
  }
}

export default charts;
