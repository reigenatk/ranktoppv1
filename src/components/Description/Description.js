import React from "react";
import classes from "./Description.css";

const description = (props) => {
  return (
    <div className={classes.description}>
      <p>
        Have you ever wondered what it takes to be a four digit? A three digit?
        Maybe even a two or god forbid- a one digit? Rank to PP tracks the
        trends in pp requirements over time for each milestone. The data is
        updated every day using the{" "}
        <a href="https://osu.ppy.sh/docs/index.html">osu API v2</a>, Now that
        you know what it takes, go out there and make some good plays!
      </p>
    </div>
  );
};

export default description;
