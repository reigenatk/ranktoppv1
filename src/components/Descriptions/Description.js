import React from 'react';
import classes from './Description.css';

const description = props => {
  return (
    <div className={classes.description}>
      <p>
        Have you ever wondered what it takes to be a four digit? A three digit?
        Maybe even a two or one digit? Rank to PP tracks the
        trends in pp requirements over time for each milestone. The data is
        updated every day using the{' '}
        <a href="https://osu.ppy.sh/docs/index.html">osu API v2</a>, at 12:00 UTC

        <br></br>
        <br></br>
        Some extra notes: Sometimes when you click on the rank of the player (say #10000), it will not be exactly the same
        as on the official osu website. I believe this is because the API is not always completely in sync with the live values
        and instead it updates once in a while.

        Also the API only provides ranks up to 10k so unfortunately I cannot track the 5, 6 or 7 digit milestones.
        <br></br>
        <br></br>
        Final Note, data collection began around August 17th of 2020, so the monthly graphs will look a little sparse for now. But I plan
        to keep on collecting data until I have to pay money, which won't be for a while! So hopefully we'll have yearly tracking once I gather enough.
      </p>
    </div>
  );
};

export default description;
