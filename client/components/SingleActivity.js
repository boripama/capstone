import React from 'react'
import { connect } from 'react-redux'

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


export default connect(mapState)(SingleActivity)

