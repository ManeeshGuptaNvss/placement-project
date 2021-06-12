import {
  STUDENT_DETAILS_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_RESET,
  STUDENT_DETAILS_SUCCESS,
  UPDATE_STUDENT_DETAILS_FAIL,
  UPDATE_STUDENT_DETAILS_REQUEST,
  UPDATE_STUDENT_DETAILS_SUCCESS,
} from '../constants/studentConstants'

export const studentDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case STUDENT_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}
export const studentDetailsUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UPDATE_STUDENT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case UPDATE_STUDENT_DETAILS_SUCCESS:
      return { loading: false,success:true, userInfo: action.payload }
    case UPDATE_STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
