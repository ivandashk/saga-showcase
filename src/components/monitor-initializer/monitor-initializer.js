import { useCallback, useEffect, useReducer, useState } from 'react';

import { App } from '../app/app';
import { rootSaga } from '../../sagas/index';

import { monitorReducer } from './monitor-initializer.reducer';

let effectsQueueFastBuffer = [];
let historyFastBuffer = [];

export const MonitorInitializer = ({ sagaMonitor, sagaMiddleware }) => {
    const [effectsQueue, changeEffectQueue] = useState([]);
    const [history, changeEffectHistory] = useState([]);
    const [effectsState, dispatch] = useReducer(monitorReducer, {
        rootSagaStarted: false,
        effectsMap: {},
        actionHistory: [],
        resolvedEffectsMap: {},
        effectsTree: []
    });

    const updateEffectsQueue = useCallback((newQueue) => {
        effectsQueueFastBuffer = newQueue;
        changeEffectQueue(effectsQueueFastBuffer);
    }, [])

    useEffect(() => {
        if (!effectsQueue.length) return;

        setTimeout(() => {
            const effectToPerform = effectsQueue[effectsQueue.length - 1];

            dispatch(effectToPerform);
            updateEffectsQueue(effectsQueueFastBuffer.slice(0, -1));

            historyFastBuffer = [...historyFastBuffer, {
                type: effectToPerform.type,
                effectId: typeof effectToPerform.payload === 'object'
                    ? effectToPerform.payload.effectId
                    : effectToPerform.payload,
                effectsState: Object.assign({}, effectsQueueFastBuffer)
            }];
            changeEffectHistory(historyFastBuffer);
        }, 500)
    }, [effectsQueue, updateEffectsQueue]);

    useEffect(() => {
        sagaMonitor.rootSagaStarted = (effect) => {
            updateEffectsQueue([{ type: 'rootSagaStarted', payload: effect.effectId }, ...effectsQueueFastBuffer]);
        };
        sagaMonitor.effectTriggered = (effect) => {
            updateEffectsQueue([{ type: 'effectTriggered', payload: effect }, ...effectsQueueFastBuffer]);
        }
        sagaMonitor.actionDispatched = (action) => {
            updateEffectsQueue([{ type: 'actionDispatched', payload: action }, ...effectsQueueFastBuffer]);
        }
        sagaMonitor.effectResolved = (effectId) => {
            updateEffectsQueue([{ type: 'effectResolved', payload: effectId }, ...effectsQueueFastBuffer]);
        };

        sagaMiddleware.run(rootSaga);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <App effectsState={effectsState} history={history} />;
};
