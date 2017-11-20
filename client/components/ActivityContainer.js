import React from 'react';
import {
  Segment,
  Grid,
  Header,
} from 'semantic-ui-react';
import { Comments, MapContainer } from './index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const ActivityContainer = (props) => {
  return (
    <Segment>
      <Header size="large">
        {<Link to={`/activity/${props.activity.id}`}>{props.activity.title}</Link>}
      </Header>
      <Grid columns={2}>
        <Grid.Column>
          <MapContainer poly={props.activity.polyline} />
        </Grid.Column>
        <Grid.Column>
          <div>
            <Header size="small">Duration: </Header> {props.activity.durationTimestamp} min
          </div>
          <br /><br /><br /><br />
          <div>
            <Header size="small">Pace: </Header> {props.activity.pace} min/mile
          </div>
          <br /><br /><br /><br />
          <div>
            <Header size="small">Miles: </Header> {props.activity.distance} miles
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

