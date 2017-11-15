import React from 'react'
import { connect } from 'react-redux'
import { removeActivity } from '../store'

const SingleActivity = (props) => {

  return (
    <div>
      <h1>Single Activity Basic View</h1>
      <p>Single Activity ID: {props.activity.id}</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    activity: state.activity
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeActivity: (activityId) => {
      dispatch(removeActivity(activityId));
    },
  };
};


export default connect(mapState, mapDispatch)(SingleActivity)

