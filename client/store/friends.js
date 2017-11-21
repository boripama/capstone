import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_FRIENDS = 'GET_FRIENDS';
const REMOVE_FRIENDS = 'REMOVE_FRIENDS';
const ADD_FRIEND = 'ADD_FRIEND';

/**
 * INITIAL STATE
 */
const defaultFriends = {};

/**
 * ACTION CREATORS
 */
const getFriends = friends => ({ type: GET_FRIENDS, friends });
export const removeFriends = () => ({ type: REMOVE_FRIENDS });
const addFriend = friend => ({ type: ADD_FRIEND, friend});

/**
 * THUNK CREATORS
 */
export const fetchFriends = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/');
    dispatch(getFriends(res.data || defaultFriends));
  }
  catch (err) { console.log('Fetching followers unsuccessful', err); }
};

export const addFollower = (follower) => async dispatch => {
  try {
    const res = await axios.post('/api/followers/', follower);
    dispatch(addFriend(res.data || defaultFriends));
  }
  catch (err) { console.log('Adding follower unccessful', err); }
};

/**
 * REDUCER
 */
export default function (state = defaultFriends, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends;
    case REMOVE_FRIENDS:
      return defaultFriends;
    case ADD_FRIEND:
      return [...state, action.friend];
    default:
      return state;
  }
}
