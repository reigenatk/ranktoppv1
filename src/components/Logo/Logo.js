import React from 'react';
import classes from './Logo.css';

const logo = props => {
  return (
    <div className={classes.Logo}>
      <h1>
        <a href="https://osu.ppy.sh/home"><img src="osu2.PNG" /></a> Rank to PP
      </h1>
    </div>
  );
};

export default logo;
