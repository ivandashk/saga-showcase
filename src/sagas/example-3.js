import {
    takeEvery,
    put
} from 'redux-saga/effects';

function* chain1() {
    yield put({ type: 'CHAIN_1' })
};

function* chain2() {
    yield put({ type: 'CHAIN_2' })
};

export function* rootSaga() {
    yield takeEvery('Click', chain1);
    yield takeEvery('CHAIN_1', chain2);
};

export const code = 
`
    function* chain1() {
        yield put({ type: 'CHAIN_1' })
    };

    function* chain2() {
        yield put({ type: 'CHAIN_2' })
    };

    export function* rootSaga() {
        yield takeEvery('Click', chain1);
        yield takeEvery('CHAIN_1', chain2);
    };
`