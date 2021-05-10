import { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { App } from '../app/app';
import { cloneTree } from '../../utils/tree-utils/cloneTree';

import { monitorReducer } from './monitor-initializer.reducer';

let queueExecuting = false;
let effectsQueueFastBuffer = [];
let historyFastBuffer = [];

export const MonitorInitializer = ({ sagaMonitor, sagaMiddleware, rootSaga, code }) => {
    const dispatch = useDispatch();

    const [effectsQueue, changeEffectQueue] = useState([]);
    const [history, changeEffectHistory] = useState([]);
    const [effectsState, monitorReducerDispatch] = useReducer(monitorReducer, {
        rootSagaStarted: false,
        effectsMap: {},
        actionHistory: [],
        resolvedEffectsMap: {},
        effectsTree: []
    });
    const [historyEffectsState, changeHistoryEffectsState] = useState(null);
    const [currentHistoryItemIndex, changeCurrentHistoryItemIndex] = useState(null);

    const updateEffectsQueue = useCallback((newQueue, shouldUpdateQueue) => {
        effectsQueueFastBuffer = newQueue;

        if (shouldUpdateQueue) {
            changeEffectQueue(effectsQueueFastBuffer);
        }
    }, []);

    const handleHistoryItemClick = useCallback((index) => {
        const newHistoryState = history[index + 1] ? history[index + 1].effectsState : null;

        changeHistoryEffectsState(newHistoryState);
        changeCurrentHistoryItemIndex(index);
    }, [history]);

    const handleButtonClick = useCallback(() => {
        changeHistoryEffectsState(null);
        changeCurrentHistoryItemIndex(null);
        dispatch({ type: 'Click' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!effectsQueue.length) {
            queueExecuting = false;
            return;
        };

        queueExecuting = true;
        setTimeout(() => {
            const effectToPerform = effectsQueue[effectsQueue.length - 1];

            monitorReducerDispatch(effectToPerform);
            updateEffectsQueue(effectsQueueFastBuffer.slice(0, -1), true);

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
            updateEffectsQueue([{ type: 'rootSagaStarted', payload: effect.effectId }, ...effectsQueueFastBuffer], !queueExecuting);
        };
        sagaMonitor.effectTriggered = (effect) => {
            updateEffectsQueue([{ type: 'effectTriggered', payload: effect }, ...effectsQueueFastBuffer], !queueExecuting);
        }
        sagaMonitor.actionDispatched = (action) => {
            updateEffectsQueue([{ type: 'actionDispatched', payload: action }, ...effectsQueueFastBuffer], !queueExecuting);
        }
        sagaMonitor.effectResolved = (effectId) => {
            updateEffectsQueue([{ type: 'effectResolved', payload: effectId }, ...effectsQueueFastBuffer], !queueExecuting);
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
            currentHistoryItemIndex={currentHistoryItemIndex}
            code={code}
        />
    )
};
