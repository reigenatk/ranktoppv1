import React, { Component } from "react";
import classes from "./Chart.css";
import axios from "axios";
import Graph from "./Graph/Graph";
import Current from "./Current/Current";
import Challenger from "./Challenger/Challenger";

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
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let players = null;
    let ppgaprounded;
    if (this.state.current.pp) {
      let ppgap = this.state.current.pp - this.state.challenger.pp;
      ppgaprounded = ppgap.toFixed(1);
      players = (
        <div className={classes.players}>
          <Current obj={this.state.current} gap={ppgaprounded}></Current>
          <Challenger obj={this.state.challenger} />
        </div>
      );
    }
    let difff =
      this.props.pp[this.props.pp.length - 1] -
      this.props.pp[this.props.pp.length - 2];
    let arrow;
    if (difff >= 0) {
      arrow = <span className={classes.arrowup}></span>;
    } else {
      arrow = <span className={classes.arrowdown}></span>;
    }

    return (
      <div className={classes.chart}>
        <h1 style={{ textAlign: "center" }}>
          {this.props.milestone} digit: {this.state.current.pp} pp ({arrow}
          {difff} pp)
        </h1>
        {players}
        <h3 style={{ color: "	#90EE90", textAlign: "center" }}>
          Difference: {ppgaprounded} pp
        </h3>
        <Graph pp={this.props.pp} dates={this.props.dates}></Graph>
      </div>
    );
  }
}

export default Chart;
