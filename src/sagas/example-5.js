import {
    all,
    call,
    delay,
    put,
    race
} from 'redux-saga/effects';

function* firstRace() {
    yield delay(2000);
    yield put({ type: 'first_race_gen' });
}

function* secondRace() {
    yield delay(2000);
    yield put({ type: 'second_race_gen' });
}
  
export function* rootSaga() {
    yield all([
        put({ type: 'first_all' }),
        put({ type: 'second_all' })
    ]);

    yield race([
        put({ type: 'first_race' }),
        put({ type: 'second_race' })
    ]);

    yield race([
        call(firstRace),
        call(secondRace)
    ]);
}

export const code = 
`   function* firstRace() {
        yield delay(2000);
        yield put({ type: 'first_race_gen' });
    }

    function* secondRace() {
        yield delay(2000);
        yield put({ type: 'second_race_gen' });
    }
    
    export function* rootSaga() {
        yield all([
            put({ type: 'first_all' }),
            put({ type: 'second_all' })
        ]);

        yield race([
            put({ type: 'first_race' }),
            put({ type: 'second_race' })
        ]);

        yield race([
            call(firstRace),
            call(secondRace)
        ]);
    }
`