import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/authConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
      const config = {
          headers: {
            'Content-type':'application/json'
        }
      }
      const { data } = await axios.post('/api/v1/students/login', { email, password }, config)
      // console.log(data)
      // const info={token,name:student.name,email:student.email,isAdmin:student.isAdmin} 
      dispatch({
          type: USER_LOGIN_SUCCESS,
          payload:data
      })
      localStorage.setItem('userInfo',JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


// Soon after the logout the data in the localstorage should be removed
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  // localStorage.removeItem('cartItems')
  dispatch({ type: USER_LOGOUT })
//   dispatch({ type: USER_DETAILS_RESET })
//   dispatch({ type: ORDER_LIST_MY_RESET })
//   dispatch({ type: USER_LIST_RESET })
}

export const register = (name, email, password, passwordConfirm) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/v1/students/register',
      { name, email, password,passwordConfirm },
      config
    )
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
     dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
  }
  