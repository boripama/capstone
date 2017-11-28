import React, { Component } from 'react';
import {
  Container,
  Grid,
  Button,
} from 'semantic-ui-react';
import { ProfileCard, FollowerGroup, ActivityContainer } from './index';
import { connect } from 'react-redux';
import { fetchActivities, fetchSuggested } from '../store';


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
    this.setState({page: this.page });
  }
  changePageBack = () => {
    if (this.page) this.page = this.page - 1;
    this.setState({page: this.page });
  }

  render() {
    const {activities, suggested} = this.props;
    if (activities[0]) {
      let startVal = activities.length - ((this.state.page + 1) * 10);
      let endVal = activities.length - (this.state.page * 10);
      let tenActivities = activities.slice(startVal, endVal);
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
const mapState = ({activities, suggested, user}) => ({activities, suggested, user});

const mapDispatch = (dispatch) => {
  return {
    fetchData: (id) => {
      dispatch(fetchActivities());
      dispatch(fetchSuggested(id));
    }
  };
};


export default connect(mapState, mapDispatch)(AllActivities);

