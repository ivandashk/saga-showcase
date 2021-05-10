import { useLayoutEffect, useRef } from 'react';

import { Block } from '../block/block';

import './action-history.css'

export const ActionHistory = ({ actionHistory }) => {
    const itemsRef = useRef(null);

    useLayoutEffect(() => {
        itemsRef.current.scrollTop = itemsRef.current.scrollHeight;
    })

    return (
        <div className='action-history'>
            <h3>Actions Dispatched</h3>
            <div className={'action-history__items'} ref={itemsRef}>
                {actionHistory.map(({ type }, i) => (
                <Block
                    key={`${type}_${i}`}
                    mod={type}
                    name={type}
                />
                ))}
            </div>
        </div>
    )
}