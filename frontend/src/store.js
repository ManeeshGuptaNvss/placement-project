import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { toggleReducer } from './navUtils.js'
import {userLoginReducer, userRegisterReducer} from './reducers/authReducers.js'
import thunk from 'redux-thunk'
const reducer = combineReducers({
  toggle: toggleReducer,
  userLogin: userLoginReducer,
  userRegister:userRegisterReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const middleware = [thunk]
const initialState = {
  userLogin: {
    userInfo:userInfoFromStorage
  }
}
const store = createStore(
  reducer,
initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
