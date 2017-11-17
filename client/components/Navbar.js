import React from 'react';
import {
  Segment,
  Menu,
  Container,
  Divider,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Navbar = () => {

  return (
    <Segment
      inverted
      textAlign="center"
      style={{ padding: '0em 0em' }}
      vertical
    >
      <Container>
        <Menu inverted pointing secondary size="large">
          <Menu.Item as={Link} to="/home">Home</Menu.Item>
          <Menu.Item as={Link} to="/activity/1">Activity 1</Menu.Item>
          <Menu.Item as={Link} to="/uploadActivity">Upload Activity</Menu.Item>
          <Menu.Item as={Link} to="/activities">Activities</Menu.Item>
          <Menu.Item as={Link} to="/login">Login</Menu.Item>
          <Menu.Item as={Link} to="/signup">Sign Up</Menu.Item>
          <Menu.Item as={Link} to="/user">Account</Menu.Item>
        </Menu>
      </Container>
      <Divider inverted />
    </Segment>
  );
};

export default Navbar;
