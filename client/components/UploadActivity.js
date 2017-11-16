import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadFileRequest } from '../store';

/**
 * COMPONENT
 */
const UploadActivity = props => {
  const { handleFileUpload, user } = props;
  const handleUpload = event => {
    handleFileUpload(event, user.id);
  };

  return (
    <div>
      <h3>Please choose a GPX file to upload</h3>
      <input type="file" onChange={handleUpload} />
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
    handleFileUpload: (event, userId) => {
      const file = event.target.files[0];
      dispatch(uploadFileRequest(file, userId));
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
