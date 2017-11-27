import React, { Component } from 'react';
import {
  Container,
  Grid,
} from 'semantic-ui-react';
import { ProfileCard, FollowerGroup, ActivityContainer } from './index';
import { connect } from 'react-redux';
import { fetchUserActivities, fetchSelectedUser, fetchSuggested } from '../store';


class UserProfile extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchData(this.props.match.params.id);
  }

  render() {
    const { activities, suggested, selectedUser } = this.props;
    if (activities[0]) {
      return (
        <div>
          <Grid centered columns={2}>
            <Grid.Column width={3}>
              <ProfileCard user={selectedUser}/>
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
    else {
      return (
        <div>
          <Grid centered columns={2}>
            <Grid.Column width={3}>
              <ProfileCard />
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
  }
}
/**
 * CONTAINER
 */
const mapState = ({ activities, suggested }) => ({ activities, suggested });

const mapDispatch = (dispatch) => {
  return {
    fetchData: (userId) => {
      dispatch(fetchUserActivities(userId));
      dispatch(fetchSelectedUser(userId));
      dispatch(fetchSuggested());
    }
  };
};


export default connect(mapState, mapDispatch)(UserProfile);

