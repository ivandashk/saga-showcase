import { useCallback, useEffect, useReducer, useState } from 'react';

import { App } from '../app/app';
import { rootSaga } from '../../sagas/index';
import { cloneTree } from '../../utils/tree-utils/cloneTree';

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
    const [historyEffectsState, changeHistoryEffectsState] = useState(null);

    const updateEffectsQueue = useCallback((newQueue) => {
        effectsQueueFastBuffer = newQueue;
        changeEffectQueue(effectsQueueFastBuffer);
    }, []);

    const handleHistoryItemClick = useCallback((index) => {
        const newHistoryState = history[index] ? history[index].effectsState : null

        changeHistoryEffectsState(newHistoryState);
    }, [history]);

    const handleButtonClick = useCallback(() => {
        changeHistoryEffectsState(null);
    }, []);

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
                effectsState: {
                    ...effectsState,
                    effectsTree: cloneTree(effectsState.effectsTree)
                }
            }];
            changeEffectHistory(historyFastBuffer);
        }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effectsQueue]);

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

    return (
        <App
            effectsState={historyEffectsState === null ? effectsState : historyEffectsState}
            effectsMap={effectsState.effectsMap}
            history={history}
            onHistoryItemClick={handleHistoryItemClick}
            handleButtonClick={handleButtonClick}
        />
    )
};
