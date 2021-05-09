import { Block } from '../block/block';

import './action-history.css'

export const ActionHistory = ({ actionHistory }) => {
    return (
        <div className='action-history'>
            <h3>Actions Dispatched</h3>
            <div className={'action-history__items'}>
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