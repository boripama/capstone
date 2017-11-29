import React, { Component } from 'react';
import {
  Container,
  Grid,
  Select,
  Icon,
} from 'semantic-ui-react';
import { NewActivity, ProfileCard, ProfileDescription, FollowerGroup, ActivityContainer } from './index';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchUserActivities, fetchSelectedUser, fetchUserFollowers, fetchSuggested, fetchLikedActivities } from '../store';


class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      selectedActivity: 0
    }
    this.linkToActivity = this.linkToActivity.bind(this);
  }

  componentDidMount() {
    this.props.fetchData(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.fetchData(this.props.match.params.id);
    }
  }

  linkToActivity() {
    this.props.history.push(`/activity/${this.state.selectedActivity}`);
  }

  handleChange(event, data) {
    this.setState({ selectedActivity: data.value })
  }

  render() {
    const { activities, user, followers, selectedUser, suggested, likedActivities } = this.props;
    if (selectedUser.id) {
      return (
        <Grid centered columns={2}>
          <Grid.Column width={11}>
            <Grid.Row>
              <br />
              <Container width={11}>
                {activities[0]
                  ? activities.slice(-10).map(activity => {
                    return (
                      <ActivityContainer key={activity.id} activity={activity}>{activity.title}</ActivityContainer>
                    );
                  })
                  : selectedUser.id === user.id
                    ? <h1>
                      Yo, runner... go upload some activities!
                      <br />
                      <NewActivity />
                    </h1>
                    : <div>
                      <h1>
                        {selectedUser.name} needs some activities! Send them some
                        <a href={'mailto:' + selectedUser.email}> encouragement</a>.
                      </h1>
                    </div>
                }
              </Container>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={3}>
            <Grid.Row>
              {user.id === selectedUser.id
                ? <ProfileCard />
                : <ProfileDescription />
              }
            </Grid.Row>
            <Grid.Row>
              <br />
              <br />
              {likedActivities.length
                ? <div>
                  <Select
                    onChange={(event, data) => this.handleChange(event, data)}
                    placeholder="Select an activity I've Liked"
                    options={
                      likedActivities.map(activity =>
                        ({
                          text: activity.title,
                          value: activity.id
                        })
                      )
                    }
                  >
                  </Select>
                  <br />
                  <br />
                  <button onClick={this.linkToActivity}>Go To Activity</button>
                </div>
                : <div />
              }
            </Grid.Row>
            <Grid.Row>
              <br />
              <br />
              <p>Followers: </p>
              {followers.length
                ? followers.map(follower => {
                  return (<div key={follower.id}>
                    <small>
                      {follower.name
                        ? <Link to={`/profile/${follower.id}`}><Icon name="user" />{follower.name}</Link>
                        : <Link to={`/profile/${follower.id}`}><Icon name="user" />{follower.email}</Link>
                      }
                      {user.id === selectedUser.id
                        ? <p>Potato</p>
                        : <p />
                      }
                    </small>
                  </div>);
                })
                : null
              }
            </Grid.Row>
          </Grid.Column>
        </Grid >
      );
    }
    else { return null; }
  }
}
/**
 * CONTAINER
 */

const mapState = (state, ownProps) => {
  return {
    activities: state.activities,
    user: state.user,
    followers: state.followers,
    selectedUser: state.selectedUser,
    suggested: state.suggested,
    likedActivities: state.likedActivities,
    ownProps
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchData: (userId) => {
      dispatch(fetchUserActivities(userId));
      dispatch(fetchSelectedUser(userId));
      dispatch(fetchUserFollowers(userId));
      dispatch(fetchSuggested(userId));
      dispatch(fetchLikedActivities(userId));
    }
  };
};


export default withRouter(connect(mapState, mapDispatch)(UserProfile));
