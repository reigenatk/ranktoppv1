import React from "react";
import classes from "./MyInfo.css";
const myinfo = (props) => {
  return (
    <div className={classes.myinfo}>
      <h4>Made by ReigenATK: </h4>
      <a href="http://www.github.com/reigenatk/ranktopp">
        <img src={process.env.PUBLIC_URL + "/github.png"} alt="github"></img>
      </a>
      <a href="https://osu.ppy.sh/users/14533822">
        <img src={process.env.PUBLIC_URL + "/osu.png"} alt="osu profile"></img>
      </a>
    </div>
  );
};

export default myinfo;
