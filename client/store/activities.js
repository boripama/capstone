import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ACTIVITIES = 'GET_ACTIVITIES'
const REMOVE_ACTIVITIES = 'REMOVE_ACTIVITIES'

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
    const res = axios.get(`/api/activites/`)
    dispatch(getActivities(res.data || defaultActivities));
  }
  catch (err) { console.log('Fetching activities unsuccessful', err); }
}

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
