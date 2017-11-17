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
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NewActivity } from './index';
import { fetchUserActivities } from '../store';

// NOTES: The user data is being calculated in the render function of the React component.
// this may need to be refactored if performance becomes an issue.

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.load(+this.props.match.params.id);
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
                  <Statistic.Value>{(activities.map(act => act.length).reduce((acc, val) => (acc + val))).toFixed(2)}</Statistic.Value>
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
          </Grid>
          :
          <div />}
      </Container>
    );
  }

}


const mapState = ({activities, user}) => ({activities, user});
const mapDispatch = dispatch => ({
  load: (id) => {
    dispatch(fetchUserActivities(id));
  },
});

export default connect(mapState, mapDispatch)(UserProfile);
