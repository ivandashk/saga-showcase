import { takeEvery } from 'redux-saga/effects'

import { increment } from '../reducers/counter';

function* log() {
    console.log('yay');
    yield;
};

export function* rootSaga() {
    yield takeEvery(increment, log);
};
