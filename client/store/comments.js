import axios from 'axios';



const NEW_COMMENT = 'NEW_COMMENT';
const GET_COMMENTS = 'GET_COMMENTS';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

const defaultComment = {};

const newComment = comment => ({ type: NEW_COMMENT, comment });
const getComments = comments => ({ type: GET_COMMENTS, comments });
const removeComment = comment => ({ type: REMOVE_COMMENT, comment });


export const fetchComment = id => async dispatch => {
  try {
    const res = await axios.get(`api/activities/${id}/comments`);
    dispatch(getComments(res.data || defaultComment));
  }
  catch (err) {
    console.log('Fetching comment unsuccessful', err);
  }
};

export const createComment = (comment, userId, activityId) => async dispatch => {
  try {
    dispatch(newComment((await axios.post(`/api/activities/${activityId}/comments`, comment, userId, activityId)).data));
  }
  catch (err) {
    console.error('Creating comment unsuccessful', err);
  }
};

export const deleteComment = id => async dispatch => {
  try {
    dispatch(removeComment(id));
    await axios.delete(`api/comments/${id}`);
  }
  catch (err) {
    console.error('Deleting comment unsuccessful', err);
  }
};


export default function (state = defaultComment, action) {
  switch (action.type) {
    case NEW_COMMENT:
      return action.comment;
    case GET_COMMENTS:
      return action.comment;
    case REMOVE_COMMENT:
      return defaultComment;
    default:
      return state;
  }
}