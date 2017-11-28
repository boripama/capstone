import React, { Component } from 'react';
import {
  Container,
  Grid,
  Button,
} from 'semantic-ui-react';
import { ProfileCard, FollowerGroup, ActivityContainer } from './index';
import { connect } from 'react-redux';
import { fetchActivities, fetchSuggested, fetchFollowing } from '../store';


class AllActivities extends Component {
  constructor() {
    super();
    this.page = 0;
  }
  state = { page: 0 };


  componentDidMount() {
    this.props.fetchData(this.props.user.id);
  }

  changePageForward = () => {
    this.page = this.page + 1;
    this.setState({ page: this.page });
  }
  changePageBack = () => {
    if (this.page) this.page = this.page - 1;
    this.setState({ page: this.page });
  }

  render() {
    const { activities, suggested, followers } = this.props;
    let newActivities = [];

    if (activities.length) {

      if (followers.length) {
        let ids = []
        followers.forEach(follower => {
          ids.push(follower.id);
        })
        newActivities = activities.filter(activity => {
          return ids.includes(activity.userId);
        })
      }

      let startVal = newActivities.length - ((this.state.page + 1) * 10);
      let endVal = newActivities.length - (this.state.page * 10);
      let tenActivities = newActivities.slice(startVal, endVal);
      return (
        <div>
          <Grid centered columns={2}>
            <Grid.Column width={3}>
              <ProfileCard />
              <Button style={{ margin: '1em 0em' }} onClick={this.changePageForward}>Next Ten Activities </Button>
              <Button style={{ margin: '1em 0em' }} onClick={this.changePageBack}>Previous Ten Activities </Button>
            </Grid.Column>
            <Grid.Column width={11}>
              <Grid.Row>
                <FollowerGroup suggested={suggested} />
              </Grid.Row>
              <Grid.Row>
                <br />
                <Container width={11}>
                  {
                    tenActivities.map(activity => {
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
const mapState = ({ activities, suggested, user, followers }) => ({ activities, suggested, user, followers });

const mapDispatch = (dispatch) => {
  return {
    fetchData: (id) => {
      dispatch(fetchActivities());
      dispatch(fetchSuggested(id));
      dispatch(fetchFollowing(id));
    }
  };
};


export default connect(mapState, mapDispatch)(AllActivities);

