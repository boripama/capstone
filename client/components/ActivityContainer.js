import React from 'react';
import {
  Image,
  Segment,
  Grid,
  Header,
} from 'semantic-ui-react';
import {Comments} from './index';
import { connect } from 'react-redux';

const ActivityContainer = () => {
  return (
    <Segment>
      <Header size="large">First Activity</Header>
      <Grid columns={2}>
        <Grid.Column>
          <Image src="square-image.png" size="medium" rounded />
        </Grid.Column>
        <Grid.Column>
          <div>
            <Header size="small">Duration: </Header> 7.5 min
          </div>
          <br /><br /><br /><br />
          <div>
            <Header size="small">Pace: </Header> 5.00 min/mile
          </div>
          <br /><br /><br /><br />
          <div>
            <Header size="small">Miles: </Header> 1.5 miles
          </div>
        </Grid.Column>
      </Grid>
      <Comments />
    </Segment>

  );

};


const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ActivityContainer);

