import { useLayoutEffect, useRef } from 'react';

import { EffectsVisualizerRow } from './__row/effects-visualizer__row';

import './effects-visualizer.css';

export const EffectsVisualizer = ({
    rootSagaStarted,
    effectsMap,
    effectsTree,
    resolvedEffectsMap
}) => {
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
    })

    return (
        <div className={'effects-visualizer'}>
            <h3>Effects</h3>
            <div className={'effects-visualizer__content'} ref={contentRef}>
                {rootSagaStarted && <h4 className={'effects-visualizer__success-subtitle'}>✔️ Root Saga Started</h4>}
                
                {Boolean(effectsTree.length) && 
                    <EffectsVisualizerRow
                        effectsTree={effectsTree}
                        effectsMap={effectsMap}
                        resolvedEffectsMap={resolvedEffectsMap}
                    />}
            </div>
        </div>
    )
};
