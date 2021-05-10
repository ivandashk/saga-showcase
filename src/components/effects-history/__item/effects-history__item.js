import { useCallback } from 'react';

import { prettifyType } from '../effects-history.utils';

import './effects-history__item.css'

export const EffectsHistoryItem = ({ type, isCurrent, index, content, onClick }) => {
    const handleClick = useCallback(() => {
        onClick(index)
    }, [index, onClick])

    return (
        <button
            className={`effects-history__item ${isCurrent ? 'effects-history__item_current' : ''}`}
            onClick={handleClick}
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
}