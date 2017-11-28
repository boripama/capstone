import React, { Component } from 'react';
import {
  Image,
  Card,
  Icon,
} from 'semantic-ui-react';
import moment from 'moment';
import { addFollower, deleteFollower } from '../store';
import { connect } from 'react-redux';

class ProfileDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: props.following,
    };
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }

  followUser() {
    this.props.followAUser(this.props.selectedUser.id, this.props.user.id);
    this.setState({ following: true });
  }

  unfollowUser() {
    this.props.unfollowAUser(this.props.selectedUser.id, this.props.user.id);
    this.setState({ following: false });
  }

  render() {
    const { selectedUser } = this.props;
    return (
      <Card>
        <Image src={selectedUser.image} />
        <Card.Content>
          <Card.Header>{selectedUser.name}</Card.Header>
          <Card.Meta>
            <span className="date">{`Member since ${moment(
              selectedUser.createdAt
                .split('T')
                .join(' ')
                .slice(0, 19),
              'YYYY-MM-DD HH-mm-ss',
            )
              .subtract(6, 'hours')
              .fromNow()}`}</span>
          </Card.Meta>
          <Card.Description>{selectedUser.aboutMe}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {selectedUser.totalFollowers === 1
            ? <a><Icon name="user" />{selectedUser.totalFollowers} Follower</a>
            : <a><Icon name="user" />{selectedUser.totalFollowers} Followers</a>
          }
        </Card.Content>
        <Card.Content extra>
          {!this.state.following
            ? <button onClick={this.followUser}> Follow {selectedUser.name} </button>
            : <button onClick={this.unfollowUser}> Unfollow {selectedUser.name} </button>
          }
        </Card.Content>
      </Card>
    );
  };
}

const mapState = (state) => {

  let following = false;

  if (state.followers[0]) {
    state.followers.forEach(follower => {
      if (follower.followerId === state.user.id)
        following = true;
    });
  }

  return {
    user: state.user,
    followers: state.followers,
    selectedUser: state.selectedUser,
    following
  }

};


const mapDispatch = (dispatch) => {
  return {
    followAUser: (userId, followerId) => {
      dispatch(addFollower({ allowed: true, userId, followerId }));
    },
    unfollowAUser: (userId, followerId) => {
      dispatch(deleteFollower(userId, followerId));
    }
  };
};


export default connect(mapState, mapDispatch)(ProfileDescription);
