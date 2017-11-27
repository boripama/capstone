import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_FOLLOWERS = 'GET_FOLLOWERS';
const REMOVE_FOLLOWERS = 'REMOVE_FOLLOWERS';
const ADD_FOLLOWER = 'ADD_FOLLOWER';

/**
 * INITIAL STATE
 */
const defaultFollowers = {};

/**
 * ACTION CREATORS
 */
const getFollowers = followers => ({ type: GET_FOLLOWERS, followers });
export const removeFollowers = () => ({ type: REMOVE_FOLLOWERS });
const createFollower = follower => ({ type: ADD_FOLLOWER, follower});

/**
 * THUNK CREATORS
 */
export const fetchFollowers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/');
    dispatch(getFollowers(res.data || defaultFollowers));
  }
  catch (err) { console.log('Fetching followers unsuccessful', err); }
};

export const addFollower = (follower) => async dispatch => {
  try {
    const res = await axios.post('/api/followers/', follower);
    dispatch(createFollower(res.data || defaultFollowers));
  }
  catch (err) { console.log('Adding follower unccessful', err); }
};

/**
 * REDUCER
 */
export default function (state = defaultFollowers, action) {
  switch (action.type) {
    case GET_FOLLOWERS:
      return action.followers;
    case REMOVE_FOLLOWERS:
      return defaultFollowers;
    case ADD_FOLLOWER:
      return [...state, action.follower];
    default:
      return state;
  }
}