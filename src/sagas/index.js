import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* actions(action) {
    yield action;
    yield put({ type: 'PUT_ACTION' });
};

function* functions() {
    yield ((arg) => { return { type: arg } })('fn_arg');
    const callRes = yield call((arg) => { return { type: arg } }, 'call_fn_arg');
    yield callRes;
};

export function* rootSaga() {
    yield takeEvery('Action', actions);
    yield takeLatest('Action', functions);
};
