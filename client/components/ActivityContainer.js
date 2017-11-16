import React from 'react';
import {
  Image,
  Segment,
  Grid,
  Header,
} from 'semantic-ui-react';
import { Comments, Map } from './index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// <Image src="square-image.png" size="medium" rounded />

const ActivityContainer = (props) => {
  return (
    <Segment>
      <Header size="large">
        {<Link to={`/activity/${props.activity.id}`}>{props.activity.title}</Link>}
      </Header>
      <Grid columns={2}>
        <Grid.Column>
          <Map polyline={props.activity.route} />
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

