import { Block } from '../block/block';

import './effects-visualizer.css';

const Row = ({ effectsTree, effectsMap, resolvedEffectsMap }) => {
    return effectsTree.map(node => {
        const { key, children } = node;
        const { effectId, parentEffectId, effect: { type, payload } } = effectsMap[key];
        const isResolved = Boolean(resolvedEffectsMap[key]);

        const block = (
            <Block
                key={effectId}
                disabled={isResolved}
                mod={type}
                parentEffectId={parentEffectId}
                id={effectId}
                name={type}
                payload={payload}
            />
        )

        return children
            ? (
                <div key={`row_of_${effectId}`}>
                    {block}
                    <div className={'effects-visualizer__tree-row'}>
                        <Row effectsTree={children} effectsMap={effectsMap} resolvedEffectsMap={resolvedEffectsMap} />
                    </div>
                </div>
            )
            : block;
    });
}

export const EffectsVisualizer = ({ rootSagaStarted, effectsMap, effectsTree, resolvedEffectsMap }) => (
    <>
        <h3>Effects</h3>
        {rootSagaStarted && <h4 className={'effects-visualizer__success-subtitle'}>✔️ Root Saga Executed</h4>}
        
        {Boolean(effectsTree.length) && <Row effectsTree={effectsTree} effectsMap={effectsMap} resolvedEffectsMap={resolvedEffectsMap} />}
    </>
);
