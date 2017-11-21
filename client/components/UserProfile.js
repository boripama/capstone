import React from 'react';
import {
  Image,
  Segment,
  Container,
  Header,
  Button,
  Grid,
  Statistic,
  Input,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NewActivity } from './index';
import { fetchUserActivities, updateUser } from '../store';

// NOTES: The user data is being calculated in the render function of the React component.
// this may need to be refactored if performance becomes an issue.

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.load(+this.props.match.params.id);
  }
  handleSubmit = (evt) => {
    const id = +this.props.match.params.id;
    // if (evt.target.about) this.props.update(id, { about: evt.target.about.value });
    if (evt.target.email) this.props.update(id, { email: evt.target.email.value });
    // if (evt.target.name) this.props.update(id, { name: evt.target.name.value });
  }


  render() {
    const { activities, user } = this.props;
    return (
      <Container>
        {activities.length ?
          <Grid colums={3}>
            <Grid.Column width={4}>
              <Image src="../matthew.png" size="medium" circular />
              <Segment>
                <Header> Matthew</Header>
                <Button> Change Profile Picture</Button>
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
            </Grid.Column>
            <Grid.Column  style={{ margin: '2em' }} width={4}>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <NewActivity props={user} />
              </Grid.Row>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <Button> Change My Password </Button>
              </Grid.Row>
            </Grid.Column>
          </Grid>
          :
          <Grid colums={3}>
            <Grid.Column width={4}>
              <Image src="../matthew.png" size="medium" circular />
              <Segment>
                <Header> Matthew</Header>
                <Button name="profile"> Change Profile Picture</Button>
              </Segment>
              <Statistic.Group horizontal>
                <Statistic>
                  <Statistic.Value> No Activiy Data</Statistic.Value>
                  <Statistic.Label>Total Miles</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>No Activity Data</Statistic.Value>
                  <Statistic.Label>Average Pace (miles/min)</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>No Activity Data</Statistic.Value>
                  <Statistic.Label>Total Runs</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
            <Grid.Column style={{ margin: '2em' }} width={4}>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <Input
                  action="Update"
                  placeholder="Update Name..." />
              </Grid.Row>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <Input action="Update" placeholder="Update About Me..." />
              </Grid.Row>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <Input action="Update" placeholder="Update Email..." />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column  style={{ margin: '2em' }} width={4}>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <NewActivity props={user} />
              </Grid.Row>
              <Grid.Row style={{ padding: '2em 0em' }} >
                <Button> Change My Password </Button>
              </Grid.Row>
            </Grid.Column>
          </Grid>}
      </Container>
    );
  }

}


const mapState = ({activities, user}) => ({activities, user});
const mapDispatch = dispatch => ({
  load: (id) => {
    dispatch(fetchUserActivities(id));
  },
  update: (id, changes) => {
    dispatch(updateUser(id, changes));
  }
});

export default connect(mapState, mapDispatch)(UserProfile);
