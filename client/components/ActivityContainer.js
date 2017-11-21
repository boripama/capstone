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
  constructor() {
    super();
  }

  componentDidMount() {
    // this.props.activity.likes.forEach(like => {
    //   console.log("state user: ", this.props.user);
    //   if (like.id === this.props.user.id) {
    //     this.setState({ liked: true });
    //   }
    // });

  }

  addLike() {
    this.setState({ liked: true });
    this.props.activity.likes.push(this.props.user);
    axios.post('/api/activities/:id/likes', { activityId: this.props.activity.id, userId: this.props.user.id });
  }

  removeLike() {
    this.setState({ liked: false });
    this.props.activity.likes.delete(this.props.user);
    axios.delete('/api/activities/:id/likes', { activityId: this.props.activity.id, userId: this.props.user.id });
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
              this.props.liked
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
    })
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     fetchLikesData: (activityId) => {
//       dispatch(fetchLikes(activityId));
//     }
//   };
// }; moving to eager loading on activity

const mapDispatch = null;


export default connect(mapState, mapDispatch)(ActivityContainer);

