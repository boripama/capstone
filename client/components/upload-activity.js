import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UploadActivity = (props) => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, to the activity page {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UploadActivity)

/**
 * PROP TYPES
 */
UploadActivity.propTypes = {
  email: PropTypes.string
}
