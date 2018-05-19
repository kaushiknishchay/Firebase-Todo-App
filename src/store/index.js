import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from '../reducers/';
import rootSaga from '../sagas/';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(thunk, logger, sagaMiddleware),
);

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;
