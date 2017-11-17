import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ACTIVITIES = 'GET_ACTIVITIES'

/**
 * INITIAL STATE
 */
const defaultActivities = {}

/**
 * ACTION CREATORS
 */
const getActivities = activities => ({ type: GET_ACTIVITIES, activities })

/**
 * THUNK CREATORS
 */
export const fetchActivities = () => async dispatch => {
  try {
    const res = axios.get(`/api/activites/`);
    dispatch(getActivities(res.data || defaultActivities));
  }
  catch (err) { console.log('Fetching activities unsuccessful', err); }
};

export const fetchUserActivities = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/activities/`);
    console.log('resdata', res.data);
    dispatch(getActivities(res.data || defaultActivities));
  }
  catch (err) {console.log('Fetching activites unccessful', err); }
};

/**
 * REDUCER
 */
export default function (state = defaultActivities, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return action.activities
    default:
      return state
  }
}
