import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { ActionHistory } from '../action-history/action-history';
import { EffectsVisualizer } from '../effects-visualizer/effects-visualizer';

export const App = ({ effectsState }) => {
    const dispatch = useDispatch();

    const { rootSagaStarted, effectTriggered, actionHistory } = effectsState;

    const handleClick = useCallback(() => {
        dispatch({ type: 'Action' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <button onClick={handleClick}>Dispatch action</button>

            <ActionHistory actionHistory={actionHistory} />

            <EffectsVisualizer rootSagaStarted={rootSagaStarted} effectTriggered={effectTriggered} />
        </>
    );
};
