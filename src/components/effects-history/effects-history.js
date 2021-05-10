import { useLayoutEffect, useRef } from 'react';

import { EffectsHistoryItem } from './__item/effects-history__item';

import './effects-history.css'

export const EffectsHistory = ({ history, onItemClick, effectsMap, currentIndex }) => {
    const itemsRef = useRef(null);

    useLayoutEffect(() => {
        if (!currentIndex) {
            itemsRef.current.scrollTop = itemsRef.current.scrollHeight;
        }
    })

    return (
        <div className={'effects-history'}>
            <h3>History</h3>
            <div className={'effects-history__items'} ref={itemsRef}>
                {history.map(({ type, effectId }, i) => {
                    const effect = effectsMap[effectId];
                    const isCurrent = currentIndex === i;

                    const content = effect
                        ? `${effectId}: ${effect.effect.type}`
                        : effectId || ''

                    return (
                        <EffectsHistoryItem
                            key={`${type}${effectId}${i}`}
                            type={type}
                            isCurrent={isCurrent}
                            index={i}
                            content={content}
                            onClick={onItemClick}
                        />
                    )
                })}
            </div>
        </div>
    );
}