import React from "react";
import classes from "./Current.css";

const current = (props) => {
  let val = props.obj.playtime;
  let days = Math.floor(val / 86400);
  val -= days * 86400;
  let hours = Math.floor(val / 3600);
  val -= hours * 3600;
  let mins = Math.floor(val / 60);
  let accuracy = props.obj.acc;
  let acc = accuracy;
  let country =
    "https://www.countryflags.io/" + props.obj.country + "/flat/64.png";
  if (props.obj.propic === "/images/layout/avatar-guest.png") {
    props.obj.propic = "https://osu.ppy.sh/images/layout/avatar-guest.png";
  }
  return (
    <div className={classes.current}>
      <h1 className = {classes.currentTitle}>Gatekeeper (#{props.obj.rank}):</h1>
      <div className={classes.username}>
        <h1>
          <a href={props.obj.profile}>{props.obj.username}</a>{" "}
          <img
            style={{ width: "25px", display: "inline-block" }}
            src={country}
            alt="flag"
          ></img>
        </h1>
      </div>
      <a href={props.obj.profile}>
        <img src={props.obj.propic} alt="profile pic"></img>
      </a>
      <h3>pp: {props.obj.pp}</h3>
      <h3>Hit Acc: {acc}% </h3>
      <h3>
        Playtime: {days}d {hours}h {mins}m
      </h3>
    </div>
  );
};

export default current;
