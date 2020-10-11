import React from 'react';
import classes from './Description.css';

const description = props => {
  return (
    <div className={classes.description}>
      <p>
        Sometimes if you click on the ranking and match it to the official rank of the player on the server, it will be off.
        This isn't intentional,{' '}
      </p>
    </div>
  );
};

export default description;
