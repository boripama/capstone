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
import { fetchUserActivities } from '../store';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.props.load();
  }

    
  render() {
    return (
      <Container>
        <Grid colums={3}>
          <Grid.Column width={4}>
            <Image src="matthew.png" size="medium" circular />
            <Segment>
              <Header> Matthew</Header>
              <Button> Change Profile Picture</Button>
            </Segment>
            <Statistic.Group horizontal>
              <Statistic>
                <Statistic.Value>204</Statistic.Value>
                <Statistic.Label>Total Miles</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>7:04</Statistic.Value>
                <Statistic.Label>Average Pace</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>22</Statistic.Value>
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
              <Button> Upload .gpx Files</Button>
            </Grid.Row>
            <Grid.Row style={{ padding: '2em 0em' }} >
              <Button> Change My Password </Button>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }

}


const mapState = null;
const mapDispatch = dispatch => ({
  load: () => {
    console.log('fetch');
    dispatch(fetchUserActivities(1));
  },
});

export default connect(mapState, mapDispatch)(UserProfile);
