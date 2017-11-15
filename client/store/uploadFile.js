import axios from 'axios'
import history from '../history'

const UPLOAD_FILE = 'UPLOAD_FILE';
const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
const UPLOAD_FILE_FAIL = "UPLOAD_FILE_FAIL";

// Redux action
export function uploadSuccess({ data }) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    data,
  };
}

export function uploadFail(error) {
  return {
    type: UPLOAD_FILE_FAIL,
    error,
  };
}

export function uploadFileRequest({ file, name }) {  
  let data = new FormData();
  data.append('file', document);
  data.append('name', name);

  return (dispatch) => {
    axios.post('/files', data)
      .then(response => dispatch(uploadSuccess(response))
      .catch(error => dispatch(uploadFail(error))
      )
    );
  };
}

//  ... A lot of Redux / React boilerplate happens here 
//  like mapDispatchToProps and mapStateToProps and @connect ...
// */

// // Component method
// handleFileUpload({ file }) {
//   const file = files[0];
//   this.props.actions.uploadRequest({
//      file,
//      name: 'Awesome Cat Pic'
//   })
// }
  
// // Component render
// <input type="file" onChange={this.handleFileUpload} /
