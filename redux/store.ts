import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import order from './modules/order'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const enhancers = []
const middleware = [thunk]

const composeEnhancers =
  (typeof window != 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const configStore = (initialState?: any) =>
  createStore(
    combineReducers({
      order
    }),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  )
export default configStore
