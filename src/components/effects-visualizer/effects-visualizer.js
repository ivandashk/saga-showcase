import { EffectsVisualizerRow } from './__row/effects-visualizer__row';

import './effects-visualizer.css';

export const EffectsVisualizer = ({
    rootSagaStarted,
    effectsMap,
    effectsTree,
    resolvedEffectsMap
}) => (
    <div className={'effects-visualizer'}>
        <h3>Effects</h3>
        {rootSagaStarted && <h4 className={'effects-visualizer__success-subtitle'}>✔️ Root Saga Started</h4>}
        
        {Boolean(effectsTree.length) && 
            <EffectsVisualizerRow
                effectsTree={effectsTree}
                effectsMap={effectsMap}
                resolvedEffectsMap={resolvedEffectsMap}
            />}
    </div>
);
