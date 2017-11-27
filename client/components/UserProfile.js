import React, { Component } from 'react';
import {
  Container,
  Grid,
} from 'semantic-ui-react';
import { ProfileCard, ProfileDescription, FollowerGroup, ActivityContainer } from './index';
import { connect } from 'react-redux';
import { fetchUserActivities, fetchSelectedUser, fetchSuggested } from '../store';


class UserProfile extends Component {
  constructor() {
    super();
  }

<<<<<<< HEAD
  handleSubmit = evt => {
    const id = +this.props.match.params.id;
    if (evt.target.about) {
      this.props.update(id, { aboutMe: evt.target.about.value });
      evt.target.about.value = '';
    }
    if (evt.target.email) {
      this.props.update(id, { email: evt.target.email.value });
      evt.target.email.value = '';
    }
    if (evt.target.name) {
      this.props.update(id, { name: evt.target.name.value });
      evt.target.name.value = '';
    }
    if (evt.target.zip) {
      this.props.update(id, { zip: evt.target.zip.value });
      evt.target.zip.value = '';
    }
=======
  componentDidMount() {
    this.props.fetchData(this.props.match.params.id);
>>>>>>> d1e34277e365d34dbcee1b8674496b4ed57d1413
  }

  render() {
<<<<<<< HEAD
    const { activities, user } = this.props;
    return (
      <Container>
        {activities.length ?
          <Grid colums={3}>
            <Grid.Column width={4}>
              <Image src={user.image} size="medium" circular />
              <Segment>
                <Header>{user.name ? user.name : user.email }</Header>
                <h3>{user.aboutMe ? user.aboutMe : ''} </h3>
                <ChangeImage />
              </Segment>
              <Statistic.Group horizontal>
                <Statistic>
                  <Statistic.Value>{(activities.map(act => act.distance).reduce((acc, val) => (acc + val))).toFixed(2)}</Statistic.Value>
                  <Statistic.Label>Total Miles</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{((activities.map(act => act.pace).reduce((acc, val) => (acc + val))) / activities.length).toFixed(2)}</Statistic.Value>
                  <Statistic.Label>Average Pace (miles/min)</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{activities.length}</Statistic.Value>
                  <Statistic.Label>Total Runs</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
            <Grid.Column style={{ margin: '2em' }} width={4}>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <Form width={1} onSubmit ={this.handleSubmit}>
                  <Input name="name" action={<Button type="submit" >Update</Button>} placeholder="Update Name..." />
                </Form>
              </Grid.Row>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <Form onSubmit ={this.handleSubmit}>
                  <Input name="about" action={<Button type="submit" >Update</Button>} placeholder="Update About Me..." />
                </Form>
              </Grid.Row>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <Form onSubmit ={this.handleSubmit}>
                  <Input name="email" action={<Button type="submit" >Update</Button>} placeholder="Update Email..." />
                </Form>
              </Grid.Row>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <Form onSubmit ={this.handleSubmit}>
                  <Input name="zip" action={<Button type="submit" >Update</Button>} placeholder="Update Zip..." />
                </Form>
              </Grid.Row>
=======
    const { activities, suggested, selectedUser } = this.props;
    if (activities[0] && selectedUser.id) {
      return (
        <div>
          <Grid centered columns={2}>
            <Grid.Column width={3}>
              <ProfileDescription user={selectedUser} />
>>>>>>> d1e34277e365d34dbcee1b8674496b4ed57d1413
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
    fetchData: (userId) => {
      dispatch(fetchUserActivities(userId));
      dispatch(fetchSelectedUser(userId));
      dispatch(fetchSuggested());
    }
  };
};


export default connect(mapState, mapDispatch)(UserProfile);

