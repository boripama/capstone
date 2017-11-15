import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UploadActivity = (props) => {
  const {email} = props

    handleFileUpload({ file }) {
    const file = files[0];
    this.props.actions.uploadRequest({
      file,
      name: 'Awesome Cat Pic'
    })
  }
  
  return (
    <div>
      <h3>Welcome, to the activity page {email}</h3>
      <input type="file" onChange={this.handleFileUpload} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    state: state.activity
  }
}

export default connect(mapState)(UploadActivity)

/**
 * PROP TYPES
 */
UploadActivity.propTypes = {
  state: state.activity
}


// Component method

  
// Component render
