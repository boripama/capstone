import React, { Component } from 'react';
import {
  Container,
  Grid,
} from 'semantic-ui-react';
import { ProfileCard, FriendGroup, ActivityContainer } from './index';
import { connect } from 'react-redux';
import { fetchActivities } from '../store';


class AllActivities extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchActivitiesData();
  }

  render() {
    if (this.props.activities[0]) {
      return (
        <div>
          <Grid centered columns={2}>
            <Grid.Column width={3}>
              <ProfileCard />
            </Grid.Column>
            <Grid.Column width={11}>
              <Grid.Row>
                <FriendGroup />
              </Grid.Row>
              <Grid.Row>
                <br />
                <Container width={11}>
                  {
                    this.props.activities.slice(-10).map(activity => {
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
    else { return null; }
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    activities: state.activities
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchActivitiesData: () => {
      dispatch(fetchActivities());
    }
  };
};


export default connect(mapState, mapDispatch)(AllActivities);

