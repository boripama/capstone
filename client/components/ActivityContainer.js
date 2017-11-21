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


class ActivityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: props.liked
    };
    this.removeLike = this.removeLike.bind(this);
    this.addLike = this.addLike.bind(this);
  }

  addLike() {
    this.setState({liked: true});
    axios.post(`/api/activities/${this.props.activity.id}/like`);
  }

  removeLike() {
    this.setState({liked: false});
    axios.delete(`/api/activities/${this.props.activity.id}/like`);
  }

  render() {
    console.log('STATE: ', this.state);
    return (
      <Segment>
        <Header size="large">
          {<Link to={`/activity/${this.props.activity.id}`}>{this.props.activity.title}</Link>}
        </Header>
        <Grid columns={2}>
          <Grid.Column>
            <MapContainer activity={this.props.activity} />
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
            <div>
              <Header size="small">Likes: </Header>
              {
                this.props.activity.likes.map(like => {
                  return (
                    <small key={like.id} > {like.email} </small>
                  );
                })
              }
            </div>
          </Grid.Column>
        </Grid>
        <Comments />
      </Segment>
    );
  }
}


const mapState = (state, ownProps) => {
  return {
    user: state.user,
    liked: ownProps.activity.likes.some(like => {
      return like.id === state.user.id;
    }),
  };
};

const mapDispatch = null;


export default connect(mapState, mapDispatch)(ActivityContainer);

