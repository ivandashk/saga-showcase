import {
    call,
    spawn,
    put,
    fork
} from 'redux-saga/effects';

function* fetchAll() {
    yield fork(fetchResource, 'users');
    yield spawn(fetchResource, 'comments');
}
  
function* fetchResource(resource) {
    yield put({ type: resource });
}
  
export function* rootSaga() {
    yield call(fetchAll);
}

export const code = 
`   function* fetchAll() {
        yield fork(fetchResource, 'users');
        yield spawn(fetchResource, 'comments');
    }
    
    function* fetchResource(resource) {
        yield put({ type: resource });
    }
    
    export function* rootSaga() {
        yield call(fetchAll);
    }
`