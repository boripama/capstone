import React, { Component } from 'react';
import {
  Container,
  Grid,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchActivity, removeActivity } from '../store';
import { ProfileCard, ActivityContainer } from './index';

class SingleActivity extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchActivityData(this.props.match.params.id);
  }

  render() {
    if (this.props.activity.id) {
      return (
        <div>
          <Grid centered columns={2}>
            <Grid.Column width={3}>
              <ProfileCard />
            </Grid.Column>
            <Grid.Column width={11}>
              <Grid.Row>
                <br />
                <Container width={11}>

                  <h1>{this.props.activity.title}</h1>
                  <p>Single Activity ID: {this.props.activity.id}</p>
                  <p>Length: {this.props.activity.totalDistance}</p>
                  <p>Route: {this.props.activity.polyline}</p>
                  <p>Start Time: {this.props.activity.startTime}</p>
                  <p>End Time: {this.props.activity.endTime}</p>
                  <p>Duration: {this.props.activity.durationMs}</p>
                  {<p>Pace: {this.props.activity.pace}</p>}
                  <ActivityContainer key={this.props.activity.id} activity={this.props.activity}>{this.props.activity.title}</ActivityContainer>

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
    activity: state.activity
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchActivityData: (activityId) => {
      dispatch(fetchActivity(activityId));
    },
    removeActivity: (activityId) => {
      dispatch(removeActivity(activityId));
    },
  };
};


export default connect(mapState, mapDispatch)(SingleActivity);

