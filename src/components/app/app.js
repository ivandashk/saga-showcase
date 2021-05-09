import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { ActionHistory } from '../action-history/action-history';
import { EffectsHistory } from '../effects-history/effects-history';
import { EffectsVisualizer } from '../effects-visualizer/effects-visualizer';

import './app.css'

export const App = ({ effectsState, history }) => {
    const dispatch = useDispatch();

    const { rootSagaStarted, effectsMap, effectsTree, actionHistory, resolvedEffectsMap } = effectsState;

    const handleClick = useCallback(() => {
        dispatch({ type: 'Click' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <button className={'app__action-button'} onClick={handleClick}>Dispatch Action</button>

            <ActionHistory actionHistory={actionHistory} />

            <div className={'app__effects'}>
                <EffectsVisualizer
                    rootSagaStarted={rootSagaStarted}
                    effectsMap={effectsMap}
                    effectsTree={effectsTree}
                    resolvedEffectsMap={resolvedEffectsMap}
                />
                <EffectsHistory history={history} />
            </div>
        </>
    );
};
