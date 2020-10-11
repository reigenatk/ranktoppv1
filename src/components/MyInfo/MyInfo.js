import React from 'react';
import classes from './MyInfo.css';
const myinfo = props => {
  return (
    <div className={classes.myinfo}>
      <h4>Made by ReigenATK: </h4>
      <a href="http://www.github.com/reigenatk/ranktopp">
        <img src={'github.png'} alt="github" />
      </a>
      <a href="https://osu.ppy.sh/users/14533822">
        <img src={'osu.png'} alt="osu profile" />
      </a>
    </div>
  );
};

export default myinfo;
