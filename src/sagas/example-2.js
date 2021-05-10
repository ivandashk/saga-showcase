import {
    call,
    takeLatest
} from 'redux-saga/effects';

function* functions() {
    yield (arg => arg)('fn_arg');
    const callRes = yield call(arg => arg , 'call_fn_arg');
    yield callRes;
};

export function* rootSaga() {
    yield takeLatest('Click', functions);
};

export const code = 
`
    function* functions() {
        yield (arg => arg)('fn_arg');
        const callRes = yield call(arg => arg , 'call_fn_arg');
        yield callRes;
    };

    export function* rootSaga() {
        yield takeLatest('Click', functions);
    };
`