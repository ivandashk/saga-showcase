import { useEffect, useReducer } from 'react';

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

export const MonitorInitializer = ({ sagaMonitor, sagaMiddleware }) => {
    const [effectsState, dispatch] = useReducer(monitorReducer, {
        rootSagaStarted: false,
        effectsMap: {},
        actionHistory: [],
        resolvedEffectsMap: {},
        effectsTree: []
    });

    useEffect(() => {
        sagaMonitor.rootSagaStarted = (effect) => {
            console.log(effect)
            dispatch({ type: 'rootSagaStarted' });
        };
        sagaMonitor.effectTriggered = (effect) => {
            console.log(effect)
            dispatch({ type: 'effectTriggered', payload: effect });
        }
        sagaMonitor.actionDispatched = (action) => {
            dispatch({ type: 'actionDispatched', payload: action });
        }
        sagaMonitor.effectResolved = (effectId) => {
            dispatch({ type: 'effectResolved', payload: effectId });
        }

        sagaMiddleware.run(rootSaga);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <App effectsState={effectsState} />;
};
