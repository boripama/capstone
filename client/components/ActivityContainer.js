import React from 'react';
import {
  Image,
  Segment,
  Grid,
  Header,
} from 'semantic-ui-react';
import {Comments} from './index';
import { connect } from 'react-redux';

const ActivityContainer = (props) => {
  return (
    <Segment>
      <Header size="large">{props.activity.title}</Header>
      <Grid columns={2}>
        <Grid.Column>
          <Image src="square-image.png" size="medium" rounded />
        </Grid.Column>
        <Grid.Column>
          <div>
            <Header size="small">Duration: </Header> {props.activity.duration} min
          </div>
          <br /><br /><br /><br />
          <div>
            <Header size="small">Pace: </Header> {props.activity.pace} min/mile
          </div>
          <br /><br /><br /><br />
          <div>
            <Header size="small">Miles: </Header> {props.activity.length} miles
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

