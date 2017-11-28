import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_SELECTED_USER = 'GET_SELECTED_USER';
const UPDATE_TOTAL_FOLLOWERS = 'UPDATE_TOTAL_FOLLOWERS';


/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getSelectedUser = selectedUser => ({ type: GET_SELECTED_USER, selectedUser });
const updateFollowers = (offset) => ({ type: UPDATE_TOTAL_FOLLOWERS, offset })

/**
 * THUNK CREATORS
 */
export const fetchSelectedUser = (id) =>
  dispatch =>
    axios.get(`/api/users/${id}`)
      .then(res =>
        dispatch(getSelectedUser(res.data || defaultUser)))
      .catch(err => console.log(err));

export const updateTotalFollowers = (offset) => (dispatch) => {
  dispatch(updateFollowers(offset));
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_SELECTED_USER:
      return action.selectedUser;
    case UPDATE_TOTAL_FOLLOWERS:
      {
        let updatedUser = state;
        updatedUser.totalFollowers += action.offset;
        return updatedUser;
      }
    default:
      return state;
  }
}
