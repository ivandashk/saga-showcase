import { takeEvery } from 'redux-saga/effects'

function* custom(action) {
    yield action;
};

export function* rootSaga() {
    yield takeEvery('Action', custom);
};
