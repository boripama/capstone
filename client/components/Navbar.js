import React from 'react';
import { withRouter, NavLink, Link } from 'react-router-dom';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Navbar = (props) => {

  return (
    <div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/activity/1">Activity 1</NavLink>
        <NavLink to="/uploadActivity">Upload Activity</NavLink>
        <NavLink to="/activities">Activity</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
