import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadFileRequest } from '../store';

/**
 * COMPONENT
 */
const UploadActivity = props => {
  const { handleFileUpload, user } = props;

  console.log('uploadactivity props', props);

  return (
    <div>
      <h3>Please choose a GPX file to upload</h3>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    activity: state.activity,
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    handleFileUpload: file => {
      console.log('handleUpload file', file);
      // console.log('handleUpload state', this.state);
      // console.log('this.props.user.id', this.props.user.id);
      // dispatch(uploadFileRequest(file[0]), this.props.user.id);
    }
  };
};

export default connect(mapState, mapDispatch)(UploadActivity);

/**
 * PROP TYPES
 */
// UploadActivity.propTypes = {
//   state: state.activity
// };


// Component method


// Component render
