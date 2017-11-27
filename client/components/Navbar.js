import React from 'react';
import {
  Segment,
  Menu,
  Container,
  Divider,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../store/index';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Navbar = (props) => {
  const {
    user,
    handleClick,
  } = props;

  return (
    <Segment
      inverted
      textAlign="center"
      style={{ padding: '0em 0em' }}
      vertical
    >

      {
        user.id ?
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item as={Link} to="/home">Home</Menu.Item>
              <Menu.Item as={Link} to="/uploadActivity">Upload Activity</Menu.Item>
              <Menu.Item as={Link} to="/activities">Activities</Menu.Item>
              <Menu.Item as={Link} to={`/profile/${user.id}`}>My Profile</Menu.Item>
              <Menu.Item as={Link} onClick={handleClick} to="/login">Logout</Menu.Item>
              <Menu.Item as={Link} to={`/users/${user.id}`}>Account</Menu.Item>
            </Menu>
          </Container>
          :
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item as={Link} to="/login">Login</Menu.Item>
              <Menu.Item as={Link} to="/signup">Sign Up</Menu.Item>
            </Menu>
          </Container>
      }

      <Divider inverted />
    </Segment>
  );
};

const mapState = ({ user }) => ({ user });

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};
export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
