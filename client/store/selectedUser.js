import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_SELECTED_USER = 'GET_SELECTED_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getSelectedUser = user => ({type: GET_SELECTED_USER, user});

/**
 * THUNK CREATORS
 */
export const fetchSelectedUser = (id) =>
  dispatch =>
    axios.get(`/users/${id}`)
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_SELECTED_USER:
      return action.selectedUser;
    default:
      return state;
  }
}
