import React from 'react';
import classes from './Toolbar.css';
import {NavLink} from 'react-router-dom';

const toolbar = props => {
  return (
    <div className={classes.topnav}>
      <div className={classes.topnavright}>
        <NavLink
          className={classes.NavLink}
          to="/whatisthis"
          activeClassName={classes.active}
          exact
        >
          What is this?
        </NavLink>
        <NavLink
          className={classes.NavLink}
          to="/mypp"
          activeClassName={classes.active}
          exact
        >
          Check my PP
        </NavLink>
        <NavLink
          className={classes.NavLink}
          to="/"
          activeClassName={classes.active}
          exact
        >
          Home
        </NavLink>
      </div>
    </div>
  );
};

export default toolbar;
