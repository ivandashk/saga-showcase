import { prettifyType } from './effects-history.utils';

import './effects-history.css'

export const EffectsHistory = ({ history, onItemClick, effectsMap }) => {
    return (
        <div className={'effects-history'}>
            <h3>History</h3>
            <div className={'effects-history__items'}>
                {history.map(({ type, effectId }, i) => {
                    const effect = effectsMap[effectId];

                    const content = effect
                        ? `${effectId}: ${effect.effect.type}`
                        : effectId || ''

                    return (
                        <button
                            className={'effects-history__item'}
                            key={`${type}${effectId}${i}`}
                            onClick={() => { onItemClick(i + 1) }}
                        >
                            <div className={'effects-history__item-prefix'}>
                                <div className={'effects-history__item-icon'}>{prettifyType(type)}</div>
                                <div className={'effects-history__item-type'}>{type}</div>
                            </div>
                            <div className={'effects-history__item-content'}>
                                {content}
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}