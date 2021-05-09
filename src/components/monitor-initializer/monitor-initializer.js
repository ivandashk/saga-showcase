import { useCallback, useEffect, useReducer, useState } from 'react';

import { App } from '../app/app';
import { rootSaga } from '../../sagas/index';
import { appendNode } from '../../utils/tree-utils/append-node';

const monitorReducer = (state, action) => {
    switch (action.type) {
        case 'rootSagaStarted':
            return {
                ...state,
                rootSagaStarted: true
            };
        case 'effectTriggered':
            const { effectId, parentEffectId } = action.payload;

            return {
                ...state,
                effectsTree: appendNode(state.effectsTree, effectId, parentEffectId),
                effectsMap: {
                    ...state.effectsMap,
                    [String(effectId)]: action.payload
                }
            };
        case 'actionDispatched':
            return {
                ...state,
                actionHistory: [...state.actionHistory, action.payload]
            };
        case 'effectResolved':
            return {
                ...state,
                resolvedEffectsMap: {
                    ...state.resolvedEffectsMap,
                    [action.payload]: true
                }
            };
        default:
            throw new Error();
    }
}

let effectsQueueFastBuffer = [];

export const MonitorInitializer = ({ sagaMonitor, sagaMiddleware }) => {
    const [effectsState, dispatch] = useReducer(monitorReducer, {
        rootSagaStarted: false,
        effectsMap: {},
        actionHistory: [],
        resolvedEffectsMap: {},
        effectsTree: []
    });
    const [effectsQueue, changeEffectQueue] = useState([]);

    const updateEffectsQueue = useCallback((newQueue) => {
        effectsQueueFastBuffer = newQueue;
        changeEffectQueue(effectsQueueFastBuffer);
    }, [])

    useEffect(() => {
        if (!effectsQueue.length) return;

        setTimeout(() => {
            dispatch(effectsQueue[effectsQueue.length - 1]);
            updateEffectsQueue(effectsQueueFastBuffer.slice(0, -1));
        }, 500)
    }, [effectsQueue, updateEffectsQueue])

    useEffect(() => {
        sagaMonitor.rootSagaStarted = (effect) => {
            console.log(effect);
            updateEffectsQueue([{ type: 'rootSagaStarted' }, ...effectsQueueFastBuffer]);
        };
        sagaMonitor.effectTriggered = (effect) => {
            console.log(effect);
            updateEffectsQueue([{ type: 'effectTriggered', payload: effect }, ...effectsQueueFastBuffer]);
        }
        sagaMonitor.actionDispatched = (action) => {
            // dispatch({ type: 'actionDispatched', payload: action });
            updateEffectsQueue([{ type: 'actionDispatched', payload: action }, ...effectsQueueFastBuffer]);
        }
        sagaMonitor.effectResolved = (effectId) => {
            updateEffectsQueue([{ type: 'effectResolved', payload: effectId }, ...effectsQueueFastBuffer]);
        };

        sagaMiddleware.run(rootSaga);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <App effectsState={effectsState} />;
};
