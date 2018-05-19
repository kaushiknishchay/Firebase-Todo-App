import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* addTodo(action) {
  try {
    console.log('saga', action);
    yield put({
      type: 'ADD_TODO_IN_STATE',
      payload: action.payload,
    });
  } catch (e) {
    console.log('addTodo Saga', e);
  }
}

function* rootSaga() {
  yield takeLatest('ADD_TODO', addTodo);
}
export default rootSaga;
