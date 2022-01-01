import { createStore, compose } from 'redux';
import rootReducer from './reducers/index.js';

let store = compose()(createStore)(rootReducer);

if( window.__REDUX_DEVTOOLS_EXTENSION__ ){
  store = compose(
    window.devToolsExtension && window.devToolsExtension()
  )(createStore)(rootReducer);
}

export default store;
