import { Block } from '../block/block';

import './effects-visualizer.css'

export const EffectsVisualizer = ({ rootSagaStarted, effectTriggered }) => {
    return (
        <div className={'effects-visualizer'}>
            <h3>Effects</h3>
            {rootSagaStarted && <h4 className={'effects-visualizer__success-subtitle'}>✔️ Root Saga Executed</h4>}
            
            {effectTriggered.length &&
                <>
                    {effectTriggered.map(({ effectId, parentEffectId, effect: { type } }) => (
                        <Block
                            key={effectId}
                            mod={type}
                            parentEffectId={parentEffectId}
                            id={effectId}
                            name={type}
                        />
                    ))}
                </>
            }
        </div>
    );
};
