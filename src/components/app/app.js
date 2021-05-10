import { useCallback } from 'react';

import { ActionHistory } from '../action-history/action-history';
import { EffectsHistory } from '../effects-history/effects-history';
import { EffectsVisualizer } from '../effects-visualizer/effects-visualizer';

import './app.css'

export const App = ({
    effectsState,
    history,
    onHistoryItemClick,
    effectsMap,
    handleButtonClick,
    currentHistoryItemIndex
}) => {
    const { rootSagaStarted, effectsTree, actionHistory, resolvedEffectsMap } = effectsState;

    const handleClick = useCallback(() => {
        handleButtonClick()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={'app'}>
            <button className={'app__action-button'} onClick={handleClick}>Dispatch Action</button>

            <div className={'app__effects'}>
                <EffectsVisualizer
                    rootSagaStarted={rootSagaStarted}
                    effectsMap={effectsMap}
                    effectsTree={effectsTree}
                    resolvedEffectsMap={resolvedEffectsMap}
                />
                <EffectsHistory
                    history={history}
                    onItemClick={onHistoryItemClick}
                    effectsMap={effectsMap}
                    currentIndex={currentHistoryItemIndex}
                />
                <ActionHistory actionHistory={actionHistory} />
            </div>
        </div>
    );
};
