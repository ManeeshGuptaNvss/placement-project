import { createStore, applyMiddleware } from 'redux'
// import {composeWithDevTools} from 'redux-devtools-extension'
import {toggleReducer} from './navUtils.js'


const store = createStore(
  toggleReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store