import { useCallback } from 'react';

import { ActionHistory } from '../action-history/action-history';
import { Code } from '../code/code';
import { EffectsHistory } from '../effects-history/effects-history';
import { EffectsVisualizer } from '../effects-visualizer/effects-visualizer';
import { examplesConfig } from '../../examples-config';

import './app.css'

export const App = ({
    effectsState,
    history,
    onHistoryItemClick,
    effectsMap,
    handleButtonClick,
    currentHistoryItemIndex,
    code
}) => {
    const { rootSagaStarted, effectsTree, actionHistory, resolvedEffectsMap } = effectsState;

    const handleClick = useCallback(() => {
        handleButtonClick()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={'app'}>
            <nav>
                <ul>
                    {examplesConfig.map(({ slug, name } ) => (
                    <li key={slug}>
                        <a href={`/${slug}`}>{name}</a>
                    </li>
                    ))}
                </ul>
            </nav>

            {code && <Code code={code} />}

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
