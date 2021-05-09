import { appendNode } from '../../utils/tree-utils/append-node';

export const monitorReducer = (state, action) => {
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