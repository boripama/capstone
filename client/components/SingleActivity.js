import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActivity, removeActivity } from '../store';

class SingleActivity extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchActivityData(this.props.match.params.id);
  }

  render() {
    if (this.props.activity.id) {
      return (
        <div>
          <h1>Single Activity Basic View</h1>
          <p>Single Activity ID: {this.props.activity.id}</p>
          <p>Title: {this.props.activity.title}</p>
          <p>Length: {this.props.activity.length}</p>
          <p>Route: {this.props.activity.route}</p>
          <p>Start Time: {this.props.activity.start}</p>
          <p>End Time: {this.props.activity.end}</p>
        </div>
      );
    }
    else { return null; }
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    activity: state.activity
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchActivityData: (activityId) => {
      dispatch(fetchActivity(activityId));
    },
    removeActivity: (activityId) => {
      dispatch(removeActivity(activityId));
    },
  };
};


export default connect(mapState, mapDispatch)(SingleActivity);

