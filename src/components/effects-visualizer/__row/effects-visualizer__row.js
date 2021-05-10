import YAML from 'json-to-pretty-yaml';

import { Block } from '../../block/block';

import './effects-visualizer__row.css';

export const EffectsVisualizerRow = ({ effectsTree, effectsMap, resolvedEffectsMap }) => {
    return effectsTree.map(node => {
        const { key, children } = node;
        const { effectId, parentEffectId, effect } = effectsMap[key];
        const isResolved = Boolean(resolvedEffectsMap[key]);

        const block = (
            <Block
                key={effectId}
                disabled={isResolved}
                parentEffectId={parentEffectId}
                id={effectId}
                name={effect.type || effect}
                mod={effect.type}
                payload={effect.payload}
                fullInfo={YAML.stringify(effectsMap[key])}
            />
        )

        return children
            ? (
                <div key={effectId}>
                    {block}
                    <div className={'effects-visualizer__row'}>
                        <EffectsVisualizerRow
                            effectsTree={children}
                            effectsMap={effectsMap}
                            resolvedEffectsMap={resolvedEffectsMap}
                        />
                    </div>
                </div>
            )
            : block;
    });
}
