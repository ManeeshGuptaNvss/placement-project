import axios from 'axios'
import { STUDENT_DETAILS_FAIL, STUDENT_DETAILS_REQUEST, STUDENT_DETAILS_SUCCESS, UPDATE_STUDENT_DETAILS_FAIL, UPDATE_STUDENT_DETAILS_REQUEST, UPDATE_STUDENT_DETAILS_SUCCESS } from '../constants/studentConstants'

export const getStudentDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
          type:STUDENT_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(`/api/v1/students/${id}`, config)
        dispatch({
          type: STUDENT_DETAILS_SUCCESS,
          payload: data,
        })

  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const updateStudentDetails = (user) => async (dispatch, getState) => {
    try {
        dispatch({
          type:UPDATE_STUDENT_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.put(`/api/v1/students/profile`,user, config)
        dispatch({
          type: UPDATE_STUDENT_DETAILS_SUCCESS,
          payload: data,
        })

  } catch (error) {
    dispatch({
      type: UPDATE_STUDENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
