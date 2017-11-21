import React, { Component } from 'react';
import axios from 'axios';
import {
  Segment,
  Grid,
  Header,
} from 'semantic-ui-react';
import { Comments, MapContainer } from './index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLikes } from '../store';


class ActivityContainer extends Component {
  constructor() {
    super();
    this.state = {
      liked: false
    };
  }

  componentDidMount() {
    this.fetchLikesData(this.props.activity.id);
  }

  addLike() {
    this.setState({ liked: true });
    axios.post('/api/activities/:id/likes', this.props.activity, this.state.user.id);
  }

  removeLike() {
    this.setState({ liked: false });
    axios.delete('/api/activities/:id/likes', { activityId: this.props.activity.id, userId: this.state.user.id });
  }

  render() {
    return (
      <Segment>
        <Header size="large">
          {<Link to={`/activity/${this.props.activity.id}`}>{this.props.activity.title}</Link>}
        </Header>
        <Grid columns={2}>
          <Grid.Column>
            <MapContainer poly={this.props.activity.polyline} />
          </Grid.Column>
          <Grid.Column>
            <div>
              <Header size="small">Duration: </Header> {this.props.activity.durationTimestamp} min
            </div>
            <br /><br /><br /><br />
            <div>
              <Header size="small">Pace: </Header> {this.props.activity.pace} min/mile
            </div>
            <br /><br /><br /><br />
            <div>
              <Header size="small">Miles: </Header> {this.props.activity.distance} miles
            </div>
            {
              this.state.liked
                ? <button onClick={this.removeLike}>Unlike</button>
                : <button onClick={this.addLike}>Like</button>
            }
          </Grid.Column>
        </Grid>
        <Comments />
      </Segment>
    );
  }
}


const mapState = (state) => {
  return {
    user: state.user,
    likes: state.likes
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchLikesData: (activityId) => {
      dispatch(fetchLikes(activityId));
    }
  };
};


export default connect(mapState, mapDispatch)(ActivityContainer);

