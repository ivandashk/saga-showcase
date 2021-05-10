import {
    put,
    takeEvery,
} from 'redux-saga/effects'

function* actions() {
    yield put({ type: 'PUT_ACTION' });
};

export function* rootSaga() {
    yield takeEvery('Click', actions);
};

export const code = 
`
    function* actions() {
        yield put({ type: 'PUT_ACTION' });
    };

    export function* rootSaga() {
        yield takeEvery('Click', actions);
    };
`