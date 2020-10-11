import React, { Component } from "react";
import Chart from "chart.js";
import classes from "./Graph.css";

// chart styling
Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = false;

export default class Graph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    var ctx = document.getElementsByClassName("myChart");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: this.props.dates,
        datasets: [
          {
            pointBackgroundColor: "black",
            backgroundColor: "rgb(255, 102, 170, 0.8)",
            label: "PP",
            data: this.props.pp,
          },
        ],
      },
      options: {
        //Customize chart options
        responsive: true,
        maintainAspectRatio: false,
        // so it won't cut off at top for whatever reason
        layout: {
          padding: {
            top: 5,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: "#312F2F",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                precision: 0,
                fontColor: "#312F2F",
                maxTicksLimit: 5,
              },
              gridLines: {
                display: false,
                // color: "#ff66aa",
              },
            },
          ],
        },
      },
    });
  }
  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas className="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
