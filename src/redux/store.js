import { createStore } from 'redux';
import rootReducer from './reducers/index.js';

let store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f
)

export default store;
