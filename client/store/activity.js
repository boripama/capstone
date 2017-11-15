import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const NEW_ACTIVITY = 'NEW_ACTIVITY'
const GET_ACTIVITY = 'GET_ACTIVITY'
const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY'

/**
 * INITIAL STATE
 */
const defaultActivity = {}

/**
 * ACTION CREATORS
 */
const newActivity = activity => ({ type: NEW_ACTIVITY, activity })
const getActivity = activity => ({ type: GET_ACTIVITY, activity })
const removeActivity = () => ({ type: REMOVE_ACTIVITY })

/**
 * THUNK CREATORS
 */
export const fetchActivity = id => async dispatch => {
  try {
    const res = axios.get(`/api/activites/${id}`)
    dispatch(getActivity(res.data || defaultActivity));
  }
  catch (err) { console.log('Fetching activity unsuccessful', err); }
}

export const createActivity = (activity, userId) => async dispatch => {
  try {
    dispatch(newActivity((await axios.post('/api/activities', activity, userId)).data));
  }
  catch (err) { console.error('Creating review unsuccessful', err); }
};

export const deleteActivity = id => async dispatch => {
  try {
    dispatch(removeActivity(id));
    await axios.delete(`/api/activities/${id}`);
  }
  catch (err) { console.error('Deleting activity unsuccessful', err); }
}



/**
 * REDUCER
 */
export default function (state = defaultActivity, action) {
  switch (action.type) {
    case NEW_ACTIVITY:
      return action.activity
    case GET_ACTIVITY:
      return action.activity
    case REMOVE_ACTIVITY:
      return defaultActivity
    default:
      return state
  }
}
