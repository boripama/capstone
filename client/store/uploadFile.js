import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
// const UPLOAD_FILE = 'UPLOAD_FILE';
const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
const UPLOAD_FILE_FAIL = 'UPLOAD_FILE_FAIL';

/**
 * INITIAL STATE
 */
const upload = {};

/**
 * ACTION CREATORS
 */
const uploadSuccess = ({ data }) => ({ type: UPLOAD_FILE_SUCCESS, data });

const uploadFail = error => ({ type: UPLOAD_FILE_FAIL, error });

/**
 * THUNK CREATORS
 */
export const uploadFileRequest = ({ file, name }) => {
  let data = new FormData();
  data.append('file', file);
  data.append('name', name);

  return async dispatch => {
    axios.post('/files', data)
      .then(response => dispatch(uploadSuccess(response))
      .catch(error => dispatch(uploadFail(error))
      )
    );
  };
};
