import React, { Component } from "react";
import classes from "./Chart.css";
import axios from "axios";
import Graph from "./Graph/Graph";
import Current from "./Current/Current";
import Challenger from "./Challenger/Challenger";
import Spinner from "../../UI/Spinner";
import Auxiliary from "../../../HOC/Auxiliary";

class Chart extends Component {
  state = {
    ppGraph: [],
    current: {
      pp: null,
      username: "",
      profile: "",
      propic: "",
      acc: null,
      playtime: null,
      rank: null,
      country: null,
    },
    challenger: {
      pp: null,
      username: "",
      profile: "",
      propic: "",
      acc: null,
      playtime: null,
      rank: null,
      country: null,
    },
    loaded: false,
  };

  componentDidMount() {
    let integerRank = Math.pow(10, this.props.milestone);

    let pageNo = integerRank / 50;
    axios
      .get(
        "https://fast-everglades-11257.herokuapp.com/https://osu.ppy.sh/api/v2/rankings/osu/performance?cursor[page]=" +
          pageNo,
        {
          headers: {
            Authorization: "Bearer " + this.props.accessToken,
          },
        }
      )
      .then((response) => {
        let val = 48;
        if (this.props.milestone === 1) {
          val = 8;
        }
        this.setState({
          current: {
            pp: response.data.ranking[val].pp,
            username: response.data.ranking[val].user.username,
            profile:
              "https://osu.ppy.sh/users/" + response.data.ranking[val].user.id,
            propic: response.data.ranking[val].user.avatar_url,
            acc: response.data.ranking[val].hit_accuracy,
            playtime: response.data.ranking[val].play_time,
            rank: integerRank - 1,
            country: response.data.ranking[val].user.country_code,
          },
          challenger: {
            pp: response.data.ranking[val + 1].pp,
            username: response.data.ranking[val + 1].user.username,
            profile:
              "https://osu.ppy.sh/users/" +
              response.data.ranking[val + 1].user.id,
            propic: response.data.ranking[val + 1].user.avatar_url,
            acc: response.data.ranking[val + 1].hit_accuracy,
            playtime: response.data.ranking[val + 1].play_time,
            rank: integerRank,
            country: response.data.ranking[val + 1].user.country_code,
          },
        });
        console.log(response);
        this.setState({ loaded: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let players = null;

    if (this.state.current.pp) {
      let ppgap = this.state.current.pp - this.state.challenger.pp;
      let ppgaprounded = ppgap.toFixed(2);
      players = (
        <div className={classes.players}>
          <Current obj={this.state.current} gap={ppgaprounded}></Current>
          <Challenger obj={this.state.challenger} />
        </div>
      );
    }
    let diff =
      this.props.pp[this.props.pp.length - 1] -
      this.props.pp[this.props.pp.length - 2];
    let arrow;
    let difff = diff.toFixed(1);
    if (difff >= 0) {
      arrow = <span className={classes.arrowup}></span>;
    } else {
      arrow = <span className={classes.arrowdown}></span>;
    }

    let content = <Spinner></Spinner>;
    if (this.state.loaded) {
      content = (
        <Auxiliary>
          <h1 style={{ textAlign: "center" }}>
          <span style={{"color": "black"}}>{this.props.milestone} digit: {this.state.current.pp} pp</span> ({arrow}
            {difff} pp)
          </h1>
          {players}
          
        </Auxiliary>
      );
    }

    return (
      <div className={classes.chart}>
        {content}

        <h1 className={classes.chartlabels}>Past 20 Days: </h1>
        <div className = {classes.center}>
          <Graph pp={this.props.pp} dates={this.props.dates}></Graph>
        </div>
        <h3 className={classes.ppchange}>
            Weekly Change: {this.props.weeklyChange} pp
        </h3>

        <h1 className={classes.chartlabels}>Monthly: </h1>
        <div className = {classes.center}>
          <Graph pp={this.props.monthlypp} dates={this.props.monthlydates}></Graph>
        </div>
        <h3 className={classes.ppchange}>
            Monthly Change: {this.props.monthlyChange} pp
        </h3>
      </div>
    );
  }
}

export default Chart;
