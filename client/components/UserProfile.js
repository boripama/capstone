import React, { Component } from 'react';
import {
  Container,
  Grid,
} from 'semantic-ui-react';
import { ProfileCard, ProfileDescription, FollowerGroup, ActivityContainer } from './index';
import { connect } from 'react-redux';
import { fetchUserActivities, fetchSelectedUser, fetchSuggested } from '../store';


class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('userprofile data fetched', this.props.match.params.id);
    this.props.fetchData(this.props.match.params.id);
  }

  render() {
    const { activities, suggested, selectedUser } = this.props;
    if (activities[0] && selectedUser.id) {
      return (
        <div>
          <Grid centered columns={2}>
            <Grid.Column width={3}>
              <ProfileDescription user={selectedUser} />
            </Grid.Column>
            <Grid.Column width={11}>
              <Grid.Row>
                <FollowerGroup suggested={suggested} />
              </Grid.Row>
              <Grid.Row>
                <br />
                <Container width={11}>
                  {
                    activities.slice(-10).map(activity => {
                      return (
                        <ActivityContainer key={activity.id} activity={activity}>{activity.title}</ActivityContainer>
                      );
                    })
                  }
                </Container>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
    else if (selectedUser.id) {
      return (
        <div>
          <Grid centered columns={2}>
            <Grid.Column width={3}>
              <ProfileDescription user={selectedUser} />
            </Grid.Column>
            <Grid.Column width={11}>
              <Grid.Row>
                <FollowerGroup suggested={suggested} />
              </Grid.Row>
              <Grid.Row>
                <br />
                <Container width={11}>
                  You have no activities~!
                </Container>
              </Grid.Row>
            </Grid.Column>

          </Grid>
        </div>
      );
    }
    else { return null; }
  }
}
/**
 * CONTAINER
 */
const mapState = ({ activities, selectedUser, suggested }) => ({ activities, selectedUser, suggested });

const mapDispatch = (dispatch) => {
  return {
    fetchData (userId) {
      console.log('fetchData', userId);
      dispatch(fetchUserActivities(userId));
      dispatch(fetchSelectedUser(userId));
      dispatch(fetchSuggested(userId));
    }
  };
};


export default connect(mapState, mapDispatch)(UserProfile);

