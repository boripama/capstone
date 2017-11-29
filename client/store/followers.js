import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_FOLLOWERS = 'GET_FOLLOWERS';
const GET_USER_FOLLOWERS = 'GET_USER_FOLLOWERS';
const GET_FOLLOWING = 'GET_FOLLOWING';
const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER';
const REMOVE_FOLLOWERS = 'REMOVE_FOLLOWERS';
const ADD_FOLLOWER = 'ADD_FOLLOWER';

/**
 * INITIAL STATE
 */
const defaultFollowers = [];

/**
 * ACTION CREATORS
 */
const getFollowers = followers => ({ type: GET_FOLLOWERS, followers });
const getUserFollowers = followers => ({ type: GET_USER_FOLLOWERS, followers });
const getFollowing = followers => ({ type: GET_FOLLOWING, followers });
const removeFollower = (followerId) => ({ type: REMOVE_FOLLOWER, followerId });
export const removeFollowers = () => ({ type: REMOVE_FOLLOWERS });
const createFollower = follower => ({ type: ADD_FOLLOWER, follower });

/**
 * THUNK CREATORS
 */
export const fetchFollowers = () => async dispatch => {
  try {
    const res = await axios.get('/api/followers/');
    dispatch(getFollowers(res.data || defaultFollowers));
  }
  catch (err) { console.log('Fetching followers unsuccessful', err); }
};

export const fetchUserFollowers = (userId) => async dispatch => {
  try {
    const res = await axios.get(`/api/followers/${userId}`);
    dispatch(getUserFollowers(res.data || defaultFollowers));
  }
  catch (err) { console.log('Fetching followers unsuccessful', err); }
};

export const fetchFollowing = (userId) => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/following`);
    dispatch(getFollowing(res.data || defaultFollowers));
  }
  catch (err) { console.log('Fetching following unsuccessful', err); }
}

export const addFollower = (follower) => async dispatch => {
  try {
    const res = await axios.post('/api/followers/', follower);
    dispatch(createFollower(res.data || defaultFollowers));
  }
  catch (err) { console.log('Adding follower unsuccessful', err); }
};

export const deleteFollower = (userId, followerId) => async dispatch => {
  try {
    dispatch(removeFollower(followerId));
    await axios.delete(`/api/users/${userId}/followers/${followerId}`);
  }
  catch (err) { console.log('Deleting follower unsucessful', err); }
};


/**
 * REDUCER
 */
export default function (state = defaultFollowers, action) {
  switch (action.type) {
    case GET_FOLLOWERS:
      return action.followers;
    case GET_USER_FOLLOWERS:
      return action.followers;
    case GET_FOLLOWING:
      return action.followers;
    case REMOVE_FOLLOWER:
      {
        return state.filter(follower => {
          return (follower.id !== action.followerId)
        })
      }
    case REMOVE_FOLLOWERS:
      return defaultFollowers;
    case ADD_FOLLOWER:
      return [...state, action.follower];
    default:
      return state;
  }
}
