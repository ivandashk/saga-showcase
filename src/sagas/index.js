import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* actions() {
    yield 'plain_text';
    yield put({ type: 'PUT_ACTION' });
};

function* functions() {
    yield (arg => arg)('fn_arg');
    const callRes = yield call(arg => arg , 'call_fn_arg');
    yield callRes;
};

export function* rootSaga() {
    yield takeEvery('Action', actions);
    yield takeLatest('Action', functions);
};
